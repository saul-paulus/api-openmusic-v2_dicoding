import Joi from "joi";

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

const AlbumByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export { AlbumPayloadSchema, AlbumByIdSchema };
