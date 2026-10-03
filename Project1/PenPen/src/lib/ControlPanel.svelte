<script>
    import { getContext } from 'svelte'; // For gettting my instance (every component)
    const pen = getContext('penContext');
    import { ICONS, MACROS } from './Constants.js';
    
    let displayText = pen.controlMode;
    var topMacroIcon = ICONS.undo;
    var bottomMacroIcon = ICONS.redo;
    function refreshDisplay() {
        displayText = pen.controlMode; // reassignment triggers re-render
        switch(pen.topMacro){
            case MACROS.undo:
                topMacroIcon = ICONS.undo
                break;
            case MACROS.redo:
                topMacroIcon = ICONS.redo
                break;
            case MACROS.playback:
                topMacroIcon = ICONS.playback
                break;
            case MACROS.delete:
                topMacroIcon = ICONS.delete
                break;
        }
        switch(pen.bottomMacro){
            case MACROS.undo:
                bottomMacroIcon = ICONS.undo
                break;
            case MACROS.redo:
                bottomMacroIcon = ICONS.redo
                break;
            case MACROS.playback:
                bottomMacroIcon = ICONS.playback
                break;
            case MACROS.delete:
                bottomMacroIcon = ICONS.delete
                break;
        }
    }

</script>
<div class="ControlPanel">
<!-- Top 3 buttons -->
    <div class="ButtonRow">
        <!-- <"style="border-radius: TL TR BR BL;"/> -->
        <button id="topButton1" class="button Small" style="border-radius: 7px 0 0 7px;" title="Top Macro"
        on:click={() => {pen.useTopMacro(); refreshDisplay();}}><img src={ICONS.upCaret}/></button>
        <button id="topButton2" class="button Large" title="Top Selector Button"
        on:click={() => {pen.incrementControlMode(); refreshDisplay(); }}><img src={ICONS.upCaret}/></button>
        <button id="topButton3" class="button Small" style="border-radius: 0 7px 7px 0;" title="Top Attribute Button" 
        on:click={() => {pen.incrementControlValue(); refreshDisplay(); }}><img src={ICONS.upCaret}/></button>
    </div>
<!-- The screen (black with text?) -->
    <div class="Display">
        <!-- The screen will be divided into 3 columns -->
         <!-- This div will show the current Macros on the top and bottom -->
         <div class="DisplayMacro">
            <div id="topMacroIcon"> <img src={topMacroIcon}/> </div>
            <div id="bottomMacroIcon"> <img src={bottomMacroIcon}/> </div>
         </div>

         <!-- This will show the text (What the right buttons control) -->
         <div class="DisplayText"> {displayText} </div>

         <!-- This should show the current 'brush' -->
         <div class="DisplayBrush">
            <!-- Can I make this like a mini mini canvas? -->
             test
         </div>
    </div>
<!-- Bottom 3 Buttons -->
    <div class="ButtonRow">
        <button id="bottomButton1" class="button Small" style="border-radius: 7px 0 0 7px;" title="Bottom Macro"
        on:click={() => {pen.useBottomMacro(); refreshDisplay(); }}><img src={ICONS.downCaret}/></button>
        <button id="bottomButton2" class="button Large" title="Bottom Selector Button"
        on:click={() => {pen.decrementControlMode(); refreshDisplay(); }}><img src={ICONS.downCaret}/></button>
        <button id="bottomButton3" class="button Small" style="border-radius: 0 7px 7px 0;" title="Bottom Attribute Button"
        on:click={() => {pen.decrementControlValue(); refreshDisplay(); }}><img src={ICONS.downCaret}/></button>
    </div>
</div>
<style>
.ControlPanel{
    height: 100%;
    width: 222px;
    margin-left: auto
}
.ButtonRow {
    display: flex;
    /* flex-wrap: wrap; */
    width: 100%;   /* or a fixed px value, matching whatever contains it */
    height: 20%;  /* same gotcha as before — parent needs a real height for this to work */
}
.button {
    height: 100%;
    background-color: #4A4D50;
    color: #FAF9F6;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Large {
    width: 50%;
}
.Medium {
    width: 33.33%;
}
.Small {
    width: 25%;
}
.Display{
    width: 100%;
    height: 60%;
    display: flex;
    background-color: #100C08;
    border-radius: 5px;
    color: #FAF9F6;
}
.button img{
    height: 30%;
    transform: scale(2); /* Needed to scale here or else it would look too small */
    /* Invert the color so we have grey carets */
    filter: invert(70%);
}
/* Should show the top macro and bottom macro */
.DisplayMacro{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10%;
}
.DisplayMacro img{
    height: 75%;
    filter: invert(90%);
}
.DisplayText {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Press Start 2P', monospace;
    font-size: 100%;
    color: #FAF9F6;
}
.DisplayBrush{
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>