export const SidebarLinks : SidebarLinkInfo[] = [
    {
        id: 401,
        title: "MENU",
        links: [
            {
                id: 501,
                title: "Explore",
                href: "/",
                icon: "voice",
                child: false,
            },
            {
                id: 502,
                title: "Musics",
                href: "/musics",
                icon: "category",
                child: true,
            },
            {
                id: 503,
                title: "Artists",
                href: "/artists",
                icon: "setting",
                child: true,
            }
        ]
    },
    {
        id: 402,
        title: "LIBRARY",
        links: [
            {
                id: 504,
                title: "Recents",
                href: "/recents",
                icon: "recent",
                child: false,
            },
            {
                id: 505,
                title: "Favorites",
                href: "/favorites",
                icon: "heart",
                child: false,
            },
            {
                id: 506,
                title: "Playlists",
                href: "/playlists",
                icon: "playlist",
                child: true,
            },
            {
                id: 507,
                title: "Profile",
                href: "/profile",
                icon: "user",
                child: true,
            },
        ]
    }
]