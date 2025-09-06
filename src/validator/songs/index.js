import InvariantError from "../../exceptions/InvariantError.js";
import { SongPayloadSchema, SongByIdSchema } from "./schema.js";

const SongsValidator = {
  validatedSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
    return validationResult;
  },

  validatedSongById: (id) => {
    const validationResult = SongByIdSchema.validate({ id });

    if (!validationResult) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult;
  },
};

export default SongsValidator;
