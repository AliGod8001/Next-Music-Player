import Link from 'next/link'
import React, { CSSProperties } from 'react'

import styles from './MainCard.module.scss'

const MainCard = ({
    children,
    title,
    className,
    header,
    style,
    link,
    text,
    loading,
    template,
} : {
    children: React.ReactNode,
    title?: string,
    className?: string,
    header?: React.ReactNode,
    style?: CSSProperties
    link?: string,
    text?: string,
    loading?: boolean,
    template?: React.ReactNode,
}) => {
    const classes = `${styles.card} ${className ? className : ""}`
    
    return <div className={classes} style={{...style}}>
        {
            !loading 
            ? title && (
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    {
                        link && text 
                        ? <Link className={styles.link} href={link}>{text}</Link>
                        : <>{header}</>
                    }
                </div>
            )
            : <div className={styles.header}>{template}</div>
        }
        {children}
    </div>
}

export default MainCard;    