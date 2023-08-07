import { useRouter } from 'next/navigation'
import { FormEvent, useRef } from 'react'

import Icon from '../ui/Icon'

import styles from './HeaderSearch.module.scss'

const HeaderSearch = () => {
    const router = useRouter()
    const searchInputRef = useRef<HTMLInputElement>()

    
    const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        router.push(`/search?text=${searchInputRef.current.value}`)
    }

    return <div className={styles['search-wrapper']}>
        <Icon className={styles.icon} icon='search' />
        <form onSubmit={searchSubmitHandler}>
            <input 
                className={styles.search}
                type='search' 
                placeholder='search your music here...' 
                ref={searchInputRef}
            />
        </form>
    </div>
}

export default HeaderSearch