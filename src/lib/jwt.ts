import jwt from "jsonwebtoken";
import "server-only";

const generateJWT = (id: string, email: string, name: string, role: string) => {
    const payload = {
        id: id,
        email: email,
        name: name,
        role: role,
    };

    return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
        expiresIn: "2h",
    });
};

export default generateJWT;