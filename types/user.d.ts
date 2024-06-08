import { Express } from "express";

declare global {
    namespace Express {
        export interface User {
            id: number,
            email: string
        }
    }
}