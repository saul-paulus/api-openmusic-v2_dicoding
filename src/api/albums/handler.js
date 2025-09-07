import ClientError from "../../exceptions/ClientError.js";

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  _handlerServerError(error, h) {
    console.log(error);
    return h
      .response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      })
      .code(500);
  }

  postAlbumHandler = async (request, h) => {
    try {
      this._validator.validatedAlbumsPayload(request.payload);

      const { name, year } = request.payload;

      const albumId = await this._service.addAlbum({ name, year });

      return h
        .response({
          status: "success",
          message: "Album berhasil ditambahkan",
          data: { albumId },
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
      }
      return this._handlerServerError(error, h);
    }
  };

  getAlbumsHandler = async (request, h) => {
    try {
      const albums = await this._service.getAlbums();
      return h
        .response({
          status: "success",
          data: {
            songs,
          },
        })
        .code(200);
    } catch (error) {
      return this._handlerServerError(error, h);
    }
  };

  getAlbumByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      this._validator.validatedAlbumById({ id });

      const album = await this._service.getAlbumById(id);

      return h
        .response({
          status: "success",
          data: { album },
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
      }
      return this._handlerServerError(error, h);
    }
  };

  putAlbumByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      this._validator.validatedAlbumsPayload(request.payload);

      await this._service.editAlbumById(id, request.payload);

      return h
        .response({
          status: "success",
          message: "Album berhasil diperbarui",
          data: { albumId: id },
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
      }
      return this._handlerServerError(error, h);
    }
  };

  deleteAlbumByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);

      return h
        .response({
          status: "success",
          message: "Album berhasil dihapus",
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(error.statusCode);
      }
      return this._handlerServerError(error, h);
    }
  };
}

export default AlbumsHandler;
