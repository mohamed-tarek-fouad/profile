import {
  badRequestResponse,
  okResponse,
  unAuthorizedResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function getUserById(req, res, next) {
  try {
    const userId = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: userId.id,
      },
      include: {
        emailAdresses: true,
        phoneNumbers: true,
        documentLinks: true,
        StateLicenses: true,
        PricingInformation: true,
        Insurances: true,
        BackgroundChecks: true,
        SpokenLanguages: true,
        Websites: true,
        CustomFields: true,
      },
    });
    if (!user) {
      return badRequestResponse(res, "user not found");
    }
    return okResponse(res, "retrieved user successful", user);
  } catch (err) {
    next(err);
  }
}
