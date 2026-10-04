export const THEME_COLORS = {
  chronDarkGrey: "#3A3D40",
  chronDarkGreyAlt: "#4A4D50",
  chronLightGrey: "#8A8D8F",
  chronLightGreyAlt: "#9B9E9F",
  PrettyMuchBlack: "#100C08",
  PrettyMuchWhite: "#FAF9F6",
  chronOrange: "#F44A02",
  highlighterYellow: "#FBF71950"
};

import redoIcon from './assets/redoIcon.svg';
import undoIcon from './assets/undoIcon.svg';
import upCaret from './assets/upCaret.svg';
import downCaret from './assets/downCaret.svg';
import leftCaret from './assets/leftCaret.svg';
import rightCaret from './assets/rightCaret.svg';
import eraser from './assets/eraser.svg';
import highlighter from './assets/highlighter.svg';
import eyedropper from './assets/eyedropper.svg';
import deleteIcon from './assets/deleteIcon.svg';
import playbackIcon from './assets/playbackIcon.svg';
import pillShape from './assets/pillShape.svg';
import pencilSlash from './assets/pencilSlash.svg';

export const ICONS = {
  redo: redoIcon,
  undo: undoIcon,
  upCaret: upCaret,
  downCaret: downCaret,
  leftCaret: leftCaret,
  rightCaret: rightCaret,
  eraser: eraser,
  highlighter: highlighter,
  eyedropper: eyedropper,
  delete: deleteIcon,
  playback: playbackIcon,
  pillShape: pillShape,
  pencilSlash: pencilSlash
};
export const ICONS_ARR = [ ICONS.redo, ICONS.undo, ICONS.upCaret, ICONS.downCaret, ICONS.leftCaret, ICONS.rightCaret, ICONS.eraser, ICONS.highlighter, ICONS.eyedropper, ICONS.delete, ICONS.playback, ICONS.pillShape, ICONS.pencilSlash];

export const CONTROL_MODES = {
  changeMacros: "Edit Macros",
  brushSize: "Brush Size",
  colorHue: "Hue",
  colorSaturation: "Saturation",
  colorLevel: "Level",
}
export const CONTROL_MODES_ARR = [CONTROL_MODES.changeMacros, CONTROL_MODES.brushSize, CONTROL_MODES.colorHue, CONTROL_MODES.colorSaturation, CONTROL_MODES.colorLevel];

export const MACROS = {
  delete: "delete",
  playback: "playback",
  redo: "redo",
  undo: "undo",
  toggleDrawing: "toggle Drawing",
}
export const MACROS_ARR =  [ MACROS.delete, MACROS.playback, MACROS.redo, MACROS.undo, MACROS.toggleDrawing ];
export const MACRO_ICONS = [ ICONS.delete,  ICONS.playback,  ICONS.redo,  ICONS.undo,  ICONS.pencilSlash];