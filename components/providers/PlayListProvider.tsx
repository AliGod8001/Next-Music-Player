"use client";
import { useState } from "react";
import { Modal, message } from "antd";

import { useUserStore } from "@/store/user-store";
import { useAppStore } from "@/store/app-store";

import PlayList from "./playlist/PlayList";

const PlayListProvider = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const [
    playlistModalOpen,
    setPlaylistModalOpen,
    musicClicked,
    setMusicClicked,
  ] = useAppStore((state) => [
    state.playListModalOpen,
    state.setPlayListModal,
    state.musicClicked,
    state.setMusicClicked,
  ]);
  const [playlists, setPlaylistMusic] = useUserStore((state) => [state.playLists, state.setPlayListMusic]);
  const [messageApi, contextHolder] = message.useMessage()

  const hideModal = () => {
    setPlaylistModalOpen(false);
    setMusicClicked(null);
  };

  const PlayListAddClickHandler = async (
    playlistId: number,
    type: ChangePlayListMusicType
  ) => {
    setLoading(true)
    const { statusText, data } = await setPlaylistMusic(type, musicClicked, playlistId)
    setLoading(false)
    messageApi.open({
      type: data ? "success" : "error",
      content: statusText
    })
  };

  return (
    <Modal
      title="Add Music To PlayList"
      open={playlistModalOpen}
      footer={null}
      onCancel={hideModal}
    >
      <PlayList
        playlists={playlists}
        onAddPlayList={PlayListAddClickHandler}
        clickedMusicId={musicClicked ? musicClicked.id : -1}
        loading={loading}
      />
      {contextHolder}
    </Modal>
  );
};

export default PlayListProvider;
