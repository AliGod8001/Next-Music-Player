import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './HeaderMenu.module.scss'

const HeaderMenu = () => {
    const path = usePathname();

    return <nav className={styles.menu}>
        <Link href="/broadcast" className={`${styles.link} ${path === "/broadcast" ? styles.active : ""}`}>
            Broadcast
        </Link>
        <Link href="/podcast" className={`${styles.link} ${path === "/podcast" ? styles.active : ""}`}>
            Podcast
        </Link>
        <Link href="/live" className={`${styles.link} ${path === "/live" ? styles.active : ""}`}>
            Live
        </Link>
    </nav>
}

export default HeaderMenu;