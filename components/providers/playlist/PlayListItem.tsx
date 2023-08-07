import Image from "next/image";
import Avatar from "antd/es/avatar/avatar";

import MainButton from "@/components/ui/button/MainButton";

import styles from "./PlayListItem.module.scss";

const formatPlayListTitle = (title: string): string => {
  return `${title.split(" ")[0][0].toUpperCase()}${title
    .split(" ")
    .at(-1)[0]
    .toUpperCase()}`;
};

const PlayListItem = ({
  playlistData,
  onAddPlayListClick,
  clickedMusicId,
  loading,
}: {
  playlistData: PlayList;
  clickedMusicId: number;
  onAddPlayListClick: (
    playlistId: number,
    type: ChangePlayListMusicType
  ) => void;
  loading: boolean,
}) => {
  const musicIsInPlaylist =
    playlistData.musics.length &&
    playlistData.musics.findIndex((music) => music.id === clickedMusicId) !==
      -1;

  const addToPlayListClickHandler = () => {
    onAddPlayListClick(playlistData.id, musicIsInPlaylist ? "remove" : "add");
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
          {formatPlayListTitle(playlistData.title)}
        </Avatar>
      )}
      <div>
        <div className={styles.title}>{playlistData.title}</div>
        <span className={styles.text}>{playlistData.description}</span>
      </div>
      <MainButton
        type="primary"
        className={`${styles.button} ${loading ? "overlay-loading" : ""}`}
        onClick={addToPlayListClickHandler}
      >
        {musicIsInPlaylist ? "Remove From PlayList" : "Add To PlayList"}
      </MainButton>
    </li>
  );
};

export default PlayListItem;
