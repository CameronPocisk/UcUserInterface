<script>
    import PenTipDiagram from './assets/PenTipDiagram.png';
</script>
<div class="PenTip">
    <!-- <div class="Nib"></div> -->
    <img src={PenTipDiagram}/>
<!-- </div> -->
</div>
<style>
/* I had no idea how to do this so I made it with chat GPT  */

.PenTip {
    height: 100%;
}
.PenTip img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* keeps the triangle's proportions, no stretching/distortion */
    border-radius: 5px;
}
</style>