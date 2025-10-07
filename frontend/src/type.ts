export interface IContact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
}

export type NewContact = Omit<IContact, '_id'>;
