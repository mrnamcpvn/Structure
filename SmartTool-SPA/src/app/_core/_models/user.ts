export class User {
    _id: string;
    account: string;
    password: string;
    name: string;
    email: string;
    is_active: boolean;
    update_by: string;
    update_time: string | Date;
}