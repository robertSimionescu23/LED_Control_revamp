import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';

// Custom Hook to use for deciding where the buttons go. Returns a boolean, representing if the screen is mobile device sized or not
let useIsMobile = ()  =>
    {
        const location = useLocation(); //If url changes, we will check using this const, if a resizing is needed

        //Set up a stateful variable, keeping track of screen type.
        const [isMobile, setIsMobile]     = useState(false)

        //if screen size < 960 px => return true
        const updateView = () => {
            window.innerWidth < 960 ?
                setIsMobile(true)
            :
                setIsMobile(false)
        }

        //Add and remove event listeners for page loading and resizing. These are the crucial moments in screen size.
        useEffect(() => {
            window.addEventListener("resize", updateView)
            window.addEventListener("load"  , updateView)
            return () => {
                window.removeEventListener("resize", updateView)
                window.removeEventListener("load", updateView)
            };
        });

        useEffect(() => { //Perform resize,if needed
            updateView();
        }, [location])


        return isMobile
    }

    export default useIsMobile
