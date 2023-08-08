/* other imports */
import React, { ButtonHTMLAttributes, CSSProperties } from 'react'
import styles from './MainButton.module.scss'

const convertType = (type: ButtonType) => {
    switch (type) {
        case "primary-outline" :
            return styles['primary-outline']

        case "primary-flat" :
            return styles['primary-flat']

        case "secondary" :
            return styles.secondary

        case "secondary-outline" :
            return styles['secondary-outline']

        case "secondary-flat" :
            return styles['secondary-flat']
    
        case "danger":
            return styles.danger

        default :
            return styles.primary;
    }
}

const MainButton = ({
    children,
    type,
    className,
    onClick,
    disabled,
    circle,
    round,
    style,
    buttonType,
} : {
    children: React.ReactNode,
    type: ButtonType,
    className?: string | string[],
    onClick?: () => void,
    disabled?: boolean,
    circle?: boolean,
    round?: boolean,
    style?: CSSProperties
    buttonType?: buttonType,
}) => {
    const classes = `btn ${styles.button} ${convertType(type)} ${Array.isArray(className) ? className.join(' ') : className} ${circle ? styles.circle : ""} ${round ? styles.round : ""}`
    
    const buttonClickHandler = () => {
        onClick !== undefined ? onClick() : null
    }

    return <button type={buttonType ? buttonType : "button"} className={classes} disabled={disabled} onClick={buttonClickHandler} style={{...style}}>
        {children}
    </button>
}

export default MainButton;