"use client"
import { useUserStore } from '@/store/user-store';

import ProfileInfo from './ProfileInfo';
import ProfileStats from './ProfileStats';

import styles from './Profile.module.scss'

const Profile = () => {
    const [userInfo, playLists, favorites] = useUserStore(state => [state.userInfo, state.playLists, state.favorite])

    return <div className={styles.wrapper}>
        {
            userInfo && (
                <>
                    <ProfileInfo 
                        userId={userInfo.id}
                        userName={userInfo.userName} 
                        userEmail={userInfo.email} 
                        userImage={userInfo.profileImage} 
                        dateOfBirth={userInfo.birthDate} 
                        dateOfModification={userInfo.modificationDate} 
                        dateOfJoin={userInfo.creationDate}/>

                    <ProfileStats playListsLength={playLists.length} favoritesLength={favorites.length} />
                </>
            )
        }
    </div>
}

export default Profile;