const openButton = document.querySelector('.page3').querySelector('.btn');
const str1 = document.querySelector('.str1');
const str2 = document.querySelector('.str2');
const closeButton = document.querySelector('.close');
const popupContainer = document.querySelector('.popup');
const arrowRight = document.querySelector('.next');
const arrowLeft = document.querySelector('.back');
const transitBack = document.querySelector('.transit-back');
const transitNext = document.querySelector('.transit-next');
const linkHome = document.querySelector('.link');

export const processSlider = () => {


  arrowRight.addEventListener('click', (evt) => {
    evt.preventDefault();
    transitBack.classList.remove('active');
    transitNext.classList.add('active');
    str1.style.display = 'none';
    str2.style.display = 'block';
  });

  arrowLeft.addEventListener('click', (evt) => {
    evt.preventDefault();
    // if (transitNext.classList.contains('active')) {
    transitNext.classList.remove('active');
    transitBack.classList.add('active');
    str2.style.display = 'none';
    str1.style.display = 'block';
  });
};

export const ckickClose = () => {
  if (popupContainer) {
    closeButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      linkHome.style.pointerEvents = 'auto';
      ['1', '2', '3'].forEach((el) => {
        document.getElementById(el).style.pointerEvents = 'auto';
      });
      popupContainer.style.display = 'none';
    });
  }
};

export const ckickOpen = () => {
  closeButton.addEventListener('touchmove', (evt) => {
    evt.stopPropagation();
  });
  arrowRight.addEventListener('touchmove', (evt) => {
    evt.stopPropagation();
  });
  arrowLeft.addEventListener('touchmove', (evt) => {
    evt.stopPropagation();
  });
  openButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    ['1', '2', '3'].forEach((el) => {
      document.getElementById(el).style.pointerEvents = 'none';
    });
    linkHome.style.pointerEvents = 'none';
    popupContainer.style.display = 'block';
  });
};
