"use client";
import { useAppStore } from "@/store/app-store";

import MusicItem from "./MusicItem";

import styles from "./MusicList.module.scss";

const MusicList = ({
  name,
  musics,
  playListId,
}: {
  name?: string;
  musics: Music[];
  playListId: string;
}) => {
  const [setMusic, setPlaylist, id] = useAppStore((state) => [
    state.setMusic,
    state.setPlaylist,
    state.playListId,
  ]);

  const musicClickHandler = (music: Music) => {
    setMusic(music);
    if (id !== playListId) {
      setPlaylist(playListId, musics);
    }
  };

  return (
    <>
      {name && <h3 className={styles.title}>{name}</h3>}
      <ul className={styles.list}>
        {musics.map((music) => (
          <MusicItem
            key={music.id}
            musicData={music}
            onMusicClick={musicClickHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default MusicList;
