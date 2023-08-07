"use client";
import { Modal } from "antd";

import { useAppStore } from "@/store/app-store";
import NotFound from "@/components/ui/not-found/NotFound";

const PlayListProvider = () => {
  const [
    playlist,
    playlistModalOpen,
    setPlaylistModalOpen,
    setPlaylistClicked,
  ] = useAppStore((state) => [
    state.playList,
    state.playListModalOpen,
    state.setPlayListModal,
    state.setPlayListClicked,
  ]);

  const hideModal = () => {
    setPlaylistModalOpen(false)
  }

  return (
    <Modal
      title="Add Music To PlayList"
      open={playlistModalOpen}
      footer={null}
      onCancel={hideModal}
    >
        {
            playlist && playlist.length ? <ul>
                <>
                    {
                        playlist.map(pl => <li key={pl.id}>{pl.name}</li>)
                    }
                </>
            </ul> : <NotFound>Play List</NotFound>
        }
    </Modal>
  );
};

export default PlayListProvider;
