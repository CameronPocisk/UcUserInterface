<script>
    import { getContext } from 'svelte'; // For gettting my instance (every component)
    const pen = getContext('penContext');
</script>
<button id="topButton1" class="SelectorDial" title="Selector Dial"
        on:click={() => pen.incrementDial()}></button>
<style>
.SelectorDial{
    height: 100%;
    width: 30px;
    background-color: #F44A02;
    border-radius: 10px 0 0 10px;

    /* Make it not look like a button lol */
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
}
</style>