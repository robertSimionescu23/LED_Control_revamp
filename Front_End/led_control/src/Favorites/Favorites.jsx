// import styles from "./Fill.module.css"
import NavBar from "../NavBar/NavBar"
import MobileButtons from "../Buttons/MobileButtons"
import useIsMobile from '../Hooks/useIsMobile'

function Favorites(){
    return(
        <>
            <NavBar
                focusedButton="favorite"
            />
            <MobileButtons
                show = {useIsMobile()}
                focusedButton="favorite"
            />
        </>
    )
}

export default Favorites
