import Joi from "joi";
const updateProfileSchema = Joi.object({
  firstname: Joi.string().min(2).max(12).optional(),
  lastname: Joi.string().min(2).max(12).optional(),
  workNumber: Joi.string().min(10).max(15).optional(),
  experience: Joi.string().max(500).optional(),
  personalBio: Joi.string().max(500).optional(),
  billing: Joi.object({
    address1: Joi.string().optional(),
    address2: Joi.string().optional(),
    state: Joi.string().optional(),
    zip: Joi.string().optional(),
    city: Joi.string().max(20).optional(),
  }).optional(),
  nameCompany: Joi.object({
    companyName: Joi.string().max(20).optional(),
    inBusiness: Joi.date().optional(),
  }).optional(),
  phoneNumbers: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().max(10),
        number: Joi.string().min(10),
        extension: Joi.string().max(5).optional(),
        prefPhone: Joi.boolean().optional(),
        text: Joi.boolean().optional(),
      })
    )
    .optional(),
  emailAdresses: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().max(10).required(),
        address: Joi.string().email().required(),
        pref: Joi.boolean().optional(),
      })
    )
    .optional(),

  documentLinks: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri(),
        title: Joi.string().max(20),
        type: Joi.string().max(10),
      })
    )
    .optional(),
  stateLicenses: Joi.array()
    .items(
      Joi.object({
        state: Joi.string().max(2),
        commissionNumber: Joi.string().max(20),
        expiration: Joi.date(),
      })
    )
    .optional(),

  pricingInformation: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().max(50),
        amount: Joi.number().min(0),
      })
    )
    .optional(),
  insurances: Joi.array()
    .items(
      Joi.object({
        carrierAmount: Joi.string().max(50),
      })
    )
    .optional(),
  backgroundChecks: Joi.array()
    .items(
      Joi.object({
        provider: Joi.string().max(20),
        conducted: Joi.date(),
        expirationDate: Joi.date(),
        refNumber: Joi.string().max(20),
        otherInfo: Joi.string().max(200).optional(),
      })
    )
    .optional(),
  capabilities: Joi.object({
    csa: Joi.boolean().optional(),
    email: Joi.boolean().optional(),
    abstractor: Joi.boolean().optional(),
    hour24service: Joi.boolean().optional(),
    hospitalSigning: Joi.boolean().optional(),
    attorney: Joi.boolean().optional(),
    internet: Joi.boolean().optional(),
    mobileHotspot: Joi.boolean().optional(),
    fingerprinting: Joi.boolean().optional(),
    jailSignings: Joi.boolean().optional(),
    fax: Joi.boolean().optional(),
    laserPrinter: Joi.boolean().optional(),
    eSign: Joi.boolean().optional(),
    weddings: Joi.boolean().optional(),
    otherInfo: Joi.string().max(100).optional(),
  }).optional(),

  spokenLanguages: Joi.array()
    .items(
      Joi.object({
        language: Joi.string(),
      })
    )
    .optional(),
  websites: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri(),
      })
    )
    .optional(),
  customFields: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().max(50),
      })
    )
    .optional(),
  availability: Joi.object({
    mon: Joi.boolean().optional(),
    tue: Joi.boolean().optional(),
    wed: Joi.boolean().optional(),
    thu: Joi.boolean().optional(),
    fri: Joi.boolean().optional(),
    sat: Joi.boolean().optional(),
    sun: Joi.boolean().optional(),
    am: Joi.boolean().optional(),
    pm: Joi.boolean().optional(),
    otherInfo: Joi.string().max(100).optional(),
  }).optional(),

  social: Joi.object({
    facebook: Joi.string().uri().optional(),
    linkedin: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
  }).optional(),
});

export default updateProfileSchema;
