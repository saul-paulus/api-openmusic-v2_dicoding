import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import SongsService from "./services/postgres/SongsService.js";
import songs from "./api/songs/index.js";
import SongsValidator from "./validator/songs/index.js";

dotenv.config();

const init = async () => {
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init().catch((err) => {
  console.log("Gagal menjalankan server :", err);
  process.exit(1);
});
