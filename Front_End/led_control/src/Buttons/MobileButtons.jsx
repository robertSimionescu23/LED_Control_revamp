import styles from './ButtonArray.module.css'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function MobileButtons({show, focusedButton = null}) {

    if (show)
        return(
            <div className={styles.mobileButtons}>
                <Link className = {styles.buttonLinkEl} to ="/fill"><img className = {styles.buttonImage} style = {focusedButton == "fill" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Fill.svg" />     </Link>
                <Link className = {styles.buttonLinkEl} to ="/function" ><img className = {styles.buttonImage} style = {focusedButton == "function" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Function.svg" />  </Link>
                <Link className = {styles.buttonLinkEl} to ="/favorite" ><img className = {styles.buttonImage} style = {focusedButton == "favorite" ? {backgroundColor : "gray"} : null} src = "../../assets/ButtonIcons/Favorite.svg" />  </Link>
                <Link className = {styles.buttonLinkEl} to ="/"><img className = {styles.buttonImage} src = "../../assets/ButtonIcons/Info.svg" />      </Link>
                <Link className = {styles.buttonLinkEl} to ="/" ><img className = {styles.buttonImage} src = "../../assets/ButtonIcons/Power.svg" /></Link>
            </div>
        )
    else
        return null;
}

MobileButtons.propTypes = {
    show : PropTypes.bool,
    focusedButton : PropTypes.string
}

export default MobileButtons
