<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // 10 evenly-spaced hues around the color wheel, converted to RGB
  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [
      Math.round(f(0) * 255),
      Math.round(f(8) * 255),
      Math.round(f(4) * 255)
    ];
  }

  // Code I found to get the scaled values
  const colors = Array.from({ length: 10 }, (_, i) => {
    const hue = (i / 10) * 360;
    const [r, g, b] = hslToRgb(hue, 80, 55);
    return { r, g, b, css: `rgb(${r}, ${g}, ${b})` };
  });

  let selectedIndex = null;
  let confirmedColor = null;

  function pick(index) {
    selectedIndex = index;
  }

  function confirm() {
    if (selectedIndex === null) return;
    confirmedColor = colors[selectedIndex];
    dispatch('select', confirmedColor);
  }
</script>

<div class="colorPicker">
  <h3>Pick a color</h3>

  <div class="row">
    {#each colors as color, i}
      <button
        class="block"
        class:selected={selectedIndex === i}
        style="background:{color.css}"
        on:click={() => pick(i)}
        aria-label="color {i}"
      />
    {/each}
  </div>

  <button
    class="ok"
    style="background:{selectedIndex !== null ? colors[selectedIndex].css : '#ccc'}"
    on:click={confirm}
    disabled={selectedIndex === null}
  >
    OK — Use this color
  </button>

  {#if confirmedColor}
    <p class="result">Selected: <strong>{confirmedColor.css}</strong></p>
  {/if}
</div>

<style>
  .colorPicker {
    border: 2px solid #333;
    border-radius: 10px;
    margin: auto;
    padding: 5px;
  }
  .row {
    display: flex;
    gap: 4px;
  }
  .block {
    width: 36px;
    height: 36px;
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
  }
  .block.selected {
    border-color: #000;
    transform: scale(1.2);
  }
  .ok {
    width: 100%;
    margin-top: 10px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  .ok:disabled {
    margin-top: 10px;
    opacity: 0.6;
  }
  .result {
    margin-top: 10px;
  }
</style>