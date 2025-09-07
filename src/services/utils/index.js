export const mapDBToSongModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

// Mapper untuk albums
export const mapDBToAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});
