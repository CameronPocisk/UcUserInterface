<script context="module"> // Have to make this a module script so I can export it
    import chroma from 'chroma-js'; // This will be used for the color (RGB / HSL)
    import { THEME_COLORS } from './Constants.js'
    import { CanvasFunctions } from './CanvasFunctions.js';

    export class PenClass{
        // Define our member variables
        constructor(){
            // Basic Drawing Information
            this.color = chroma("#F44A02"); // Start with no color (or maybe orange idk)
            this.brushSize = 10; // Brush Diameter in Pixels (?)
            this.backMode = "highlighter"; // "eraser", "highlighter", "eyedropper"
            this.controlMode = "brushSize"; // "brushSize", "colorHsl", "colorRgb", "opacity(?)", "brushShape(?), "setMacros(?)"
            this.statusLedColor = chroma(0, 0, 0, 0); // Starts off ig

            // Control Panel Information
            this.controlModeText = this.backMode; // Should I Just make this the same as control mode?
            this.controlModePreview = 0; // null?
            this.topMacro = "undo";
            this.bottomMacro = "redo";

            // What should be on the left third of the display segment? Should it be an undo and redo thing
            // Should I be able to set the mode and it can be undo redo or like something else macro like idk.

            // Drawing Positions
            this.penTipX = 0 // How to find this??
            this.penTipY = 0 // How to find this??
            this.penBackX = 0 // How to find this??
            this.penBackY = 0 // How to find this??

            // Setup the timer to continously draw
            this.startDrawingTimer();
        }

        signOfLife(){
            console.log(`Pen object hello this:${this}`);
        }

        // Button Functions
        useTopMacro(){
            this.useMacro(this.topMacro);
        }
        useBottomMacro(){
            this.useMacro(this.bottomMacro);
        }

        /** * @param {string} macro */ // idk what this is but it was the quick fix
        useMacro(macro){
            console.log(`using macro: ${macro}`)
            macro = macro.toLocaleLowerCase();
            switch (macro) {
            case "undo":
                break;
            case "redo":
            break;
            default:
                console.warn("macro defaulted")
            }
        }

        incrementControlMode(){
            console.log(`incrementControlMode button`);
        }
        decrementControlMode(){
            console.log(`decrementControlMode button`);
        }
        incrementControlValue(){
            console.log(`incrementControlValue button`);
        }
        decrementControlValue(){
            console.log(`decrementControlValue button`);
        }
        // and Dial up/down
        incrementDial(){ // Should I call this backDial or smth? 
            console.log(`incrementDial button`);
            switch (this.backMode) {
            case "eyedropper":
                this.backMode = "eraser";
                break;
            case "eraser":
                this.backMode = "highlighter";
                break;
            case "highlighter":
                this.backMode = "eyedropper";
                break;
            default:
                console.warn("macro defaulted")
            }
        }

        // Helper Functions
        findBackAndTipCoordinates(){
            // console.log("Finding New coords after drag...");
            // How tf do I do this lol
            const element = document.getElementById("penDiv");
            if(element == null) return; // Dont wanna crash or smth!
            const rect = element.getBoundingClientRect();

            this.penTipX = rect.right + this.brushSize/4;
            this.penTipY = rect.bottom - (rect.height/2)
            this.penBackX = rect.left
            this.penBackY = rect.bottom - (rect.height/2)
            // console.log(`new TipX: ${this.penTipX}, TipY:${this.penTipY}
            // new BackX: ${this.penBackX}, BackY:${this.penBackY}`)

            // this.drawTip();
            // this.drawBack();
        }

        drawTip(){
            // drawPoint = (x, y, size, color)
            CanvasFunctions.drawPoint(this.penTipX, this.penTipY, this.brushSize, this.color.toString());
            // CanvasFunctions.drawPoint(this.penTipX, this.penTipY, this.brushSize, this.color.hex());
        }
        drawBack(){
            switch (this.backMode) {
            case "eraser":
                CanvasFunctions.erase(this.penBackX, this.penBackY);
                break;
            case "highlighter":
                CanvasFunctions.highlight(this.penBackX, this.penBackY);
            break;
            case "eyedropper":
                let foundColor = chroma(CanvasFunctions.getEyedropperColor(this.penBackX, this.penBackY));
                console.log(foundColor.toString())

                if (foundColor.alpha() === 0){
                    console.log("no color found")
                    break;
                }

                this.color = foundColor;
                this.statusLedColor = foundColor;
                console.log(foundColor);
                break;
            default:
                console.warn("macro defaulted")
            }
            
            // drawPoint = (x, y, size, color)
        }
        clearDrawings(){
            // drawPoint = (x, y, size, color)
            CanvasFunctions.clear();
        }

        // Need to constantly draw on the canvas. 
        startDrawingTimer(){
            setInterval(() => {this.drawTip(); this.drawBack();}, 1);
        }
    };
</script>

<!-- The regular svelte code stuff  -->
<script>
    import SelectorDial from './SelectorDial.svelte';
    import StatusLed from './StatusLed.svelte';
    import ControlPanel from './ControlPanel.svelte';
    import PenTip from './PenTip.svelte';
    import SelectorDialIcons from './SelectorDialIcons.svelte';
    import { getContext } from 'svelte'; // For gettting my instance (every component)
    import { draggable } from '@neodrag/svelte'; // Drag the pen
    import drawPoint from "./LineOnGraphPaper.svelte"
    import erase from "./LineOnGraphPaper.svelte"
    import clear from "./LineOnGraphPaper.svelte"

    const pen = getContext('penContext');
</script>

<div class="Pen" id="penDiv" use:draggable={{ onDrag: () => pen.findBackAndTipCoordinates() }}>
    <!-- The pen has the textured back (visual) -->
    <div class="BackOfPen"></div>
    <!-- Next the pen has the selction Dial (Interactable / mode changing) -->
    <SelectorDial/>

    <!-- shape of pen-->
    <div class="penBody">

        <!-- VISUAL, the icons next to the dial. -->
        <SelectorDialIcons/>
        <!-- COMPONENT Then it shows the status LED -->
         <div style="width: 30px"></div>
        <StatusLed/>

        <!-- Then We have the interactve Display (1 big Component) -->
        <ControlPanel/>
        <div style="width: 50px"></div>
    
    </div>

    <!-- Finally, the tip of the pen (Visual) -->
    <PenTip/>
</div>
<style>
.Pen{
    display: flex;
    height: 150px;
    top: 40%;
    left: 10%;
    position: absolute;
    /* transform: scale(2.5); */
}
.BackOfPen{
    height: 100%;
    width: 80px;
    background-color: #F44A02;
    border-radius: 10px;
}
.penBody{
    display: flex; 
    align-items: stretch;
    width: 700px;
    height: 100%;
    background-color: #8A8D8F;
    border-radius: 0 10px 10px 0;
}
</style>