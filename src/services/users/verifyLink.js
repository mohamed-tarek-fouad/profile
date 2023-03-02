import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import createVerifyToken from "../../helpers/functions/verifyToken.js";
import { prisma } from "../../index.js";
import createAccessToken from "../../helpers/functions/createAccessToken.js";
export async function verifyLink(req, res, next) {
  try {
    const { id, token } = req.params;
    const validateUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!validateUser) {
      return badRequestResponse(res, "user doesn't exist");
    }
    const secret = process.env.ACCESS_TOKEN_SECRET + validateUser.firstname;
    const payload = createVerifyToken(token, secret, next);
    if (payload.id !== validateUser.id) {
      return badRequestResponse(res, "somthing wrong happened");
    }
    const newToken = await prisma.tokens.create({
      data: {
        userId: validateUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    const user = await prisma.user.update({
      where: { id },
      data: {
        verified: true,
      },
    });
    delete user.password;
    const accessToken = createAccessToken(validateUser.id, newToken.id);
    return okResponse(res, "successfully verified", {
      ...user,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}
