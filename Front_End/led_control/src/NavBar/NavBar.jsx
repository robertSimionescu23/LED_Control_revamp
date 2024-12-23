import styles from './NavBar.module.css'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import ButtonArray from './ButtonArray'



function NavBar() {

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const updateView = () => {
        setWindowSize(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", updateView)
        return () => window.removeEventListener("resize", updateView);
    });

    return(
    <>
    {(windowSize > 960) ?
    <section className={styles.navBarContainer}>
        <div className={styles.logoContainer}>
            <h1 className={styles.logo}>C-Control</h1>
        </div>
        <ButtonArray/>
    </section>
    :
    <section className={styles.navBarContainer}>
        <div className={styles.logoContainer}>

        <h1 className={styles.logo}>C-Control</h1>
        </div>
    </section>
    }
    </>
    )
}

export default NavBar
