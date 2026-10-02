<!-- The scrolling Graph paper may have a line being drawn of the pens color -->
<script>
    import { getContext } from 'svelte'; // For gettting my instance (every component)
    const pen = getContext('penContext');
</script>
<!-- Okay so this is going to be a canvas.
 We are going to draw circles according to the pens info and attributes
 We are going to erase based on the cords and clear rect -->
<div class="LineOnGraphPaper">
</div>
<style>
</style>