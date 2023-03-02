import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function uploadProfilePic(req, res, next) {
  try {
    const userId = req.user;
    let profilePic;

    profilePic = `/uploads/images/${req.file?.filename}`;

    const user = await prisma.user.update({
      where: {
        id: userId.id,
      },
      data: {
        profilePic: [profilePic],
      },
    });

    return okResponse(res, "retrieved user successful", user);
  } catch (err) {
    next(err);
  }
}
