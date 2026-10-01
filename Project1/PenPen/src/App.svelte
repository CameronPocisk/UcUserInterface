<script>
  // Steup stuff from the component file i made
  import ColorPicker from './lib/ColorPicker.svelte';
  import LedDisplay from './lib/LedDisplay.svelte';
  import LineOnGraphPaper from './lib/LineOnGraphPaper.svelte';
  import ScrollingGraphPaper from './lib/ScrollingGraphPaper.svelte'
  import SelectorDial from './lib/SelectorDial.svelte';

  let chosenColor = '#ffffff';
  function handleSelect(event) {
    chosenColor = event.detail.css; // { r, g, b, css }
    console.log('Color selected:', event.detail);
  }

  // As far as I can tell, this should rep the whole website script functionality as one app. I am going to make that class here
  class Pen{

  }
  const pen = new Pen();

</script>

<main>
  <div class="app">
    <!-- <h1>PenPen</h1> -->
    <div class="canvas-area">
      <!-- Website Background (Combine this with the canvas-area thing? )-->
      <ScrollingGraphPaper>

        <!-- Shape of our pen object -->
        <Pen {pen} />
        
        <!-- The line that the pen draws on the paper (should this be in pen?) -->
        <LineOnGraphPaper/>
        
      </ScrollingGraphPaper>
    </div>
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

:global(*, *::before, *::after) {
  box-sizing: border-box;
}

main {
  width: 100vw;
  height: 100dvh; /* falls back fine; dvh accounts for mobile browser chrome */
  display: flex;
  overflow: hidden; /* let inner pieces own their own scrolling instead */
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

h1 {
  margin: 0;
  padding: 0.75rem 1rem;
  flex-shrink: 0;
}

.canvas-area {
  flex: 1;        /* fill all remaining height under the h1 */
  min-height: 0;  /* required so a flex child can scroll instead of overflowing */
  width: 100%;
  overflow: hidden;
}
</style>