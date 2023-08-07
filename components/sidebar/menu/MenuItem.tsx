"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from "@/components/ui/Icon";

import styles from './MenuItem.module.scss'

const MenuItem = ({
    linkInfo
} : {
    linkInfo: SidebarLink
}) => {
    const path = usePathname()
    const classes : string = `${styles.link} ${!linkInfo.child && path === linkInfo.href || linkInfo.child && path.startsWith(linkInfo.href) ? styles.active : ""}`

    return <li>
        <Link href={linkInfo.href} className={classes}>
            <Icon icon={linkInfo.icon} className={styles.icon} />
            <span className={styles.text}>{linkInfo.title}</span>
        </Link>
    </ li>
}

export default MenuItem;