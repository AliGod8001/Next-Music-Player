import Link from "next/link";
import Image from "next/image";

import { useAppStore } from "@/store/app-store";
import useAudioDuration from "@/hooks/use-audio-duration";
import FavoriteProvider from "@/components/providers/FavoriteProvider";
import AddToPlayList from "@/components/helper/AddToPlayList";
import Icon from "@/components/ui/Icon";

import styles from "./IndexTopChartItem.module.scss";
import React from "react";

const IndexTopChartItem = ({
  musicData,
  index,
  isDragging,
  inPlaylist,
  onMusicClick,
}: {
  musicData: Music;
  index: number;
  isDragging?: boolean;
  inPlaylist?: boolean;
  onMusicClick: (type: "play" | "remove", music: Music) => void;
}) => {
  const [music, isPlaying, setIsPlaying] = useAppStore((state) => [
    state.currentMusic,
    state.isPlaying,
    state.setPlayingState,
  ]);

  const { durationSeconds, formatedDuration, output } = useAudioDuration(musicData.src)
  const number = index < 10 ? `0${index}` : `${index}`;
  const currentMusic = music && music.id === musicData.id;

  const musicPlayClickHandler = () => {
    if (currentMusic) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    } else {
      onMusicClick("play", musicData);
    }
  };

  const removeFromPlaylistClickHandler = () => {
    onMusicClick("remove", musicData)
  }

  return (
    <li style={{ listStyle: "none" }}>
      {output}
      <div className={`${styles.link} ${isDragging ? styles.dragging : ""}`}>
        <span className={styles.number}>{number}</span>
        <Image
          className={styles.img}
          src={musicData.avatar}
          width={90}
          height={70}
          loading="lazy"
          alt={`${musicData.name} music cover image`}
        />

        <Link href="/">
          <h5 className={styles.title}>{musicData.name}</h5>
          <h6 className={styles.text}>{musicData.artist}</h6>
        </Link>

        <span className={styles.time}>
          {durationSeconds ? `${formatedDuration} '` : "00:00 '"}
        </span>
        <button
          className={`btn ${styles.button} ${styles.play} ${
            currentMusic ? styles.active : ""
          }`}
          onClick={musicPlayClickHandler}
        >
          <Icon icon={currentMusic && isPlaying ? "pause-fill" : "play"} />
        </button>

        <FavoriteProvider
          className={`btn ${styles.button} ${styles.favorite}`}
          musicId={musicData.id}
          activeClass={styles.active}
        ></FavoriteProvider>
        {!inPlaylist ? (
          <AddToPlayList
            musicId={musicData.id}
            className={`${styles.button} ${styles.playlist}`}
          />
        ) : (
          <button onClick={removeFromPlaylistClickHandler} className={`btn ${styles.playlist} ${styles.remove}`}>
            <Icon icon="minus" />
          </button>
        )}
      </div>
    </li>
  );
};

export default IndexTopChartItem;
