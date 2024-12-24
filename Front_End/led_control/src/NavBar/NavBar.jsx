import styles from './NavBar.module.css'
import ButtonArray from '../Buttons/ButtonArray'
import useIsMobile from '../Hooks/useIsMobile'
import { Link } from "react-router-dom"


function NavBar() {

    return(
    <section className={styles.navBarContainer}>
        <Link to = "/" className={styles.logoContainer}>
            <h1 className={styles.logo}>C-Control</h1>
        </Link>
        <ButtonArray
            // We want the buttons to not show on the navigation bar if the device is mobile, as they will show up in the footer.
            show = {!useIsMobile()}
        />
    </section>
    )
}

export default NavBar
