<script>
</script>
<div class="Pen">

    <PenContainer>

        <!-- The pen has the textured back (visual) -->
        <BackOfPen/>
        <!-- Next the pen has the selction Dial (Interactable / mode changing) -->
        <SelectorDial/>

        <!-- shape of pen-->
        <div class="penBody">

            <!-- VISUAL, the icons next to the dial. -->
            <SelectorDialIcons/>
            <!-- COMPONENT Then it shows the status LED -->
            <StatusLed/>

            <!-- Then We have the interactve Display (1 big Component) -->
            <ControlPanel/>
        
        </div>

        <!-- Finally, the tip of the pen (Visual) -->
        <PenTip/>
    </PenContainer>
</div>
<style>
</style>