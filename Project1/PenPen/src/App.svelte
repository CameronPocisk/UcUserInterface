<script>
  // Steup stuff from the component file i made
  import LineOnGraphPaper from './lib/LineOnGraphPaper.svelte';
  import ScrollingGraphPaper from './lib/ScrollingGraphPaper.svelte'
  import Pen, {PenClass} from './lib/Pen.svelte'; 

  const pen = new PenClass();

</script>

<main>
  <div class="app">
    <!-- <h1>PenPen</h1> -->
      <!-- Website Background (Combine this with the canvas-area thing? )-->
      <ScrollingGraphPaper/>
        <!-- The pen object -->
        <div style="height: 750px;"></div>
        <Pen/>
        
        <!-- The line that the pen draws on the paper (should this be in pen?) -->
        <LineOnGraphPaper/>

      <!-- </ScrollingGraphPaper> -->

    <!-- My Div (For setting the pen color remotely) -->
    <!-- <ColorPicker on:select={handleSelect} /> -->
  </div>
</main>

<style>
:global(html, body) {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; /* Shrink this if I want a header */
  flex: 1;        /* fill all remaining height under the h1 */
  min-height: 0;  /* required so a flex child can scroll instead of overflowing */
  overflow: hidden;
}

</style>