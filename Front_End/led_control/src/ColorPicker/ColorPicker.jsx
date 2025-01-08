import { useRef } from "react"
import { useEffect } from "react";
import { useState } from "react";
import styles from "./ColorPicker.module.css"
import RGBToHSL from "../JsFunc/RGBtoHSL";
import hslToRgb from "../JsFunc/HSLtoRGB";

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

    //Consts
    //To change color picker elements sizes
    const SLPickerWidth  = 400;
    const SLPickerHeigth = 400;

    const HueBarWidth  = 400;
    const HueBarHeigth = 50;

    useEffect(() => {

        // Create linear gradient, for the color picker. We will sample the pixel to determine the color (Most reliable way so far).
        //The coordonates where the first gradinet starts and ends.
        //Start coordinates
        let x0 = 0;
        let y0 = 0;

        //End coordinates
        let x1 = SLPickerWidth;
        let y1 = 0;

        //Normal gradient (180deg), from white to color.
        //The context is used for filling the canvas with the gradient, creating said gradient.
        let ctx  = SLPicker.current.getContext("2d");
        let grad = ctx.createLinearGradient( x0, y0, x1, y1);
        grad.addColorStop(0, "white");
        grad.addColorStop(1, `hsl(${hue}, 100%, 50%`);
        // Fill rectangle with gradient
        ctx.fillStyle = grad;
        ctx.fillRect(0,0, SLPickerWidth, SLPickerHeigth);


        //Vertical Gradient, from transparent to black
        //Start coordinates
        x0 = 0;
        y0 = 0;
        //End coordinates
        x1 = 0;
        y1 =  SLPickerHeigth;

        grad = ctx.createLinearGradient( x0, y0, x1, y1);
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(1, "black");

        ctx.fillStyle = grad;
        ctx.fillRect(0,0, SLPickerWidth, SLPickerHeigth);

        //For the hue line
        x0 = 0;
        y0 = 0;

        x1 = HueBarWidth;
        y1 = 0;

        //Gradient for the color bar, hue rainbow.
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

        //Fill the canvas with the gradient.
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, HueBarWidth, HueBarHeigth);

    //When the hue changes, the color bar needs to rerender. Also ensures the gradient applies when the element is rendered.
    }, [SLPicker, huePicker, hue]);

    //When the parameters change, the color of the selected cube does too. It ensures that the hue bar and the saturation/lightness square stay in sync.
    useEffect(() =>{
        setCubeColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
        console.log(saturation)
        let RGB = hslToRgb (hue, saturation, lightness);
        // Send request to PICO in RGB.Leds can only process RGB, but HSL is more convenient for the user.
        fetch("",{ //Put Pico ip here
            method: "POST",
            body :JSON.stringify({
                color: RGB
            })
        } )
    }, [hue, saturation, lightness])

    //This function changes the location of the circular selector on the saturation/lightness square. It also sets the color to the new location.
    function changeSLSelectorLoc(e){
        //Get context of canvas. Used for interacting with individual pixels.
        let ctx = SLPicker.current.getContext('2d');
        //Get the color where the selector has been placed.
        let pixel = ctx.getImageData(e.clientX - SLPicker.current.getBoundingClientRect().left, e.clientY - SLPicker.current.getBoundingClientRect().top, 1, 1).data;
        //Convert to HSL. Lightness and saturation are concered in this section.
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        setSaturation(hslParams[1]);
        setLightness (hslParams[2]);

        //Move selector to cursor.
                                       //client cursor - the bounding side of the square             - the selector's relevant size(height for y, width for x)
        SLSelector.current.style.top  = `${e.clientY - SLPicker.current.getBoundingClientRect().top  - SLSelector.current.offsetHeight / 2}px`
        SLSelector.current.style.left = `${e.clientX - SLPicker.current.getBoundingClientRect().left -  SLSelector.current.offsetWidth / 2}px`
    }

    //Move the selector bar div on the hue Bar.
    function changeHueSelectorLoc(e){
        //Get the data of the pixel selected, like the last function.
        let ctx = huePicker.current.getContext("2d");
        let pixel = ctx.getImageData(e.clientX - huePicker.current.getBoundingClientRect().left, 0, 1, 1).data;
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        setHue(hslParams[0]);

        //Note: The bar only moves horizontally, thus, only one line for movement.
        hueBar.current.style.left = `${e.clientX - huePicker.current.getBoundingClientRect().left -  hueBar.current.offsetWidth / 2}px`
    }

    //Ensures that click on top of the Hue Bar translate to selection on the bar under it.
    function clickThroughHueSelector(e){
        //Movement
        let SelectorCenterXCoordinate = e.clientX - huePicker.current.getBoundingClientRect().left;

        let horizontalPositionOfSelectorDiv = e.clientX - SLPicker.current.getBoundingClientRect().left -  SLSelector.current.offsetWidth / 2;

        if(SelectorCenterXCoordinate <= huePicker.current.width & SelectorCenterXCoordinate >= 0)
            hueBar.current.style.left = `${horizontalPositionOfSelectorDiv}px`
        else
            return;

        let ctx = huePicker.current.getContext("2d");
        let pixel = ctx.getImageData(SelectorCenterXCoordinate, 0, 1, 1).data;
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        console.log(hslParams[0])
        setHue(hslParams[0]);

    }

    //Ensures that click on top of the circular selector translate to selection on the square under it.
    function clickThroughSLSelector(e){
        //Movement
        let horizontalPositionOfSelectorDiv = e.clientX - SLPicker.current.getBoundingClientRect().left -  SLSelector.current.offsetWidth / 2;
        let verticalPositionOfSelectorDiv   = e.clientY - SLPicker.current.getBoundingClientRect().top - SLSelector.current.offsetHeight / 2 ;

        let SelectorCenterXCoordinate = e.clientX - SLPicker.current.getBoundingClientRect().left;
        let SelectorCenterYCoordinate = e.clientY - SLPicker.current.getBoundingClientRect().top;

        //Only move if the movement would not go out of bounds.
        if(SelectorCenterXCoordinate <= SLPicker.current.width & SelectorCenterXCoordinate >= 0)
            SLSelector.current.style.left = `${horizontalPositionOfSelectorDiv}px`
        else
            return;

        if(SelectorCenterYCoordinate <= SLPicker.current.height & SelectorCenterYCoordinate >= 0)
            SLSelector.current.style.top  = `${verticalPositionOfSelectorDiv}px`
        else
            return

        //Get color at center of selector

        let ctx = SLPicker.current.getContext("2d");
        let pixel = ctx.getImageData(SelectorCenterXCoordinate, SelectorCenterYCoordinate, 1, 1).data;
        let hslParams = RGBToHSL(pixel[0], pixel[1], pixel[2]);

        setSaturation(hslParams[1]);
        setLightness (hslParams[2]);
    }


    return(
        <>
            <section className={styles.colorContainer}>
                <div className = {styles.canvasContainers}>
                    <div className={styles.SLPickerContainer}>
                        <canvas ref = {SLPicker} className={styles.SLPicker} width= {`${SLPickerWidth}px`} height={`${SLPickerHeigth}px`} onClick={changeSLSelectorLoc}></canvas>
                        <div onClick = {clickThroughSLSelector} ref = {SLSelector} className={styles.SLSelector}></div>
                    </div>
                    <div className={styles.separator}></div>
                    <div className = {styles.huePickerContainer}>
                        <canvas ref = {huePicker} className={styles.huePick} width = {`${HueBarWidth}px`} height = {`${HueBarHeigth}px`} onClick = {changeHueSelectorLoc}></canvas>
                        <div onClick = {clickThroughHueSelector} ref ={hueBar} className={styles.hueSelector}></div>
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
