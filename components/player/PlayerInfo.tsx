import Image, { StaticImageData } from 'next/image'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';

import { useAppStore } from '@/store/app-store';

import FavoriteProvider from '@/components/providers/FavoriteProvider'
import PlayerInfoPlayListItem from './PlayerInfoPlayListItem';
import Icon from '../ui/Icon'
import NotFound from '../ui/not-found/NotFound';

import styles from './PlayerInfo.module.scss'

const PlayerInfo = ({
    image,
    imageAlt,
    name,
    artist,
    musicId,
} : {
    image: string | StaticImageData,
    imageAlt: string,
    name: string,
    artist: string,
    musicId?: number,
}) => {
    const [setMusic, currentMusic, playList, indexs, type] = useAppStore(state => [state.setMusic, state.currentMusic, state.playList, state.shuffleIndex, state.repeatType])
    const currentMusicIndex = currentMusic ? playList.findIndex(music => music.id === currentMusic.id) : -1

    const playListItems : MenuProps['items'] = []

    const onClick: MenuProps['onClick'] = ({ key }) => {
        const nextMusic = playList.find(music => music.id === Number(key))
        setMusic(nextMusic)
    };

    if ( playList.length ) {
        if ( type === "shuffle" ) {
            const currentMusicShuffleIndex = indexs.findIndex(indexes => indexes === playList.findIndex(music => music.id === currentMusic.id))
            indexs.forEach((sortIndex, index) => {
                const music = playList[sortIndex]

                playListItems.push({
                    key: music.id,
                    label: <PlayerInfoPlayListItem musicData={music} className={`${currentMusic && music.id === currentMusic.id ? styles.play : ""} ${currentMusicShuffleIndex > index ? styles.passed : ""}`} />
                })
            })
        } else {
            playList.forEach((music, index) => {
                playListItems.push({
                    key: music.id,
                    label: <PlayerInfoPlayListItem musicData={music} className={`${currentMusic && music.id === currentMusic.id ? styles.play : ""} ${currentMusicIndex > index ? styles.passed : ""}`} />
                })
            })
        }
    } else {
        playListItems.push({
            key: 1,
            label: (
                <NotFound>PlayList</NotFound>
            )
        })
    }


    return <Dropdown placement='topLeft' menu={{items: playListItems, onClick}}>
        <div className={styles.info}>
            <div className={styles.img}>
                <Image
                    src={image}
                    width={60}
                    height={60}
                    loading='lazy'
                    alt={imageAlt}
                />
            </div>
            <div>
                <div className={styles.title}>{name}</div>
                <div className={styles.artist}>{artist}</div>
            </div>
            {
                musicId && <FavoriteProvider className={styles.favorite} musicId={musicId} iconClass={styles.icon} activeClass={styles.active}></FavoriteProvider>
            }
            <button className={`btn ${styles.icon}`}>
                <Icon icon='playlist' />
            </button>
        </div>
    </Dropdown>
}

export default PlayerInfo;