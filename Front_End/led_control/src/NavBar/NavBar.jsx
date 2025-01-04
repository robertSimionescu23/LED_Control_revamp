import styles from './NavBar.module.css'
import NavButtons from '../Buttons/NavButtons'
import useIsMobile from '../Hooks/useIsMobile'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function NavBar({focusedButton = null}) {
    return(
    <section className={styles.navBarContainer}>
        <Link to = "/" className={styles.logoContainer}>
            <h1 className={styles.logo}>C-Control</h1>
        </Link>
        <NavButtons
            // We want the buttons to not show on the navigation bar if the device is mobile, as they will show up in the footer.
            show = {!useIsMobile()}
            focusedButton={focusedButton}
        />
    </section>
    )
}

NavBar.propTypes = {
    focusedButton: PropTypes.string
}

export default NavBar
