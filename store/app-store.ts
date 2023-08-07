import { create } from 'zustand'
import { useUserStore } from './user-store'

const STORAGE_NAME = process.env.NEXT_PUBLIC_APP_STORE

const shuffleSortIndex = <T>(arr: T[]): number[] => {
    const indexes: number[] = arr.map((_, index) => index);
  
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
  
    indexes.sort((a, b) => arr[a] < arr[b] ? -1 : 1);
  
    return indexes;
  }

const changeAppLocalStorage = (payload: AppLocalStoragePayload) => {
    if ( typeof window !== 'undefined' ) {
        const item : AppLocalStorage = JSON.parse(localStorage.getItem(STORAGE_NAME))
    
        switch (payload.type) {
            case "currentMusic":
                item.currentMusic = payload.music
                item.currentMusicTime = 0
                break;
    
            case "currentMusicTime":
                item.currentMusicTime = payload.time;
                break;
    
            case "isPlaying":
                item.isPlaying = payload.isPlaying;
                break;
    
            case "playlist":
                item.playList = payload.playlist
                item.playListId = payload.id
                break;
    
            case "volume":
                item.volume = payload.volume
                break;
    
            case "repeat":
                item.repeatType = payload.repeatType
                break;
    
            case "shuffle":
                item.shuffleIndex = payload.array
                break;
        }
    
        localStorage.setItem(STORAGE_NAME, JSON.stringify(item))
    }
}

export const useAppStore = create<AppStoreState>() ((set) => ({
    currentMusic: null,
    isPlaying: false,
    repeatType: "all",
    volume: 1,
    playList: [],
    playListId: "",
    shuffleIndex: [],
    currentMusicTime: 0,
    disableKeyDown: false,
    playListModalOpen: false,
    musicClicked: null,
    setInitialApp: (payload: AppLocalStorage) => {
        set(() => ({
            currentMusic: payload.currentMusic,
            isPlaying: false,
            repeatType: payload.repeatType,
            volume: payload.volume,
            playList: payload.playList,
            playListId: payload.playListId,
            shuffleIndex: payload.shuffleIndex,
            currentMusicTime: payload.currentMusicTime
        }))
    },
    setPlayListModal: (type: boolean) => {
        set(() => ({ playListModalOpen: type }))
    },
    setMusicClicked: (music: Music) => {
        set(() => ({ musicClicked: music }))
    },
    setDisableKeyDown: (disabled: boolean) => set(() => ({ disableKeyDown: disabled })),
    setRepeatType: (type: RepeatType) => {
        set(() => ({ repeatType: type }))
        changeAppLocalStorage({
            type: "repeat",
            repeatType: type
        })
    },
    setPlayingState: (status: boolean) => {
        set(() => ({ isPlaying: status }))
        changeAppLocalStorage({
            type: "isPlaying",
            isPlaying: status
        })
    },
    setMusic: (music: Music) => {
        set(() => ({
            currentMusic: music,
            currentMusicTime: 0
        }))
        changeAppLocalStorage({
            type: "currentMusic",
            music: music
        })
        if ( !useAppStore.getState().isPlaying ) {
            useAppStore.getState().setPlayingState(true)
        }
        useUserStore.getState().setRecent(music)
    },
    changeMusic: (type: ChangeMusicType, auto?: boolean) => {
        const repeatType = useAppStore.getState().repeatType
        const currentMusic = useAppStore.getState().currentMusic
        if ( type === "next" && auto && repeatType === "off" ) {
            set(() => ({ isPlaying: false }))   
            changeAppLocalStorage({
                type: "isPlaying",
                isPlaying: false
            })

            return;
        }
        let nextMusic : Music;

        if ( type === "next" && auto && repeatType === "once" ) {
            nextMusic = currentMusic;
            set(() => ({ isPlaying: false }))
            setTimeout(() => {
                set(() => ({ isPlaying: true }))
            }, 300);
        } 

        const playList = useAppStore.getState().playList
        const playlistLength = playList.length
        let currentMusicIndex = playList.findIndex(music => music.id === currentMusic.id)
        if ( repeatType === "all" ) {
            if ( type === "next" ) {
                if ( currentMusicIndex + 1 === playlistLength ) {
                    currentMusicIndex = -1
                }
                currentMusicIndex += 1
            }
            if ( type === "prev" ) {
                if ( currentMusicIndex === 0 ) {
                    currentMusicIndex = playlistLength
                }
                currentMusicIndex -= 1
            }

            nextMusic = playList[currentMusicIndex]
        }

        if ( repeatType === "shuffle" ) {
            let shuffleIndex = useAppStore.getState().shuffleIndex.findIndex(indexes => indexes === currentMusicIndex)

            if ( type === "next" ) {
                if ( shuffleIndex + 1 === playlistLength ) {
                    shuffleIndex = -1
                }
                shuffleIndex += 1
            }
            if ( type === "prev" ) {
                if ( shuffleIndex === 0 ) {
                    shuffleIndex = useAppStore.getState().shuffleIndex.length 
                }
                shuffleIndex -= 1
            }

            nextMusic = playList[useAppStore.getState().shuffleIndex[shuffleIndex]]
        }

        set(() => ({
            currentMusic: nextMusic,
            currentMusicTime: 0
        }))
        changeAppLocalStorage({
            type: "currentMusic",
            music: nextMusic
        })
        useUserStore.getState().setRecent(nextMusic)
    },
    setCurrentMusicTime: (time: number) => {
        set(() => ({ currentMusicTime: time }))
        changeAppLocalStorage({
            type: "currentMusicTime",
            time,
        })
    },
    setVolume: (newVal: number) => {
        set(() => ({ volume: newVal }))
        changeAppLocalStorage({
            type: "volume",
            volume: newVal
        })
    },
    setPlaylist: (id: string, musics: Music[]) => {
        const indexes = shuffleSortIndex<Music>(musics)

        set(() => ({ 
            playList: musics,
            playListId: id,
            shuffleIndex: indexes
        }))

        changeAppLocalStorage({
            type: "playlist",
            playlist: musics,
            id
        })
        changeAppLocalStorage({
            type: "shuffle",
            array: indexes
        })
    }
}))