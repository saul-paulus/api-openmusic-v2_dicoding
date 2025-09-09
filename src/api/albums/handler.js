import ClientError from "../../exceptions/ClientError.js";

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postAlbumHandler = async (request, h) => {
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
  };

  getAlbumsHandler = async (request, h) => {
    const albums = await this._service.getAlbums();
    return h
      .response({
        status: "success",
        data: {
          songs,
        },
      })
      .code(200);
  };

  getAlbumByIdHandler = async (request, h) => {
    const { id } = request.params;
    this._validator.validatedAlbumById({ id });

    const album = await this._service.getAlbumById(id);

    return h
      .response({
        status: "success",
        data: { album },
      })
      .code(200);
  };

  putAlbumByIdHandler = async (request, h) => {
    const { id } = request.params;
    this._validator.validatedAlbumsPayload(request.payload);

    await this._service.editAlbumById(id, request.payload);

    return h
      .response({
        status: "success",
        message: "Album berhasil diperbarui",
      })
      .code(200);
  };

  deleteAlbumByIdHandler = async (request, h) => {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return h
      .response({
        status: "success",
        message: "Album berhasil dihapus",
      })
      .code(200);
  };
}

export default AlbumsHandler;
