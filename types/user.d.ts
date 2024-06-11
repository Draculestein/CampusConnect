declare namespace Express {
    export interface User { 
        id: number;
        email: string;
        uuid: string;
        username: string;
        password: string;
        graduationDate: Date | null;
    }
}