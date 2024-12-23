import NavBar from '../NavBar/NavBar'
import ButtonArray from '../NavBar/ButtonArray'
import styles from './Home.module.css'
import {useState, useEffect} from 'react'


function Home() {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const updateView = () => {
        setWindowSize(window.innerWidth)
        }

    useEffect(() => {
        window.addEventListener("resize", updateView)
        return () => window.removeEventListener("resize", updateView);
    });

    return (
        <>
            { (windowSize > 960) ?
            <>
                <NavBar/>
                <section className={styles.welcomingInfo}>
                    <h1>Welcome to C-Control</h1>
                </section>
            </>
            :
            <>
                <NavBar/>
                <section className={styles.welcomingInfo}>
                    <h1>Welcome to C-Control</h1>
                </section>
                <ButtonArray/>
            </>
            }
        </>
    )
}

export default Home
