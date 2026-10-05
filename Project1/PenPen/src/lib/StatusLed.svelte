<script>
</script>
<div class="StatusLed">
    <div class="LedHolder">
        <div class="LED"></div>
    </div>
</div>
<style>
.LED{
    background-color: #FAF9F6;
    border-radius: 50%;
    width: 5px;
    height: 5px; /* Should represent the Diameter of the LED */

    /* Some Css I found online to create a glow effect */
    box-shadow: 
    0 0 5px #CCAACC,       /* Core bright glow */
    0 0 15px #CCAACC,      /* Mid-range dispersion */
    0 0 30px #CCAACC,      /* Wide atmospheric ambient light */
    inset 0 0 10px #CCAACC;/* Optional: Inner glow */
}
.LedHolder {
    width: 15px; /* Should represent the Diameter of the LED */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>