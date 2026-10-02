<script context="module"> // Have to make this a module script so I can export it
    export class PenClass{

    };
</script>

<!-- The regular svelte code stuff  -->
<script>
import SelectorDial from './SelectorDial.svelte';
import StatusLed from './StatusLed.svelte';
import ControlPanel from './ControlPanel.svelte';
import PenTip from './PenTip.svelte';
import SelectorDialIcons from './SelectorDialIcons.svelte';

</script>

<div class="Pen">
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
    margin-left: 150px; /* Move it a little right from the screen edge*/
    transform-origin: top left;
    transform: scale(2.5);
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