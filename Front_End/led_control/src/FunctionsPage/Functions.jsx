// import styles from "./Fill.module.css"
import NavBar from "../NavBar/NavBar"
import MobileButtons from "../Buttons/MobileButtons"
import useIsMobile from '../Hooks/useIsMobile'

function Functions(){
    return(
        <>
            <NavBar
                focusedButton="function"
            />
            <MobileButtons
                show = {useIsMobile()}
                focusedButton="function"
            />
        </>
    )
}

export default Functions
