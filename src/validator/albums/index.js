import InvariantError from "../../exceptions/InvariantError.js";
import { AlbumPayloadSchema, AlbumByIdSchema } from "./schema.js";

const AlbumsValidator = {
  validatedAlbumsPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
    return validationResult;
  },

  validatedAlbumById: (id) => {
    const validationResult = AlbumByIdSchema.validate({ id });

    if (!validationResult) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult;
  },
};

export default AlbumsValidator;
