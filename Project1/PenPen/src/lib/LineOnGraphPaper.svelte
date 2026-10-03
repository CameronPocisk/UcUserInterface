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
        
        // Copy the main drawing over to a temp one (for copying)
        tempCtx.clearRect(0, 0, canvas.width, canvas.height);
        tempCtx.drawImage(canvas, 0, 0);

        // Clear the main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the main canvas scrolling up and the copy from below wrapping up
        ctx.drawImage(tempCanvas, 0, -scrollIncrement);
        ctx.drawImage(tempCanvas, 0, canvas.height - scrollIncrement);
    }

    
    function moveCanvasUpOnTimer(){
        // Making a temp canvas here so I can copy the main canvas
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
        // console.log('Drawing at', x, y, 'size', size, 'color', color, '— canvas is', canvas.width, 'x', canvas.height);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2); // Draws a circle at the point
        ctx.fill();
    }

    const backSize = 150;
    const backWidth = 10;
    /**
   * @param {number} x
   * @param {number} y
   */
    CanvasFunctions.erase = (x, y) => {
        if (!ctx) return;
        ctx.clearRect(
            x - backWidth / 2,
            y - backSize / 2,
            backWidth,
            backSize
        );
    }

    CanvasFunctions.highlight = (x, y) => {
        if (!ctx) return;
        ctx.fillStyle = "#FBF71970"
        ctx.fillRect(
            x - backWidth / 2,
            y - backSize / 2,
            backWidth,
            backSize
        );
    }

    CanvasFunctions.getEyedropperColor = (x, y) => {
        if (!ctx) return;
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        return `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
    };

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