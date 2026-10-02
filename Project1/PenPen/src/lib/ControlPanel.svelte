<script>
</script>
<div class="ControlPanel">
<!-- Top 3 buttons -->
    <div class="ButtonRow">
        <!-- <"style="border-radius: TL TR BR BL;"/> -->
        <button id="topButton1" style="border-radius: 7px 0 0 0;"/>
        <button id="topButton2"/>
        <button id="topButton3"style="border-radius: 0 7px 0 0;"/>
    </div>
<!-- The screen (black with text?) -->
    <div class="Display"></div>
<!-- Bottom 3 Buttons -->
    <div class="ButtonRow">
        <button id="bottomButton1" style="border-radius: 0 0 0 7px;"/>
        <button id="bottomButton2"/>
        <button id="bottomButton3" style="border-radius: 0 0 7px 0;"/>
    </div>
</div>
<style>
.ControlPanel{
    height: 100%;
    width: 200px;
    margin-left: auto
}
.ButtonRow {
    display: flex;
    /* flex-wrap: wrap; */
    width: 100%;   /* or a fixed px value, matching whatever contains it */
    height: 20%;  /* same gotcha as before — parent needs a real height for this to work */
}
button{
    width: 33.33%;
    height: 100%; 
    background-color: #4A4D50;
    color: #FAF9F6; /*Basically white text for buttons if we need */
}
.Display{
    width: 100%;
    height: 60%;
    background-color: #100C08;
    color: #FAF9F6;
}
</style>