import Image from 'next/image';

import styles from './LoginFooter.module.scss'

import { googleImage, facebookImage, githubImage } from '@/public/images';

const LoginFooter = ({
    isLogin,
    onChangeLogin,
} : {
    isLogin: boolean,
    onChangeLogin: () => void,
}) => {
    return <div className={styles.footer}>
        <div className={styles['other-sign']}>
            Or {isLogin ? "Sign in" : "Sign up"} with
        </div>
        <div className={styles['social-wrapper']}>
            <div className={styles.social}>
                <Image
                    className='dark-image'
                    src={googleImage}
                    width={30}
                    height={30}
                    alt='google image'
                />
                <span className={styles['social-text']}>Google</span>
            </div>
            <div className={styles.social}>
                <Image
                    className='dark-image'
                    src={facebookImage}
                    width={30}
                    height={30}
                    alt='facebook image'
                />
                <span className={styles['social-text']}>Facebook</span>
            </div>
            <div className={styles.social}>
                <Image
                    className='dark-image'
                    src={githubImage}
                    width={30}
                    height={30}
                    alt='github image'
                />
                <span className={styles['social-text']}>Github</span>
            </div>
        </div>

        <div className={styles.link}>
            {
                isLogin
                ? <>{"Don't"} have an account? <span onClick={onChangeLogin}>Register Now</span></>
                : <>Do have an account? <span onClick={onChangeLogin}>Login Now</span></>
            }
        </div>
    </div>
}

export default LoginFooter;