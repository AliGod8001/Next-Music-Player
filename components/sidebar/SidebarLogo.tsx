import Link from 'next/link';
import Image from 'next/image';

import { logo } from '@/public/images';
import styles from './SidebarLogo.module.scss'

const SidebarLogo = () => {
    return <Link className={styles.logo} href="/">
        <Image 
            src={logo}
            width={55}
            height={55}
            loading='lazy'
            alt='music player logo image'
        />
        <div className={styles.title}>Music Player</div>
    </Link>
}

export default SidebarLogo;