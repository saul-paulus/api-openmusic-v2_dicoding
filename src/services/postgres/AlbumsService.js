import { nanoid } from "nanoid";
import { Pool } from "pg";
import InvariantError from "../../exceptions/InvariantError.js";
import NotFoundError from "../../exceptions/NotFoundError.js";
import { mapDBToAlbumModel } from "../utils/index.js";

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO albums (id, name, year, created_at, updated_at)
             VALUES($1, $2, $3, $4, $5) RETURNING id`,
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.id) {
      throw new InvariantError("Album gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getAlbums() {
    const result = await this._pool.query("SELECT * FROM albums");

    if (!result) {
      throw new InvariantError("Data gagal dimuat");
    }
    return result.rows.map(mapDBToAlbumModel);
  }

  async getAlbumById(id) {
    const query = {
      text: `
        SELECT a.id as album_id, a.name as album_name, a.year, 
             b.id as song_id, b.title as song_title, b.performer
        FROM albums a
        LEFT JOIN songs b ON b.album_id = a.id
        WHERE a.id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    const album = {
      id: result.rows[0].album_id,
      name: result.rows[0].album_name,
      year: result.rows[0].year,
      songs: [],
    };

    result.rows.forEach((row) => {
      if (row.song_id) {
        album.songs.push({
          id: row.song_id,
          title: row.song_title,
          performer: row.performer,
        });
      }
    });

    return album;
  }

  async editAlbumById(id, { name, year }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `UPDATE albums 
             SET name = $1, year = $2, updated_at = $3 
             WHERE id = $4 RETURNING id`,
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui album. Id tidak ditemukan");
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: "DELETE FROM albums WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Album gagal dihapus. Id tidak ditemukan");
    }
  }
}

export default AlbumsService;
