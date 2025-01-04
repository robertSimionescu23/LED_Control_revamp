import { useRef } from "react"
import { useEffect } from "react";
import { useState } from "react";
import styles from "./ColorPicker.module.css"
import RGBToHSL from "../JsFunc/RGBtoHSL";

function ColorPicker(){

    //Refs -----------------------------------------------------------------------------------------
    const SLPicker    = useRef(null); //The color square, affecting saturation and lightness.
    const SLSelector  = useRef(null); //The circular selector.

    const huePicker   = useRef(null); //The color bar, affecting hue.
    const hueBar      = useRef(null); //The color sector on the bar.

    const testingColorCube = useRef(null)
    //Refs -----------------------------------------------------------------------------------------

    //Stateful variables ---------------------------------------------------------------------------
    const [cubeColor , setCubeColor     ] = useState("hsl(0, 0.00%, 100.00%)") //The selected color
    const [hue       , setHue           ] = useState("0")
    const [saturation, setSaturation    ] = useState("50")
    const [lightness , setLightness     ] = useState("100")
    //Stateful variables ---------------------------------------------------------------------------


    useEffect(() => {

        // Create linear gradient, for the color picker. We will sample the pixel to determine the color (Most reliable way so far).
        //The coordonates where the first gradinet starts and ends.
        //Start coordinates
        let x0 = 0;
        let y0 = 0;

        //End coordinates
        let x1 = 400;
        let y1 = 0;

        //Normal gradient (180deg), from white to color.
        //The context is used for filling the canvas with the gradient, creating said gradient etc.
        let ctx  = SLPicker.current.getContext("2d");
        let grad = ctx.createLinearGradient( x0, y0, x1, y1);
        grad.addColorStop(0, "white");
        grad.addColorStop(1, `hsl(${hue}, 100%, 50%`);
        // Fill rectangle with gradient
        ctx.fillStyle = grad;
        ctx.fillRect(0,0, 400,400);


        //Vertical Gradient, from transparent to black
        //Start coordinates
        x0 = 0;
        y0 = 0;
        //End coordinates
        x1 = 0;
        y1 = 400;

        grad = ctx.createLinearGradient( x0, y0, x1, y1);
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(1, "black");

        ctx.fillStyle = grad;
        ctx.fillRect(0,0, 400,400);

        //For the hue line
        x0 = 0;
        y0 = 0;

        y1 = 0;
        x1 = 400;

        //Gradient for the color bar, hue rainbow
        ctx  = huePicker.current.getContext("2d");
        grad = ctx.createLinearGradient( x0, y0, x1, y1);
        grad.addColorStop(0 ,  "rgb(255, 0  , 0  )");
        grad.addColorStop(0.1, "rgb(255, 154, 0  )");
        grad.addColorStop(0.2, "rgb(208, 222, 33 )");
        grad.addColorStop(0.3, "rgb(79 , 220, 74 )");
        grad.addColorStop(0.4, "rgb(63 , 218, 216)");
        grad.addColorStop(0.5, "rgb(47 , 201, 226)");
        grad.addColorStop(0.6, "rgb(28 , 127, 238)");
        grad.addColorStop(0.7, "rgb(95 , 21 , 242)");
        grad.addColorStop(0.8, "rgb(186, 12 , 248)");
        grad.addColorStop(0.9, "rgb(251, 7  , 217)");
        grad.addColorStop(1  , "rgb(255, 0  , 0  )");

        ctx.fillStyle = grad;
        ctx.fillRect(0,0, 400,50);

    //When the hue changes the color bar needs to rerender. Also ensures the gradient applies when the element is rendered.
    }, [SLPicker, huePicker, hue]);

    //When the parameters change, the color of the selected cube does too.
    useEffect(() =>{
        setCubeColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }, [hue, saturation, lightness])

    //This function changes the circle on the saturation/lightness square.
    function changeSLSelectorLoc(e){
        let ctx = SLPicker.current.getContext('2d');
        //Get the color where the selector has been placed.
        let pixel = ctx.getImageData(e.clientX - SLPicker.current.getBoundingClientRect().left, e.clientY - SLPicker.current.getBoundingClientRect().top, 1, 1).data;
        //Convert to HSL. Lightness and saturation are concered in this section.
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        setSaturation(hslParams[1]);
        setLightness (hslParams[2]);

        SLSelector.current.style.top  = `${e.clientY - SLPicker.current.getBoundingClientRect().top - SLSelector.current.offsetHeight / 2}px`
        SLSelector.current.style.left = `${e.clientX - SLPicker.current.getBoundingClientRect().left -  SLSelector.current.offsetWidth / 2}px`
    }

    function changeHueSelectorLoc(e){
        //Get the data of the pixel selected, like the last function.
        let ctx = huePicker.current.getContext("2d");
        let pixel = ctx.getImageData(e.clientX - huePicker.current.getBoundingClientRect().left, 0, 1, 1).data;
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        setHue(hslParams[0]);

        hueBar.current.style.left = `${e.clientX - huePicker.current.getBoundingClientRect().left -  hueBar.current.offsetWidth / 2}px`
    }

    return(
        <>
            <section className={styles.colorContainer}>
                <div className = {styles.canvasContainers}>
                    <div className={styles.SLPickerContainer}>
                        <canvas ref = {SLPicker} className={styles.SLPicker} width= "400px" height="400px" onClick={changeSLSelectorLoc}></canvas>
                        <div ref = {SLSelector} className={styles.SLSelector}></div>
                    </div>
                    <div className={styles.separator}></div>
                    <div className = {styles.huePickerContainer}>
                        <canvas ref = {huePicker} className={styles.huePick} width = "400px" height = "50px" onClick = {changeHueSelectorLoc}></canvas>
                        <div ref ={hueBar} className={styles.hueSelector}></div>
                    </div>
                </div>
                <div className={styles.dataAndControl}>
                    <div ref = {testingColorCube} style = {{backgroundColor : `${cubeColor}`}} className = {styles.testdiv3}></div>
                </div>
            </section>
        </>
    )
}

export default ColorPicker
