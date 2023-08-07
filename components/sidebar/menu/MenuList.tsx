import MenuItem from "./MenuItem";

import styles from './MenuList.module.scss'

const MenuList = ({
    title,
    links,
} : {
    title: string,
    links: SidebarLink[]
}) => {
    return <div className={styles.wrapper}>
        <h4 className={styles.title}>{title}</h4>
        <ul className={styles.list}>
            {
                links.map(link => <MenuItem key={link.id} linkInfo={link} />)
            }
        </ul>
    </div>
}

export default MenuList;