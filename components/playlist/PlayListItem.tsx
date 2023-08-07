import { useState } from "react";
import { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "antd";

import { useUserStore } from "@/store/user-store";

import Icon from "../ui/Icon";
import styles from "./PlayListItem.module.scss";

const formatPlayListTitle = (title: string): string => {
  return `${title.split(" ")[0][0].toUpperCase()}${title
    .split(" ")
    .at(-1)[0]
    .toUpperCase()}`;
};

const PlayListItem = ({
  playlistData,
  index,
  onShowMessage,
}: {
  playlistData: PlayList;
  index: number;
  onShowMessage: (type: "success" | "error", content: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deletePlaylist = useUserStore((state) => state.deletePlayList);

  const count: string = index < 10 ? `0${index}` : `${index}`;
  const color: string = playlistData.color;
  const musicCount = playlistData.musics.reduce((arc) => {
    return arc + 1;
  }, 0);

  const imageStyle: CSSProperties = {
    border: `1px solid ${color}`,
    boxShadow: `0 0 8px ${color}80`,
  };

  const playlistClickHandler = () => {
    console.log(`${playlistData.title} play playlist clicked`);
  };

  const playlistDeleteClickHandler = async () => {
    setLoading(true);
    const { status, statusText } = await deletePlaylist(playlistData.id);
    setLoading(false);

    onShowMessage(status === 201 ? "success" : "error", statusText);
  };
  return (
    <li className={styles.item}>
      <Link
        className={styles.link}
        href={`/profile/playlists/${playlistData.id}`}
      >
        <span className={styles.count}>{count}</span>
        {playlistData.avatar ? (
          <Image
            className={styles.img}
            src={playlistData.avatar}
            width={70}
            height={70}
            loading="lazy"
            style={{ ...imageStyle }}
            alt={`${playlistData.title} playlist avatar image`}
          />
        ) : (
          <Avatar className={styles.img} style={{ ...imageStyle }}>
            {formatPlayListTitle(playlistData.title)}
          </Avatar>
        )}
        <div>
          <h3 className={styles.title}>{playlistData.title}</h3>
          {playlistData.description && (
            <p className={styles.text}>{playlistData.description}</p>
          )}
        </div>
        <div className={styles["music-count"]}>
          <span>Musics: </span>
          {musicCount}
        </div>
      </Link>
      <button
        className={`btn ${styles.button} ${styles.play}`}
        onClick={playlistClickHandler}
      >
        <Icon icon="play" />
      </button>
      <button
        className={`btn ${styles.button} ${styles.delete} ${
          loading ? "overlay-loading" : ""
        }`}
        onClick={playlistDeleteClickHandler}
      >
        <Icon icon="trash" />
      </button>
    </li>
  );
};

export default PlayListItem;
