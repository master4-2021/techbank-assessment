"use client";

import { trpc } from "@/libs/trpc";
import { BellIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, DropdownMenu } from "@radix-ui/themes";

function getRandomText(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate an array of items with incrementing keys and random text
function generateItems(count: number) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      key: i + 1, // Incrementing key
      text: getRandomText(50), // Random text of length 4
    });
  }
  return items;
}

// Example: Generate 10 items
const data = generateItems(10);
export default function Home() {
  const notificationTypes = trpc.notificationType.useQuery();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft" color="cyan">
            <BellIcon /> Notifications
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft" color="cyan">
          <Container size="1">
            {data.map((item) => (
              <DropdownMenu.Item key={item.key}>{item.text}</DropdownMenu.Item>
            ))}
          </Container>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </main>
    // <Box
    //   style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}
    // >
    //   <Container size="1">
    //     {/* <DecorativeBox> */}
    //       <Box py="9" />
    //     {/* </DecorativeBox> */}
    //   </Container>
    // </Box>
  );
}
