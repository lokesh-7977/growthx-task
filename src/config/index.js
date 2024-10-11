import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    db: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwt_expiry: process.env.JWT_EXPIRY
};

