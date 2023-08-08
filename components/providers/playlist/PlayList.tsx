import NotFound from "@/components/ui/not-found/NotFound";

import PlayListItem from "./PlayListItem";
import styles from "./PlayList.module.scss";
import MainButton from "@/components/ui/button/MainButton";
import Link from "next/link";

const PlayList = ({
  playlists,
  onButtonClick,
}: {
  playlists: PlayList[];
  onButtonClick: () => void;
}) => {
  return playlists && playlists.length ? (
    <ul className={styles.list}>
      {playlists.map((playlist) => (
        <PlayListItem key={playlist.id} playlistData={playlist} />
      ))}
    </ul>
  ) : (
    <div style={{ textAlign: "center" }}>
      <NotFound>Playlist</NotFound>
      <MainButton type="primary" style={{ marginTop: 10 }} onClick={onButtonClick}>
        <Link href="/playlists">Add Playlist</Link>
      </MainButton>
    </div>
  );
};

export default PlayList;
