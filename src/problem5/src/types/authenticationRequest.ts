import { Request } from 'express';

export type AuthenticationRequest = Request & {
    user?: {
        id: number;
        email: string;
        name: string;
        role: {
            name: string;
            permissions: {
                hotels: string[];
                rooms: string[];
            };
        };
    };
}
