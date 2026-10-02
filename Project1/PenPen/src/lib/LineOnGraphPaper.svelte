<!-- The scrolling Graph paper may have a line being drawn of the pens color -->
<script>
    import { onMount, getContext } from 'svelte';
    import { CanvasFunctions } from './CanvasFunctions.js';
    
    const pen = getContext('penContext');

    /** * @type {HTMLCanvasElement} */
    let canvasEl;
    /** * @type {CanvasRenderingContext2D | null} */
    let ctx;

    onMount(() => {
        ctx = canvasEl.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 200, 200)

        console.log(` width: ${document.querySelector('canvas').width}
        height ${document.querySelector('canvas').height}`);
        return () => window.removeEventListener('resize', resizeCanvas);
    });

    function resizeCanvas() {
        // Match the canvas's real pixel grid to its displayed size
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;
        console.log(`canvas heihgt: ${canvasEl.width}`);
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
        console.log('Drawing at', x, y, 'size', size, 'color', color, '— canvas is', canvasEl.width, 'x', canvasEl.height);
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
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }


</script>
<!-- Okay so this is going to be a canvas.
 We are going to draw circles according to the pens info and attributes
 We are going to erase based on the cords and clear rect -->
<div class="LineOnGraphPaper">
    <canvas bind:this={canvasEl}></canvas>
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