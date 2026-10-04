<script context="module"> // Have to make this a module script so I can export it
    import chroma from 'chroma-js'; // This will be used for the color (RGB / HSL)
    import { THEME_COLORS, CONTROL_MODES, CONTROL_MODES_ARR, MACROS } from './Constants.js'
    import { CanvasFunctions } from './CanvasFunctions.js';

    export class PenClass{
        // Define our member variables
        constructor(){
            // Basic Drawing Information
            this.color = chroma(THEME_COLORS.chronOrange); // Start with no color (or maybe orange idk)
            this.brushSize = 10; // Brush Diameter in Pixels (?)
            this.backMode = "eraser"; // "eraser", "highlighter", "eyedropper"
            this.controlMode = CONTROL_MODES.brushSize; // "brushSize", "colorHsl", "colorRgb", "opacity(?)", "brushShape(?), "setMacros(?)"
            this.statusLedColor = chroma(0, 0, 0, 0); // Starts off ig
            this.scenePaused = false; // used for playback thing
            this.drawingOff = false; // For stop drawing macro

            // Control Panel Information
            this.topMacro = MACROS.delete;
            this.bottomMacro = MACROS.playback;

            // Switching to use indexes on the constants. 
            this.controlModeArr = [CONTROL_MODES.changeMacros, CONTROL_MODES.brushSize, CONTROL_MODES.colorHue, CONTROL_MODES.colorSaturation, CONTROL_MODES.colorLevel];
            this.macroArr = [ MACROS.delete, MACROS.playback, MACROS.redo, MACROS.undo, MACROS.toggleDrawing];
            this.controlModeIndex = 0
            this.topMacroIndex = 0;
            this.bottomMacroIndex = this.controlModeArr.length -1;

            // What should be on the left third of the display segment? Should it be an undo and redo thing
            // Should I be able to set the mode and it can be undo redo or like something else macro like idk.

            // Drawing Positions
            this.penTipX = 0 // How to find this??
            this.penTipY = 0 // How to find this??
            this.penBackX = 0 // How to find this??
            this.penBackY = 0 // How to find this??

            // Setup the timer to continously draw
            // this.findBackAndTipCoordinates();
            setTimeout(() => {
                this.findBackAndTipCoordinates();
                this.startDrawingTimer();
            }, 100);
        }

        signOfLife(){
            console.log(`Pen object hello this:${this}`);
        }

        // Button Functions
        useTopMacro(){
            this.useMacro(this.topMacroIndex);
        }
        useBottomMacro(){
            this.useMacro(this.bottomMacroIndex);
        }

        /** * @param {string} macro */ // idk what this is but it was the quick fix
        useMacro(macro){
            macro = this.macroArr[macro];
            console.log(`using macro: ${macro}`)
            switch (macro) {
            case MACROS.delete:
                this.clearDrawings();
                break;
            case MACROS.playback:
                this.changeScreenPlayback();
                break;
            case MACROS.redo:
                console.log("Redoing line")
                break;
            case MACROS.undo:
                console.log("Undoing line")
                break;
            case MACROS.toggleDrawing:
                this.toggleDrawing();
                break;
            default:
                console.warn("macro defaulted")
            }
        }
        /** * @param {any} isTopMacro */
        changeMacro(isTopMacro){

            if (isTopMacro)
                this.topMacroIndex = (this.topMacroIndex + 1) % this.macroArr.length;
            else
                this.bottomMacroIndex = (this.bottomMacroIndex + 1) % this.macroArr.length;
            return;
        }

        incrementControlMode(){
            this.controlModeIndex = (this.controlModeIndex + 1) % CONTROL_MODES_ARR.length;
            this.controlMode = CONTROL_MODES_ARR[this.controlModeIndex];
        }
        decrementControlMode() {
            this.controlModeIndex = (this.controlModeIndex - 1 + CONTROL_MODES_ARR.length) % CONTROL_MODES_ARR.length;
            this.controlMode = CONTROL_MODES_ARR[this.controlModeIndex];
        }

        incrementControlValue(){
            switch (this.controlMode) {
            case CONTROL_MODES.changeMacros:
                this.changeMacro(true); // Increment the top macro
                break;
            case CONTROL_MODES.brushSize:
                this.brushSize += 1;
                break;
            case CONTROL_MODES.colorHue:
                const currentHue = this.color.get('hsl.h');
                const newHue = (currentHue + 30) % 360;
                this.color = this.color.set('hsl.h', newHue);
                break;
            case CONTROL_MODES.colorSaturation:
                const currentSat = this.color.get('hsl.s');
                const newSat = Math.min(1, currentSat + 0.2);
                this.color = this.color.set('hsl.s', newSat);
                break;
            case CONTROL_MODES.colorLevel:
            const currentLevel = this.color.get('hsl.l');
            const newLevel = Math.min(1, currentLevel + 0.15);
                this.color = this.color.set('hsl.l', newLevel);
                break;
            default:
                this.controlMode = CONTROL_MODES.changeMacros;
            }
        }
        decrementControlValue(){
            switch (this.controlMode) {
            case CONTROL_MODES.changeMacros:
                this.changeMacro(false); // Increment the bottom macro
                break;
            case CONTROL_MODES.brushSize:
                this.brushSize = Math.max(1, this.brushSize - 1);
                break;
            case CONTROL_MODES.colorHue:
                const currentHue = this.color.get('hsl.h');
                // Using (val + 360) % 360 handles negative numbers safely in JS
                const newHue = (360 + currentHue - 30) % 360;
                this.color = this.color.set('hsl.h', newHue);
                break;
            case CONTROL_MODES.colorSaturation:
                const currentSat = this.color.get('hsl.s');
                // Math.max(0, ...) ensures it stops exactly at 0 and doesn't go negative
                const newSat = Math.max(0, currentSat - 0.2);
                this.color = this.color.set('hsl.s', newSat);
                break;
            case CONTROL_MODES.colorLevel:
                const currentLevel = this.color.get('hsl.l');
                // Subtracted 0.15 and capped at 0 so it doesn't break
                const newLevel = Math.max(0, currentLevel - 0.15);
                this.color = this.color.set('hsl.l', newLevel);
                break;
            default:
                this.controlMode = "changeMacros";
            }
        }
        // and Dial up/down
        incrementDial(){
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
                console.warn("back Dial defaulted")
            }
        }

        // Helper Functions
        findBackAndTipCoordinates(){
            const element = document.getElementById("penDiv");
            if(element == null) return; // Dont wanna crash or smth!
            const rect = element.getBoundingClientRect();

            this.penTipX = rect.right + this.brushSize/4;
            this.penTipY = rect.bottom - (rect.height/2)
            this.penBackX = rect.left
            this.penBackY = rect.bottom - (rect.height/2)
            // console.log(`new TipX: ${this.penTipX}, TipY:${this.penTipY}
            // new BackX: ${this.penBackX}, BackY:${this.penBackY}`)
        }

        drawTip(){
            if(this.drawingOff){ return; }
            // console.log(`${this.penTipX}, ${this.penTipY}`)
            CanvasFunctions.drawPoint(this.penTipX, this.penTipY, this.brushSize, this.color.hex());
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

                if (foundColor.alpha() === 0) break;

                this.color = foundColor;
                this.statusLedColor = foundColor;
                console.log(foundColor);
                break;
            default:
                console.warn("Dial mode defaulted")
            }
            
        }

        clearDrawings(){
            CanvasFunctions.clear();
        }

        changeScreenPlayback(){
            this.scenePaused = !this.scenePaused;
            CanvasFunctions.toggleGifMovement();
            console.log("Figure out how to pause the gif / change the drawing");    
        }

        toggleDrawing(){
            this.drawingOff = !this.drawingOff;
            console.log(`drawing is off: ${this.drawingOff}`)
        }

        startDrawingTimer() {
            const loop = () => {
                this.drawTip(); 
                this.drawBack();
                this.drawingFrameId = requestAnimationFrame(loop);
            };

            this.drawingFrameId = requestAnimationFrame(loop);
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
    height: 100px;
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