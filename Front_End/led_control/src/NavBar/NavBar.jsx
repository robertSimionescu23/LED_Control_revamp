import styles from './NavBar.module.css'

function NavBar() {
    return(
    <section className={styles.navBarContainer}>
        <div className={styles.logo}>Color Control</div>
        <div className={styles.buttonArray}>
            <button className={styles.typeButton}>Button</button>
            <button className={styles.typeButton}>Button</button>
            <button className={styles.typeButton}>Button</button>
            <button className={styles.typeButton}>Button</button>
        </div>
        <div className={styles.utilityMenu}>?</div>
    </section>
    )
}

export default NavBar
