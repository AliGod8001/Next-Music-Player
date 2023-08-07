import SidebarLogo from './SidebarLogo';
import SidebarMenu from './SidebarMenu';

import styles from './Sidebar.module.scss'

const Sidebar = () => {
    return <div className={styles.sidebar}>
        <SidebarLogo />
        <SidebarMenu />
    </div>
}

export default Sidebar;