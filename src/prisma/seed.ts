import prisma from "../libs/prismaClient";
import { INotificationType } from "../libs/types";

const notificationTypes: INotificationType[] = [
  {
    id: 1,
    name: "Platform update",
    color: "#090b00",
  },
  {
    id: 2,
    name: "Comment tag",
    color: "#00b1de",
  },
  {
    id: 3,
    name: "Access granted",
    color: "#b1de00",
  },
  {
    id: 4,
    name: "Join workspace",
    color: "#006078",
  },
];

async function main() {
  const records = await Promise.all(
    notificationTypes.map((type) => {
      return prisma.notificationType.upsert({
        where: { id: type.id },
        update: { name: type.name, color: type.color },
        create: {
          name: type.name,
          color: type.color,
        },
      });
    })
  );

  console.log(records);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
