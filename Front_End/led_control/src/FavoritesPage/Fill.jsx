// import styles from "./Fill.module.css"
import NavBar from "../NavBar/NavBar"
import MobileButtons from "../Buttons/MobileButtons"
import useIsMobile from '../Hooks/useIsMobile'

function Fill(){
    return(
        <>
            <NavBar
                focusedButton="fill"
            />
            <MobileButtons
                show = {useIsMobile()}
                focusedButton="fill"
            />
        </>
    )
}

export default Fill
