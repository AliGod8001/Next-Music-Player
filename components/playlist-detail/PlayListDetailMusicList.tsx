"use client";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Spin } from "antd";

import { useAppStore } from "@/store/app-store";
import { useUserStore } from "@/store/user-store";

import { DraggableContext, DraggableElement } from "../helper/draggable";
import styles from "./PlayListDetailMusicList.module.scss";

const reorder = (list: Music[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const PlayListDetailMusics = ({
  musics,
  playlistId,
  playlistTitle,
  color,
}: {
  musics: Music[];
  playlistId: number;
  playlistTitle: string,
  color: string
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reorderedMusics, setReorderedMusics] = useState<Music[]>(musics);
  const [setMusic, setPlaylist, id] = useAppStore((state) => [state.setMusic, state.setPlaylist, state.playListId]);
  const [changePlaylistMusicOrder, setPlaylistMusic] = useUserStore(
    (state) => [state.changePlayListMusicOrder, state.setPlayListMusic]
  );

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index ) {
      return;
    }

    setReorderedMusics(
      reorder(musics, result.source.index, result.destination.index)
    );
    setLoading(true);
    await changePlaylistMusicOrder(
      playlistId,
      reorder(musics, result.source.index, result.destination.index)
    );
    setLoading(false);
  };

  const musicClickHandler = (type: "play" | "remove", music: Music) => {
    if ( type === "play" ) {
      setMusic(music);
      if ( playlistTitle !== id ) {
        setPlaylist(playlistTitle, musics)
      }
    } else {
      setPlaylistMusic("remove", music, playlistId)
    }
  };

  return (
    <>
      <DraggableContext
        dropId="droppable"
        onDragEnd={onDragEnd}
        draggingOverClassName={styles.draggingover}
        className={styles.wrapper}
        style={{ border: `1px solid ${color}`}}
      >
        {loading && <span className={styles.loading} style={{ border: `1px solid ${color}`}}>updating music orders...<Spin /></span>}
        <DraggableElement
          onMusicClick={musicClickHandler}
          lists={loading ? reorderedMusics : musics}
        />
      </DraggableContext>
    </>
  );
};

export default PlayListDetailMusics;
