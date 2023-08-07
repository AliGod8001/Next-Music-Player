import styles from './ProfileStats.module.scss'

const ProfileStats = ({
    playListsLength,
    favoritesLength,
} : {
    playListsLength: number,
    favoritesLength: number
}) => {
    return <div className={styles.stats}>
        <div className={styles.item}>
            <span className={styles.title}>Your Play Lists Count :</span>
            <span className={styles.text}>{playListsLength} <small>Play Lists</small></span>
        </div>
        <div className={styles.item}>
            <span className={styles.title}>Your Favorites Count :</span>
            <span className={styles.text}>{favoritesLength} <small>Musics</small></span>
        </div>
        <div className={styles.item}>
            <span className={styles.title}>Your Listen time :</span>
            <span className={styles.text}>1,000 <small>Hours</small></span>
        </div>
        <div className={styles.item}>
            <span className={styles.title}>Your Up time :</span>
            <span className={styles.text}>2,500 <small>Hours</small></span>
        </div>
        <div className={styles.item}>
            <span className={styles.title}>Artist Following :</span>
            <span className={styles.text}>500 <small>Artists</small></span>
        </div>
    </div>
}

export default ProfileStats;