import Joi from "joi";

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer().positive().optional(),
  albumId: Joi.string().optional(),
});

const SongByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export { SongPayloadSchema, SongByIdSchema };
