import Link from 'next/link'
import { Avatar } from 'antd'
import { useUserStore } from '@/store/user-store'

import styles from './HeaderAccount.module.scss'

const HeaderAccount = () => {
    const userInfo = useUserStore(state => state.userInfo)

    const avatarProps = {
        className: styles.img,
        style: {backgroundColor: '#5773ff', color: '#ffffff'},
        ...(userInfo && userInfo.profileImage && { src: userInfo.profileImage })
    }

    return <Link className={styles.wrapper} href="/profile">
        <Avatar {...avatarProps}>{userInfo && !userInfo.profileImage ? userInfo.email[0].toUpperCase() : "" }</Avatar>
        <span className={styles.text}>{userInfo && userInfo.email}</span>
    </Link>
}

export default HeaderAccount