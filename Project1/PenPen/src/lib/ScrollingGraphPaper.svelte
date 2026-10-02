<!-- Background of website will be scrolling (dark) graph paper -->
<script>
    import white from './assets/WhiteLargeGrid.gif';
    import black from './assets/BlackLargeGrid.gif';
    import grey from './assets/GreyLargeGrid.gif';
</script>
<div class="ScrollingGraphPaper">
    <!-- Note that I may have to do something to the gifs file formats for any resembelence of performance.  -->
    <img src={grey} alt="This should be some scrolling graph paper. Not this text. Why are you even seeing this! Something went wrong ig."/>
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