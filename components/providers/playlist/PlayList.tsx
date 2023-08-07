import NotFound from "@/components/ui/not-found/NotFound";

import PlayListItem from "./PlayListItem";
import styles from "./PlayList.module.scss";

const PlayList = ({
  playlists,
  onAddPlayList,
  clickedMusicId,
  loading,
}: {
  playlists: PlayList[];
  clickedMusicId: number;
  onAddPlayList: (playlistId: number, type: ChangePlayListMusicType) => void;
  loading: boolean,
}) => {
  return playlists && playlists.length ? (
    <ul className={styles.list}>
      {playlists.map((playlist) => (
        <PlayListItem
          key={playlist.id}
          playlistData={playlist}
          onAddPlayListClick={onAddPlayList}
          clickedMusicId={clickedMusicId}
          loading={loading}
        />
      ))}
    </ul>
  ) : (
    <NotFound>Playlist</NotFound>
  );
};

export default PlayList;
