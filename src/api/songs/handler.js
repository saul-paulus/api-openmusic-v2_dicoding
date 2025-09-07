import ClientError from "../../exceptions/ClientError.js";

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  _handleServerError(error, h) {
    console.log(error);
    return h
      .response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      })
      .code(500);
  }

  postSongHandler = async (request, h) => {
    try {
      this._validator.validatedSongPayload(request.payload);
      const { title, year, genre, performer, duration, albumId } =
        request.payload;

      const songId = await this._service.addSong({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      return h
        .response({
          status: "success",
          message: "Song berhasil ditambahkan",
          data: { songId },
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
      return this._handleServerError(error, h);
    }
  };

  getSongsHandler = async (request, h) => {
    try {
      const { title, performer } = request.query;
      const songs = await this._service.getSongs({ title, performer });

      return h
        .response({
          status: "success",
          data: {
            songs,
          },
        })
        .code(200);
    } catch (error) {
      return this._handleServerError(error, h);
    }
  };

  getSongByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;

      this._validator.validatedSongById({ id });
      const song = await this._service.getSongById(id);

      return h
        .response({
          status: "success",
          data: { song },
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
      return this._handleServerError(error, h);
    }
  };

  putSongByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      this._validator.validatedSongPayload(request.payload);

      await this._service.editSongById(id, request.payload);

      return h
        .response({
          status: "success",
          message: "Song berhasil diperbaharui",
          data: {
            songId: id,
          },
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(200);
      }

      return this._handleServerError(error, h);
    }
  };

  deleteSongByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;

      await this._service.deleteSongById(id);

      return h
        .response({
          status: "success",
          message: "Song berhasil dihapus",
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: error.message,
          })
          .code(200);
      }
      return this._handleServerError(error, h);
    }
  };
}

export default SongsHandler;
