// import styles from "./Fill.module.css"
import NavBar from "../NavBar/NavBar"
import MobileButtons from "../Buttons/MobileButtons"
import useIsMobile from '../Hooks/useIsMobile'
import ColorPicker from "../ColorPicker/ColorPicker"

function Fill(){
    return(
        <>
            <NavBar
                focusedButton="fill"
            />
            <ColorPicker/>
            <MobileButtons
                show = {useIsMobile()}
                focusedButton="fill"
            />
        </>
    )
}

export default Fill
