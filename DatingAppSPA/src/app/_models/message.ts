export interface Message {
  id: number;
  senderId: number;
  senderKnownsAs: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientKnownsAs: string;
  recipientPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  messageSent: Date;
}
