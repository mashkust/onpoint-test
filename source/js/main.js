import {swipeInit, clickHome, clickNext} from './modules/swipe';
import {scrollInit} from './modules/scroll';
import {ckickClose, ckickOpen, processSlider} from './modules/popup';

window.addEventListener('DOMContentLoaded', () => {
  swipeInit();
  scrollInit();
  clickHome();
  clickNext();
  ckickOpen();
  ckickClose();
  processSlider();
});
