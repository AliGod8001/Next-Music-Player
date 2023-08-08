"use client";

import { useState } from "react";
import { Avatar, ColorPicker, Form, Input, Modal, Spin } from "antd";

import { useAppStore } from "@/store/app-store";
import { useUserStore } from "@/store/user-store";

import { rgbaToHex } from "@/utils";

import useImage from "@/hooks/use-image";

import MainButton from "../ui/button/MainButton";
import styles from "./PlayListAdd.module.scss";

const titleConfig = {
  rules: [{ required: true, message: "PlayList title is required!" }],
};

const PlayListAdd = ({
  onShowMessage,
}: {
  onShowMessage: (type: "success" | "error", content: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    image,
    reset,
    status,
    output,
    loading: imageLoading,
  } = useImage({
    inputId: "playlistAvatar",
    maxSize: 2,
    prefix: "MB",
    errorClass: styles.error,
  });

  const setDisableKeydown = useAppStore((state) => state.setDisableKeyDown);
  const addPlaylist = useUserStore((state) => state.addPlayList);
  const [formApi] = Form.useForm();

  const avatarProps = {
    className: styles.img,
    ...(image && { src: image }),
  };

  const showModal = () => {
    setIsModalOpen(true);
    setDisableKeydown(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setDisableKeydown(false);
  };

  const addPlayListFormFinishHandler = async (payload: AddPlayListPayload) => {
    setLoading(true);
    let hexColor: string = "#1677FF";
    if (payload.playlistColor !== undefined) {
      const colorData = payload.playlistColor.metaColor;
      hexColor = rgbaToHex(colorData.r, colorData.g, colorData.b, colorData.a);
    }

    const { status, statusText } = await addPlaylist({
      id: new Date().getTime(),
      creationDate: new Date().getTime(),
      title: payload.playlistTitle,
      description: payload.playlistDescription,
      color: hexColor,
      avatar: image,
      musics: [],
    });

    setLoading(false);
    onShowMessage(status === 201 ? "success" : "error", statusText);
    if (status === 201) {
      formApi.resetFields();
      reset();
    }
    hideModal();
  };

  return (
    <div className={styles["playlist-add"]}>
      <MainButton type="primary-outline" onClick={showModal}>
        Add new playList
      </MainButton>

      <Modal
        title="Add PlayList"
        open={isModalOpen}
        footer={null}
        onCancel={hideModal}
      >
        <Form
          form={formApi}
          name="add-playlist"
          onFinish={addPlayListFormFinishHandler}
          className={styles.form}
          tabIndex={1}
        >
          <Form.Item
            name="playlistTitle"
            label="PlayList Title"
            {...titleConfig}
          >
            <Input type="text" placeholder="Enter PlayList Title..." />
          </Form.Item>
          <Form.Item name="playlistDescription" label="PlayList Description">
            <Input type="text" placeholder="Enter PlayList Description..." />
          </Form.Item>
          <Form.Item name="playlistColor" label="ColorPicker">
            <ColorPicker />
          </Form.Item>
          <div className={styles.avatar}>
            <label
              htmlFor="playlistAvatar"
              className={`${styles.label} ${
                status === 501 ? styles["has-error"] : ""
              }`}
            >
              PlayList Avatar:
            </label>
            <label htmlFor="playlistAvatar">
              {imageLoading ? <div className={styles.img}><Spin /></div> : <Avatar {...avatarProps}>{!image ? "PA" : ""}</Avatar>}
            </label>
            {output}
          </div>
          <div className={styles.action}>
            <MainButton
              type="primary"
              className={loading ? "overlay-loading" : ""}
              buttonType="submit"
            >
              Submit
            </MainButton>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PlayListAdd;
