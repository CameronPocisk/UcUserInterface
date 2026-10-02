<script>
    import eraser from './assets/eraser.svg';
    import highlighter from './assets/highlighter.svg';
    import eyedropper from './assets/eyedropper.svg';
</script>
<div class="SelectorDialIcons">
    <div class="ButtonColumn">
        <div></div>
        <img src={eyedropper}/>
        <img src={eraser}/>
        <img src={highlighter}/>
        <div></div>
    </div>
</div>
<style>
.ButtonColumn{
    height: 100%;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>