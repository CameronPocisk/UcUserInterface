<script>
  // Steup stuff from the component file i made
  import LineOnGraphPaper from './lib/LineOnGraphPaper.svelte';
  import ScrollingGraphPaper from './lib/ScrollingGraphPaper.svelte'
  import Pen, {PenClass} from './lib/Pen.svelte'; 
  import { setContext } from 'svelte'; // For allowing all children to directly use the object


  // Singleton instance.
  const pen = new PenClass();
  // Share the reference using a unique string key
  setContext('penContext', pen);

  // Need this to make sure all the canvas stuff works
  let lineOnGraphPaper;

</script>

<main>
  <div class="app">
      <!-- Website Background (Combine this with the canvas-area thing? )-->
      <ScrollingGraphPaper/>

      <!-- The pen object -->
      <Pen/>
      
      <!-- The line that the pen draws on the paper (should this be in pen?) -->
      <LineOnGraphPaper/>
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
  /* width: 100vw;
  height: 100vh; */
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; /* Shrink this if I want a header */
  overflow: hidden;
}

</style>