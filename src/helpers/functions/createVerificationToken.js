import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function createVerificationToken(payload, secret) {
  return jwt.sign(payload, secret, {
    expiresIn: "15m",
  });
}
