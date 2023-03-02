import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function updateProfile(req, res, next) {
  try {
    const user = req.user;
    let {
      firstname,
      lastname,
      workNumber,
      experience,
      personalBio,
      billing,
      nameCompany,
      capabilities,
      availability,
      social,
      phoneNumbers,
      emailAdresses,
      documentLinks,
      stateLicenses,
      pricingInformation,
      insurances,
      backgroundChecks,
      spokenLanguages,
      websites,
      customFields,
    } = req.body;
    phoneNumbers?.map((e) => (e.userId = user.id));
    emailAdresses?.map((e) => (e.userId = user.id));
    documentLinks?.map((e) => (e.userId = user.id));
    stateLicenses?.map((e) => (e.userId = user.id));
    pricingInformation?.map((e) => (e.userId = user.id));
    insurances?.map((e) => (e.userId = user.id));
    backgroundChecks?.map((e) => (e.userId = user.id));
    spokenLanguages?.map((e) => (e.userId = user.id));
    websites?.map((e) => (e.userId = user.id));
    customFields?.map((e) => (e.userId = user.id));
    if (user.pro === false) social = null;
    const profile = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstname,
        lastname,
        workNumber,
        experience,
        personalBio,
        nameCompany: nameCompany
          ? {
              upsert: {
                set: {},
                update: {
                  companyName: nameCompany?.companyName,
                  inBusiness: nameCompany?.inBusiness,
                },
              },
            }
          : user.nameCompany,

        billing: billing
          ? {
              address1: billing?.address1
                ? billing?.address1
                : user.billing?.address1,
              address2: billing?.address2
                ? billing?.address2
                : user.billing?.address2,
              state: billing?.state ? billing?.state : user.billing?.state,
              zip: billing?.zip ? billing?.zip : user.billing?.zip,
              city: billing?.city ? billing?.city : user.billing?.city,
            }
          : user.billing,
        capabilities: capabilities
          ? {
              csa: capabilities?.csa
                ? capabilities?.csa
                : user.capabilities?.csa,
              email: capabilities?.email
                ? capabilities?.email
                : user.capabilities?.email,
              abstractor: capabilities?.abstractor
                ? capabilities?.abstractor
                : user.capabilities?.abstractor,
              hour24service: capabilities?.hour24service
                ? capabilities?.hour24service
                : user.capabilities?.hour24service,
              internet: capabilities?.internet
                ? capabilities?.internet
                : user.capabilities?.internet,
              mobileHotspot: capabilities?.mobileHotspot
                ? capabilities?.mobileHotspot
                : user.capabilities?.mobileHotspot,
              jailSignings: capabilities?.jailSignings
                ? capabilities?.jailSignings
                : user.capabilities?.jailSignings,
              fax: capabilities?.fax
                ? capabilities?.fax
                : user.capabilities?.fax,
              laserPrinter: capabilities?.laserPrinter
                ? capabilities?.laserPrinter
                : user.capabilities?.laserPrinter,
              eSign: capabilities?.eSign
                ? capabilities?.eSign
                : user.capabilities?.eSign,
              weddings: capabilities?.weddings
                ? capabilities?.weddings
                : user.capabilities?.weddings,
              otherInfo: capabilities?.otherInfo
                ? capabilities?.otherInfo
                : user.capabilities?.otherInfo,
            }
          : user.capabilities,
        availability: availability
          ? {
              mon: availability?.mon
                ? availability?.mon
                : user.availability?.mon,
              tue: availability?.tue
                ? availability?.tue
                : user.availability?.tue,
              wed: availability?.wed
                ? availability?.wed
                : user.availability?.wed,
              thu: availability?.thu
                ? availability?.thu
                : user.availability?.thu,
              fri: availability?.fri
                ? availability?.fri
                : user.availability?.fri,
              sat: availability?.sat
                ? availability?.sat
                : user.availability?.sat,
              sun: availability?.sun
                ? availability?.sun
                : user.availability?.sun,
              am: availability?.am ? availability?.am : user.availability?.am,
              pm: availability?.pm ? availability?.pm : user.availability?.pm,
            }
          : user.availability,
        social: social
          ? {
              facebook: social?.facebook
                ? social?.facebook
                : user.social?.facebook,
              linkedin: social?.linkedin
                ? social?.linkedin
                : user.social?.linkedin,
              twitter: social?.twitter ? social?.twitter : user.social?.twitter,
            }
          : user.social,
      },
    });
    emailAdresses.length > 0
      ? await prisma.$transaction([
          prisma.emailAdresses.deleteMany({
            where: { userId: user.id },
          }),
          prisma.emailAdresses.createMany({
            data: emailAdresses,
          }),
        ])
      : null;
    phoneNumbers.length > 0
      ? await prisma.$transaction([
          prisma.phoneNumbers.deleteMany({
            where: { userId: user.id },
          }),
          prisma.phoneNumbers.createMany({
            data: phoneNumbers,
          }),
        ])
      : null;
    documentLinks.length > 0
      ? await prisma.$transaction([
          prisma.documentLinks.deleteMany({
            where: { userId: user.id },
          }),
          prisma.documentLinks.createMany({
            data: documentLinks,
          }),
        ])
      : null;
    stateLicenses.length > 0
      ? await prisma.$transaction([
          prisma.stateLicenses.deleteMany({
            where: { userId: user.id },
          }),
          prisma.stateLicenses.createMany({
            data: stateLicenses,
          }),
        ])
      : null;
    pricingInformation.length > 0
      ? await prisma.$transaction([
          prisma.pricingInformation.deleteMany({
            where: { userId: user.id },
          }),
          prisma.pricingInformation.createMany({
            data: pricingInformation,
          }),
        ])
      : null;
    insurances.length > 0
      ? await prisma.$transaction([
          prisma.insurances.deleteMany({
            where: { userId: user.id },
          }),
          prisma.insurances.createMany({
            data: insurances,
          }),
        ])
      : null;
    backgroundChecks.length > 0
      ? await prisma.$transaction([
          prisma.backgroundChecks.deleteMany({
            where: { userId: user.id },
          }),
          prisma.backgroundChecks.createMany({
            data: backgroundChecks,
          }),
        ])
      : null;
    spokenLanguages.length > 0
      ? await prisma.$transaction([
          prisma.spokenLanguages.deleteMany({
            where: { userId: user.id },
          }),
          prisma.spokenLanguages.createMany({
            data: spokenLanguages,
          }),
        ])
      : null;
    websites.length > 0
      ? await prisma.$transaction([
          prisma.websites.deleteMany({
            where: { userId: user.id },
          }),
          prisma.websites.createMany({
            data: websites,
          }),
        ])
      : null;
    customFields.length > 0
      ? await prisma.$transaction([
          prisma.customFields.deleteMany({
            where: { userId: user.id },
          }),
          prisma.customFields.createMany({
            data: customFields,
          }),
        ])
      : null;

    const pro = await prisma.user.findUnique({
      where: { id: user.id },
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
    return okResponse(res, "Profile updated successfully", {
      pro,
    });
  } catch (err) {
    next(err);
  }
}
