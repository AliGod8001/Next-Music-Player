import { create } from 'zustand'

import { useAppStore } from './app-store'

import PutUserFavorite from '@/services/server/users/PutUserFavorite'
import PutUserPlayList from '@/services/server/users/PutUserPlayList'
import PutUserRecent from '@/services/server/users/PutUserRecent'
import DeleteUserPlayList from '@/services/server/users/DeleteUserPlayList'
import PutUserPlayListMusic from '@/services/server/users/PutUserPlayList.Music'
import PutPlayListMusicOrder from '@/services/server/users/playlists/PutPlayListMusicOrder'

export const useUserStore = create<UserStoreState>() ((set) => ({
    playLists: [],
    recent: [],
    favorite: [],
    userInfo: null,
    login: (user: User) => {
        const userInfo : UserInfo = {
            id: user.id,
            birthDate: user.birthDate,
            email: user.email,
            creationDate: user.creationDate,
            password: user.password,
            userName: user.userName,
            profileImage: user.profileImage,
            modificationDate: user.modificationDate
        }
        set(() => ({
            playLists: user.playLists,
            recent: user.recent,
            favorite: user.favorite,
            userInfo,
        }))
    },
    logout: () => {
        set(() => ({
            playLists: [],
            recent: [],
            favorite: [],
            userInfo: null,
        }))
    },
    setFavorite: async (music: Music) => {
        const res = await PutUserFavorite(useUserStore.getState().userInfo.id, music)

        if ( res.status === 201 ) {
            set(() => ({ favorite: res.data }))
        }
    },
    setRecent: async (music: Music) => {
        if ( useUserStore.getState().userInfo ) {
            const res = await PutUserRecent(useUserStore.getState().userInfo.id, music)
    
            if ( res.status === 201 ) {
                set(() => ({ recent: res.data }))
            }
        }
    },
    setUserInfo: (payload: User) => {
        set((state) => ({
            userInfo: {
                ...state.userInfo,
                password: payload.password,
                profileImage: payload.profileImage,
                modificationDate: payload.modificationDate,
                birthDate: payload.birthDate,
                userName: payload.userName
            }
        }))
    },
    addPlayList: async (payload: PlayList) : Promise<StoreResponse<PlayList>> => {
        const { status, error, data } = await PutUserPlayList(useUserStore.getState().userInfo.id, payload)

        let statusText = "New Playlist Successfully Added."
        if ( error.length > 0 ) {
            statusText = error
        }

        set(() => ({ playLists: data }))

        return {
            status,
            statusText,
            data: data && data[0]
        }
    },
    deletePlayList: async (id: number) : Promise<StoreResponse<string>> => {
        const userId = useUserStore.getState().userInfo.id
        const { status, error, data } = await DeleteUserPlayList(userId, id)

        let statusText = "Your playlist Successfully deleted"
        if ( error.length > 0 ) {
            statusText = error
        }

        if ( status === 201 ) {
            set(() => ({ playLists: data }))
            useAppStore.getState().setMusic(useUserStore.getState().recent[0])
            useAppStore.getState().setPlayingState(false)
            useAppStore.getState().setPlaylist("recent-musics-playlist", useUserStore.getState().recent)
        }

        return {
            status,
            statusText,
            data: "Success"
        }
    },
    setPlayListMusic: async (type: ChangePlayListMusicType, music: Music, playlistId: number) : Promise<StoreResponse<string>> => {
        const res = await PutUserPlayListMusic(useUserStore.getState().userInfo.id, playlistId, music, type)

        if ( res.data ) {
            set(() => ({ playLists: res.data }))

            const playlist = res.data.find(playlist => playlist.id === playlistId )
            if ( useAppStore.getState().playListId === playlist.title ) {
                useAppStore.getState().setPlaylist(playlist.title, playlist.musics)
            }
            return {

                status: 201,
                statusText: `Music ${type === "add" ? "Add To" : "Remove From"} PlayList Successfully`,
                data: "Success"
            }
            
        }


        return {
            status: res.status,
            statusText: res.error
        }
    },
    changePlayListMusicOrder: async (playlistId: number, newOrder: Music[]) => {
        const res = await PutPlayListMusicOrder(useUserStore.getState().userInfo.id, playlistId, newOrder)

        if ( res.data ) {
            set(() => ({ playLists: res.data }))
            const playlist = res.data.find(playlist => playlist.id === playlistId)
            if ( useAppStore.getState().playListId === playlist.title ) {
                useAppStore.getState().setPlaylist(playlist.title, playlist.musics)
            }
        }
    },
}))