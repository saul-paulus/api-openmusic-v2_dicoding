import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import SongsService from "./services/postgres/SongsService.js";
import songs from "./api/songs/index.js";
import SongsValidator from "./validator/songs/index.js";
import AlbumsValidator from "./validator/albums/index.js";
import AlbumsService from "./services/postgres/AlbumsService.js";
import albums from "./api/albums/index.js";

dotenv.config();

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init().catch((err) => {
  console.log("Gagal menjalankan server :", err);
  process.exit(1);
});
