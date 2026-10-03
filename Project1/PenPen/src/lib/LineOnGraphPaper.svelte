<!-- The scrolling Graph paper may have a line being drawn of the pens color -->
<script>
    import { onMount, getContext } from 'svelte';
    import { CanvasFunctions } from './CanvasFunctions.js';
    
    const pen = getContext('penContext');

    /** * @type {HTMLCanvasement} */
    let canvas;
    /** * @type {CanvasRenderingContext2D | null} */
    let ctx;

    onMount(() => {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        if(!ctx) return;
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 200, 200)

        moveCanvasUpOnTimer();
        return () => window.removeEventListener('resize', resizeCanvas);
    });

    function resizeCanvas() {
        // Match the canvas's real pixel grid to its displayed size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        console.log(`canvas heihgt: ${canvas.width}`);
    }
    
    const scrollIncrement = 1;
    /**
   * @param {CanvasImageSource} tempCanvas
   * @param {CanvasRenderingContext2D | null} tempCtx
   */
    function moveCanvasUp(tempCanvas, tempCtx){
        if(!ctx || !tempCtx || !tempCanvas) return;
        console.log('moving canvas')
        
        tempCtx.clearRect(0, 0, canvas.width, canvas.height);
        tempCtx.drawImage(canvas, 0, 0);

        // 4. Clear the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 5. Draw the wrapped positions
        ctx.drawImage(tempCanvas, 0, -scrollIncrement);
        ctx.drawImage(tempCanvas, 0, canvas.height - scrollIncrement);
    }

    
    function moveCanvasUpOnTimer(){
        // Making a temp canvas here so I can copy contextes (idk but it gets a canvas as ap )
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        // Just gonna have this move up a bit at a time
        // (27 is the amount of time that makes the 1 tick scroll match)
        setInterval(() => moveCanvasUp(tempCanvas, tempCtx), 27);
    }

    // Called whenever the pen reports a new position (see note below on wiring this up)
    /**
   * @param {number} x
   * @param {number} y
   * @param {number} size
   * @param {string | CanvasGradient | CanvasPattern} color
   */
    CanvasFunctions.drawPoint = (x, y, size, color) => {
        if (!ctx) return;
        console.log('Drawing at', x, y, 'size', size, 'color', color, '— canvas is', canvas.width, 'x', canvas.height);
        console.log("In the real draw point")
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2); // Draws a circle at the point
        ctx.fill();
    }

    /**
   * @param {number} x
   * @param {number} y
   */
    CanvasFunctions.erase = (x, y) => {
        if (!ctx) return;
        const deleteSize = 150;
        const deleteWidth = 5;
        ctx.clearRect(
            x - deleteWidth / 2,
            y - deleteSize / 2,
            deleteWidth,
            deleteSize
        );
    }

    CanvasFunctions.clear = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


</script>
<!-- Okay so this is going to be a canvas.
 We are going to draw circles according to the pens info and attributes
 We are going to erase based on the cords and clear rect -->
<div class="LineOnGraphPaper">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
.LineOnGraphPaper {
    position: fixed;
    inset: 0;       /* top/left/right/bottom: 0 — pins it to the full viewport */
    z-index: -1;     /* above ScrollingGraphPaper's -1, below Pen's default stacking */
    pointer-events: none; /* let clicks/drags pass through to the pen underneath, if needed */
}

.LineOnGraphPaper canvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>