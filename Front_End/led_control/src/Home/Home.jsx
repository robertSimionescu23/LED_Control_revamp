import NavBar from '../NavBar/NavBar'
import styles from './Home.module.css'
import useIsMobile from '../Hooks/useIsMobile'
import MobileButtons from '../Buttons/MobileButtons'


function Home() {
    return (
        <>
            <NavBar/>
            <section className={styles.welcomingInfo}>
                <div className={styles.heroContainer}>
                    <h1><span className={styles.name}>C-Control</span> - a led controller, directly on the browser.</h1>
                </div>
                {/* <p>The porejct is powered by the Raspberry Pi Pico, connected to the led band to be controlled. </p> */}
            </section>
            <div className = {styles.emptyFooter}></div>
            <MobileButtons
                //Only show the buttons as a footer, when the screen size is mobile(less than 960px)
                show = {useIsMobile()}
            />
        </>

    )
}

export default Home
