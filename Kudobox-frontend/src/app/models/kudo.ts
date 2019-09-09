import { User } from './user';

export class Kudo {
    kudoId: number;
    text: string;
    fontFamily: string;
    receiver: User;
    sender: User;
    status: string;
    createdOn: Date;
}
