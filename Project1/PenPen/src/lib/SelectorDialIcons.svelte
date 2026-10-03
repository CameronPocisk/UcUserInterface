<script>
    import { ICONS } from './Constants.js';
</script>
<div class="SelectorDialIcons">
    <div class="ButtonColumn">
        <div></div>
        <img src={ICONS.eyedropper}/>
        <img src={ICONS.eraser}/>
        <img src={ICONS.highlighter}/>
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