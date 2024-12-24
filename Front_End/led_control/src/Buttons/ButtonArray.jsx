import styles from './ButtonArray.module.css'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function ButtonArray({show}) {

    if (show)
        return(
            <div className={styles.buttonArray}>
                <Link to ="/fill"className = {styles.buttonImage}><img  src = "../../assets/ButtonIcons/Fill.svg" />     </Link>
                <Link to ="/function" className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Function.svg" />  </Link>
                <Link to ="favorite" className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Favorite.svg" />  </Link>
                <Link to ="/"className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Info.svg" />      </Link>
                <Link className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Power.svg" />     </Link>
            </div>
        )
    else
        return null;
}

ButtonArray.propTypes = {
    show : PropTypes.bool
}

export default ButtonArray
