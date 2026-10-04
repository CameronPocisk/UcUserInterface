<!-- Background of website will be scrolling (dark) graph paper -->
<script>
    import white from './assets/WhiteLargeGrid.gif';
    import black from './assets/BlackLargeGrid.gif';
    import grey from './assets/GreyLargeGrid.gif';

    import { onMount, getContext } from 'svelte';
    // For pausing the background
    import Freezeframe from 'freezeframe';
    import { CanvasFunctions } from './CanvasFunctions.js';

    // Setup the vars
    let ff;

    onMount(() => {
        const backgroundElement = document.getElementById('backgroundGif')
        if(backgroundElement == null) return;
        ff = new Freezeframe(backgroundElement, {
            trigger: false,
            overlay: false,
            responsive: true
        });
        ff?.start();

        CanvasFunctions.toggleGifMovement = () => {
            ff?.toggle();
        }

        // Make sure this damn thing starts lol
        backgroundElement.addEventListener('load', () => {ff?.start();}, { once: true });
        setTimeout(() => ff.start(), 500);
    });
    
</script>
<div class="ScrollingGraphPaper">
    <!-- Note that I may have to do something to the gifs file formats for any resembelence of performance.  -->
    <img src={grey} id="backgroundGif" alt="This should be some scrolling graph paper. Not this text. Why are you even seeing this! Something went wrong ig."/>
</div>
<style>
.ScrollingGraphPaper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: fixed;
    inset: 0;
    z-index: -2; /* I have this as -2 so I can potentially put the canvas at -1 (between) */
}

.ScrollingGraphPaper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>