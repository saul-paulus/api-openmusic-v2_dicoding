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
}
