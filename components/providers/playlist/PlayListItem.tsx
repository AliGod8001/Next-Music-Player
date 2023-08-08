"use client";
import Image from "next/image";
import { useState } from "react";
import { Avatar, message } from "antd";

import { useUserStore } from "@/store/user-store";
import { useAppStore } from "@/store/app-store";

import MainButton from "@/components/ui/button/MainButton";
import { formatPlaylistTitle } from "@/utils";

import styles from "./PlayListItem.module.scss";

const PlayListItem = ({ playlistData }: { playlistData: PlayList }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const setPlaylistMusic = useUserStore((state) => state.setPlayListMusic);
  const musicClicked = useAppStore((state) => state.musicClicked);
  const [messageApi, contextHolder] = message.useMessage();

  const musicIsInPlaylist =
    musicClicked &&
    playlistData.musics.length &&
    playlistData.musics.findIndex((music) => music.id === musicClicked.id) !==
      -1;

  const addToPlayListClickHandler = async () => {
    setLoading(true);
    const { statusText, data } = await setPlaylistMusic(
      musicIsInPlaylist ? "remove" : "add",
      musicClicked,
      playlistData.id
    );
    setLoading(false);
    messageApi.open({
      type: data ? "success" : "error",
      content: statusText,
    });
  };

  return (
    <li className={styles.item}>
      {playlistData.avatar ? (
        <Image
          className={styles.img}
          width={50}
          height={50}
          loading="lazy"
          src={playlistData.avatar}
          alt={`${playlistData.title} music playlist image`}
        />
      ) : (
        <Avatar className={styles.img}>
          {formatPlaylistTitle(playlistData.title)}
        </Avatar>
      )}
      <div>
        <div className={styles.title}>{playlistData.title}</div>
        <span className={styles.text}>{playlistData.description}</span>
      </div>
      <MainButton
        type={musicIsInPlaylist ? "danger" : "primary"}
        className={`${styles.button} ${loading ? "overlay-loading" : ""}`}
        onClick={addToPlayListClickHandler}
      >
        {musicIsInPlaylist ? "Remove" : "Add"}
      </MainButton>
      {contextHolder}
    </li>
  );
};

export default PlayListItem;
