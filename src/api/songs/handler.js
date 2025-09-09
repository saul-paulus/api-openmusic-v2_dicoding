import ClientError from "../../exceptions/ClientError.js";

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postSongHandler = async (request, h) => {
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
  };

  getSongsHandler = async (request, h) => {
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
  };

  getSongByIdHandler = async (request, h) => {
    const { id } = request.params;

    this._validator.validatedSongById({ id });
    const song = await this._service.getSongById(id);

    return h
      .response({
        status: "success",
        data: { song },
      })
      .code(200);
  };

  putSongByIdHandler = async (request, h) => {
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
  };

  deleteSongByIdHandler = async (request, h) => {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    return h
      .response({
        status: "success",
        message: "Song berhasil dihapus",
      })
      .code(200);
  };
}

export default SongsHandler;
