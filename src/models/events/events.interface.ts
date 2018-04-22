import { User } from "@firebase/auth-types";

export interface event {
    $key?: string;
    eventTitle: string;
    eventDescription: string;
    eventAuthor: User;
    eventLocation: string;
    eventDate: string;
}