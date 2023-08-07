"use client"
import { message } from "antd";
import { useUserStore } from "@/store/user-store";

import NotFound from "../ui/not-found/NotFound";
import PlayListItem from "./PlayListItem";
import PlayListAdd from "./PlayListAdd";

import styles from './PlayList.module.scss'
import React from "react";

const PlayList = () => {
    const [messageApi, contextHolder] = message.useMessage()

    const playLists = useUserStore(state => state.playLists)
    let output = <NotFound>PlayList</NotFound>

    const messageShowHandler = (type: "success" | "error", content: string) => {
        messageApi.open({
            type,
            content
        })
    }

    if ( playLists.length ) {
        output = (
            <ul className={styles.list}>
                {
                    playLists.map((playlist, index) => (
                        <PlayListItem key={playlist.id} playlistData={playlist} index={index+1} onShowMessage={messageShowHandler} />
                    ))
                }
            </ul>
        )
    }

    return (
        <div className={styles.playlist}>
            {output}
            <PlayListAdd onShowMessage={messageShowHandler} />
            {contextHolder}
        </div>
    )
}

export default PlayList;