import {
  conflictResponse,
  okResponse,
  badRequestResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import createVerificationToken from "../../helpers/functions/createVerificationToken.js";
import nodemailer from "nodemailer";
export async function register(req, res, next) {
  try {
    const { emailAddress, password, firstname, lastname, workNumber, billing } =
      req.body;
    const checkEmail = await prisma.user.findUnique({
      where: {
        emailAddress,
      },
    });
    if (checkEmail) {
      return conflictResponse(res, "Email already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        emailAddress,
        password: encryptedPassword,
        firstname,
        lastname,
        workNumber,
        billing,
      },
    });
    await prisma.emailAdresses.create({
      data: {
        type: "work",
        address: emailAddress,
        pref: true,
        userId: newUser.id,
      },
    });
    await prisma.phoneNumbers.create({
      data: {
        type: "work",
        number: workNumber,
        prefPhone: true,
        userId: newUser.id,
      },
    });
    delete newUser.password;
    const secret = process.env.ACCESS_TOKEN_SECRET + newUser.firstname;
    const token = createVerificationToken(
      {
        id: newUser.id,
        email: newUser.email,
      },
      secret
    );
    const verifyLink = `http://localhost:3001/auth/verify-account/${newUser.id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VERIFY_LINK_EMAIL,
        pass: process.env.VERIFY_LINK_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.VERIFY_LINK_EMAIL,
      to: newUser.emailAddress,
      subject: "verify account",
      text: verifyLink,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return badRequestResponse(res, err);
      }
      return okResponse(res, "the verify_link  has been sent");
    });
  } catch (err) {
    next(err);
  }
}
