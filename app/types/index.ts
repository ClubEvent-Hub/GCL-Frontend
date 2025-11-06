import Image from 'next/image';
import { CardDescription } from '@/components/ui/card';
export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profilePicture?: string;
  fieldOfStudy: string;
  university: string;
  matricule: string;
}

export type Club = {
  id?: string;
  clubName: string;
  clubEmail?: string;
  clubPassword?: string;
  clubLogo?: string;
  clubType: string;
  clubDescription: string;
  university: string;
  membersCount?: number;
  clubLocation: string;
  clubStartDate: string;
  clubEndDate: string;
   clubImage?: string
};

export interface Event {
  id?: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventType: string;
  eventLocation: string;
  eventDescription: string;
  clubId?: string;
  classname?: string;
  date: string;
  name?: string
  color?: string
  avatar?: string
  role?: string
  key: string
  shiftKey: string
  clubName: string
  preventDefault: () => void
  toLowerCase(): string
  title: string
  image: string
  description: string
  
}

export interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  postType: string;
  numberOfLikes: number;
  numberOfComments: number;
  studentId?: string;
  eventId?: string;
  name?: string;
  date?: string;
  comments?: string;
  likes?: boolean
  views?: boolean
  ClassName?: string

}
