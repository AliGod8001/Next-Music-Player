"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Avatar, Popconfirm } from "antd";

import { formatPlaylistTitle } from "@/utils";
import { useUserStore } from "@/store/user-store";

import PlayListDetailMusicList from "./PlayListDetailMusicList";
import NotFound from "../ui/not-found/NotFound";
import Icon from "../ui/Icon";

import styles from "./PlayListDetail.module.scss";

const PlayListDetail = ({ playlistId }: { playlistId: string }) => {
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [playlists, deletePlaylist] = useUserStore((state) => [state.playLists, state.deletePlayList]);
  const playlist = playlists.find(
    (playlist) => playlist.id === Number(playlistId)
  );

  const showPopConfirm = () => {
    setOpen(true)
  }

  const popConfirmOkClickHandler = async () => {
    setLoading(true)
    const { data } = await deletePlaylist(playlist.id)
    if ( data) {
      setLoading(false)
      hidePopConfirm()
      router.push('/playlists')
    }
  }

  const hidePopConfirm = () => {
    setOpen(false)
  }

  return playlist ? (
    <div>
      <div className={styles.header}>
        {playlist.avatar ? (
          <Image
            className={styles.img}
            src={playlist.avatar}
            width={100}
            height={100}
            loading="lazy"
            alt={`${playlist.title} image`}
          />
        ) : (
          <Avatar className={styles.img}>
            {formatPlaylistTitle(playlist.title)}
          </Avatar>
        )}
        <div>
          <h1 className={styles.title} style={{ color: playlist.color }}>
            {playlist.title}
          </h1>
          <span className={styles.count}>
            {playlist.musics.reduce((arc, music) => {
              return arc + 1;
            }, 0)}{" "}
            <small>musics</small>
          </span>
        </div>
        <Popconfirm
          title={`Delete ${playlist.title}`}
          description="Do you want to delete your playlist?"
          open={open}
          onConfirm={popConfirmOkClickHandler}
          okButtonProps={{ loading }}
          onCancel={hidePopConfirm}
        >
          <button className={`btn ${styles.delete}`} onClick={showPopConfirm}><Icon icon="trash" /></button>
    </Popconfirm>
      </div>
      {playlist.musics.length ? (
        <PlayListDetailMusicList
          color={playlist.color}
          playlistId={playlist.id}
          playlistTitle={playlist.title}
          musics={playlist.musics}
        />
      ) : (
        <NotFound>Musics</NotFound>
      )}
    </div>
  ) : (
    <NotFound>Playlist</NotFound>
  );
};

export default PlayListDetail;
