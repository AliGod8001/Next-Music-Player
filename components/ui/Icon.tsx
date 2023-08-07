import { iconsName } from "@/constants/icons-name"

const Icon = ({
    icon,
    className,
    onClick,
} : {
    icon: typeof iconsName[number],
    className?: string
    onClick?: () => void
}) => {
    const classes = `icon-${icon} ${className ? className : ""}`
    
    if (onClick) {
        const iconClickHandler = () => {
            onClick()
        }
        
        return <i onClick={iconClickHandler} className={classes}></i>
    }

    return <i className={classes}></i>
}

export default Icon