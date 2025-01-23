import styles from './ButtonArray.module.css'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


function NavButtons({show,  focusedButton = null}) {

    if (show)
        return(
            <section className={styles.buttonContainer}>
            <div className={styles.buttonArray}>
                <Link className = {styles.buttonLinkEl} to ="/fill"><img className = {styles.buttonImage} style = {focusedButton == "fill" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Fill.svg" />     </Link>
                <Link className = {styles.buttonLinkEl} to ="/function" ><img className = {styles.buttonImage} style = {focusedButton == "function" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Function.svg" />  </Link>
                <Link className = {styles.buttonLinkEl} to ="/favorite" ><img className = {styles.buttonImage} style = {focusedButton == "favorite" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Favorite.svg" />  </Link>
                <Link className = {styles.buttonLinkEl} to ="/"><img className = {styles.buttonImage} src = "../../assets/ButtonIcons/Info.svg" />      </Link>
            </div>
            <div className = {styles.buttonLinkEl}><img className = {styles.buttonImage} src = "../../assets/ButtonIcons/Power.svg" />     </div>
            </section>
        )
    else
        return null;
}

NavButtons.propTypes = {
    show : PropTypes.bool,
    focusedButton: PropTypes.string
}

export default NavButtons
