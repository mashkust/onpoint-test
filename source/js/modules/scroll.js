let [start, current, correct, result] = [0, 0, 0, 0];

export const scrollInit = () => {
  const scroolBar = document.getElementById('scroll-bar');
  const scrollLine = document.getElementById('scroll-line');

  if (scroolBar && scrollLine) {
    const scrollLineRect = scrollLine.getBoundingClientRect();
    scroolBar.addEventListener('touchstart', (evt) => {
      const scroolBarRect = scroolBar.getBoundingClientRect();
      start = scroolBarRect.y - scrollLineRect.y;
      correct = evt.touches[0].clientY - scroolBarRect.y;
      scroolBar.style.transform = `translateY(${start}px)`;
    });

    scroolBar.addEventListener('touchmove', (evt) => {
      current = evt.touches[0].clientY;
      const scroolBarRect = scroolBar.getBoundingClientRect();
      const diff = current - scrollLineRect.y - correct;
      const max = scrollLineRect.height - scroolBarRect.height;

      if (diff < 0) {
        scroolBar.style.transform = `translateY(${0}px)`;
        result = 0;
      }

      if (diff > max) {
        scroolBar.style.transform = `translateY(${max}px)`;
        result = max;
      }

      if (diff > 0 && diff < (max)) {
        scroolBar.style.transform = `translateY(${diff}px)`;
        result = diff;
      }

      const perc = result / max;
      connectScrollToTextContainer(perc);
    });
  }
};


const connectScrollToTextContainer = (perc) => {
  const scrollContainer = document.querySelector('.container-text__wrapper');
  const textWrapper = document.querySelector('.container-paragraph');

  const [containerRect, textWrapperRect] = [
    scrollContainer.getBoundingClientRect(),
    textWrapper.getBoundingClientRect()
  ];

  if (containerRect && textWrapperRect) {
    const overflow = textWrapperRect.height - containerRect.height;
    textWrapper.style.transform = `translateY(-${perc * overflow}px)`;
  }
};


