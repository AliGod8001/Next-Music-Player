interface Music {
    id: number,
    name: string,
    src: string,
    coverImage: string,
    avatar: string,
    artist: string,
    playedCount: number
}

interface Artist {
    id: number,
    name: string,
    avatar: string,
    musics: Music[]
}

interface User extends BaseInfo {
    userName: string,
    password: string,
    email: string,
    profileImage?: string,
    birthDate: number,
    playLists: PlayList[],
    recent: Music[],
    favorite: Music[],
}

interface PlayList extends BaseInfo {
    title: string,
    description?: string,
    color: string,
    avatar?: string,
    musics: Music[]
}

interface SidebarLinkInfo {
    id: number,
    title: string,
    links: SidebarLink[],
}

interface SidebarLink {
    id: number,
    title: string,
    href: string,
    icon: typeof iconsName[number],
    child: boolean,
}

interface AuthLocalStorage {
    set_at: number,
    token: string,
    id: string
}

interface AppLocalStorage {
    currentMusic: Music,
    isPlaying: boolean,
    playList: Music[],
    playListId: string,
    volume: number,
    currentMusicTime: number,
    repeatType: RepeatType,
    shuffleIndex: number[]
}

type PasswordStrength = "very weak" | "weak" | "moderate" | "strong" | "powerfull"

type ButtonType = "primary" | "primary-outline" | "primary-flat" | "secondary" | "secondary-outline" | "secondary-flat" | "danger"