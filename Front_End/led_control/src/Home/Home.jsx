import NavBar from '../NavBar/NavBar'
import ButtonArray from '../Buttons/ButtonArray'
import styles from './Home.module.css'
import useIsMobile from '../Hooks/useIsMobile'


function Home() {

    return (
        <>
            <NavBar/>
            <section className={styles.welcomingInfo}>
                <h1>Welcome to C-Control</h1>
                <p>C-Control is a LED controller interface, wrapped into a website!</p>
            </section>
            <ButtonArray
                //Only show the buttons as a footer, when the screen size is mobile(less than 960px)
                show = {useIsMobile()}
            />
        </>

    )
}

export default Home
