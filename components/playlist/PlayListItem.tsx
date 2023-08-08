import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CSSProperties } from "react";
import { Avatar, Popconfirm } from "antd";

import { useAppStore } from "@/store/app-store";
import { useUserStore } from "@/store/user-store";
import { formatPlaylistTitle } from "@/utils";

import Icon from "../ui/Icon";
import styles from "./PlayListItem.module.scss";

const PlayListItem = ({
  playlistData,
  index,
  onShowMessage,
}: {
  playlistData: PlayList;
  index: number;
  onShowMessage: (type: "success" | "error", content: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [setMusic, setPlaylist, id, isPlaying, setIsPlaying] = useAppStore(
    (state) => [
      state.setMusic,
      state.setPlaylist,
      state.playListId,
      state.isPlaying,
      state.setPlayingState,
    ]
  );
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

  const showPopConfirm = () => {
    setOpen(true);
  };

  const PopconfirmOkHandler = async () => {
    setLoading(true);
    const { status, statusText, data } = await deletePlaylist(playlistData.id);
    if ( data ) {
      setLoading(false);
      hidePopConfirm()
    }
    onShowMessage(status === 201 ? "success" : "error", statusText);
  };

  const hidePopConfirm = () => {
    setOpen(false);
  };

  const playlistClickHandler = () => {
    if (playlistData.title !== id) {
      setMusic(playlistData.musics[0]);
      setPlaylist(playlistData.title, playlistData.musics);
    } else {
      if (isPlaying) setIsPlaying(false);
      else setIsPlaying(true);
    }
  };

  return (
    <li className={styles.item}>
      <Link className={styles.link} href={`/playlists/${playlistData.id}`}>
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
            {formatPlaylistTitle(playlistData.title)}
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
      {musicCount > 0 && (
        <button
          className={`btn ${styles.button} ${styles.play}`}
          onClick={playlistClickHandler}
        >
          <Icon
            icon={
              isPlaying && playlistData.title === id ? "pause-fill" : "play"
            }
          />
        </button>
      )}
      <Popconfirm
        title={`Delete ${playlistData.title}`}
        description="Do you want to delete your playlist?"
        open={open}
        onConfirm={PopconfirmOkHandler}
        okButtonProps={{ loading }}
        onCancel={hidePopConfirm}
      >
        <button
          className={`btn ${styles.button} ${styles.delete}`}
          onClick={showPopConfirm}
        >
          <Icon icon="trash" />
        </button>
      </Popconfirm>
    </li>
  );
};

export default PlayListItem;
