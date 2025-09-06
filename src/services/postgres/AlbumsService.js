import { nanoid } from "nanoid";
import { Pool } from "pg";

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    
  }
}

export default AlbumsService;
