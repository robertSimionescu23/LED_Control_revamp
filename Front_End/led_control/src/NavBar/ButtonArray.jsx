import styles from './ButtonArray.module.css'
import { Link } from "react-router-dom"

function ButtonArray() {

return(
    <div className={styles.buttonArray}>
        <Link className = {styles.buttonImage}><img  src = "../../assets/ButtonIcons/Fill.svg" />     </Link>
        <Link className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Function.svg" />  </Link>
        <Link className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Favorite.svg" />  </Link>
        <Link className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Info.svg" />      </Link>
        <Link className = {styles.buttonImage}><img src = "../../assets/ButtonIcons/Power.svg" />     </Link>
    </div>
)}

export default ButtonArray
