import IndexTrends from "./trends/IndexTrends";
import IndexArtits from "./artists/IndexArtists";
import IndexTopChart from "./top-chart/IndexTopChart";

import styles from './Index.module.scss'

const Index = ({
    trends,
    topArtists,
    topMusics,
} : {
    trends: Music[],
    topArtists: Artist[],
    topMusics: Music[],
}) => {
    return <section className={styles.section}>
        <IndexTrends trendsInfo={trends} />
        <div className={styles.content}>
            <IndexArtits artists={topArtists} />
            <IndexTopChart musics={topMusics} />
        </div>
    </section>
}

export default Index;