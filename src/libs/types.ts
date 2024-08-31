export interface INotificationType {
    id?: number;
    name: string;
    color: string;
    notifications?: INotification[];
    createdAt?: Date;
  }
  
  export interface INotification {
    id?: number;
    typeId: number;
    message: string;
    path?: string;
    personName?: string;
    isRead: boolean;
    iconUrl?: string;
    typeDetail: INotificationType;
    createdAt?: Date;
    updatedAt?: Date;
  }
  