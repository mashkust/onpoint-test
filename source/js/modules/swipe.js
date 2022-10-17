const IPAD_WIDTH = 1024;
const sliderContainer = document.querySelector('.slider-container');
const linkHome = document.querySelector('.link');
const blockHidden = document.querySelector('.page2').querySelector('.container-img');
const nextButton = document.querySelector('.page1').querySelector('.btn');

const showBlock = () => {
  blockHidden.classList.add('show');
};

const getSwipeDirection = (start, end) => {
  if (start && end) {
    const diff = start - end;
    if (Math.abs(diff) > 50) {
      return diff < 0 ? 'left' : 'right';
    }
    return false;
  }
  return false;
};

const makeSwipe = (result, id) => {
  const newId = id + (result === 'right' ? 1 : -1);
  const prev = document.getElementById(newId);
  if (prev) {
    sliderContainer.style.transform = `translateX(-${IPAD_WIDTH * (newId - 1)}px)`;
  }
};

const detectElementSwipe = (el) => {
  let [startChoord, endChoord] = [null, null];

  if (el) {
    el.addEventListener('touchstart', (evt) => {
      startChoord = evt.touches[0].clientX;
    });

    el.addEventListener('touchmove', (evt) => {
      endChoord = evt.touches[0].clientX;
    });

    el.addEventListener('touchend', () => {
      const result = getSwipeDirection(startChoord, endChoord);
      if (result) {
        makeSwipe(result, Number(el.id));
        [startChoord, endChoord] = [null, null];
        if (result === 'right') {
          showBlock();
        }
      }
    });
  }
};

export const swipeInit = () => ['1', '2', '3'].forEach((el) => detectElementSwipe(document.getElementById(el)));

export const clickHome = () => {
  linkHome.addEventListener('click', (evt) => {
    evt.preventDefault();
    sliderContainer.style.transform = 'translateX(0px)';
    blockHidden.classList.remove('show');
  });
};

export const clickNext = () => {
  nextButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    sliderContainer.style.transform = 'translateX(-1024px)';
    showBlock();
  });
};
