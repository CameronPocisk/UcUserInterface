<script>
    import { getContext } from 'svelte'; // For gettting my instance (every component)
    const pen = getContext('penContext');
    import { ICONS } from './Constants'

    // this.backMode = "eraser"; // "eraser", "highlighter", "eyedropper"
    function clickDial(){
        pen.incrementDial();
        const element = document.getElementById("selectionIndicator");
        if(element == null) {return;}
        // Update the arrow SVG to point to the correct Icon
        switch(pen.backMode){
            case "eraser":
                console.log("eraser")
                element.style.top = "0";
                break;
            case "highlighter":
                console.log("highlighter")
                element.style.top = "23%";
                break;
            case "eyedropper":
                console.log("eyedropper")
                element.style.top = "-23%";
                break;
        }
    }

</script>
<button id="topButton1" class="SelectorDial" title="Selector Dial"
    on:click={() => clickDial()}>

    <!-- Need to add an indicator Triangle 
    It is going to be an SVG probable that has a bottom margin 
    based on the back-mode -->
    <img src={ICONS.rightCaret } id="selectionIndicator"/>

</button>
<style>
.SelectorDial{
    height: 100%;
    width: 30px;
    background-color: #F44A02;
    border-radius: 10px 0 0 10px;
    
    /* Make it not look like a button lol */
    border-top: none;
    /* border-left: none; */
    border-left: 2px solid #3A3D40;
    border-bottom: none;
    /* I do want a right border though */
    border-right: 1px solid #3A3D40;
    outline: none;
}

.SelectorDial img{
    filter: invert(90%);
    position: relative;
    width: 80%;
    transition: top 0.2s ease; 
}
</style>