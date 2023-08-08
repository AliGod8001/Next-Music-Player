import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Avatar } from 'antd'

import { encrypt } from '@/utils'

import Icon from '../ui/Icon'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = ({
    userId,
    userImage,
    userName, 
    userEmail,
    dateOfBirth,
    dateOfModification,
    dateOfJoin,
} : {
    userId: number,
    userImage: string,
    userName?: string,
    userEmail: string,
    dateOfBirth: number,
    dateOfModification?: number,
    dateOfJoin: number,
}) => {
    const router = useRouter()

    const modificationDate = new Date(dateOfModification)
    const birthDate = new Date(dateOfBirth)
    const joinDate = new Date(dateOfJoin)

    const editButtonClickHandler = () => {
        router.push(`/profile/${encrypt(String(userId))}/edit`)
    }

    return <div className={styles.info}>
        <button className={`btn ${styles.edit}`} onClick={editButtonClickHandler}>
            <Icon icon="edit" />
        </button>
        <div className={styles.header}>
            {
                userImage 
                ? <Image
                    className={styles.image}
                    src={userImage}
                    width={70}
                    height={70}
                    loading='lazy'
                    alt={`${userName ? userName : userEmail.split("@")[0]} profile image`}/> 
                : <Avatar className={styles.image}>{userName ? userName[0].toUpperCase() : userEmail[0].toUpperCase()}</Avatar>
            }
            <div>
                <div className={styles.title}>{userEmail}</div>
                <div className={styles.text}>{userName ? userName : "Not Username Set"}</div>
            </div>
        </div>

        <ul className={styles.list}>
            <li>
                <span className={styles['list-title']}>Join Date :</span>
                <span className={styles['list-text']}>{joinDate.toLocaleDateString("en-US")}</span>
            </li>
            <li>
                <span className={styles['list-title']}>Last Change :</span>
                <span className={styles['list-text']}>{modificationDate.toLocaleString("en-US")}</span>
            </li>
            <li>
                <span className={styles['list-title']}>Birth Date :</span>
                <span className={styles['list-text']}>{birthDate.toLocaleDateString("en-US")}</span>
            </li>
        </ul>
    </div>
}

export default ProfileInfo;