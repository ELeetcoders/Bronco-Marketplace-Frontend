import { Timestamp } from "@angular/fire/firestore";
import { User } from "./User";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date & Timestamp;
    userEmails: string[];
    users: User[];

    // Not stored only displayed
    chatPic?: string;
    chatName?: string;
}

export interface Message {
    text: string;
    senderId: string;
    sentDate: Date & Timestamp;
}