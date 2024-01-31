const images = document.querySelectorAll('.img');
const headings = document.querySelectorAll('h1');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let isPaused = false;
const itemCount = images.length;

const duration = {
    default: 1.5,
    fade: 0.5,
    pause: 3
}

let currentIndex = itemCount-1; //sets index to front-showing image
let isAnimating = false;

function showItem(index) {

  if (isAnimating) return; //voids interaction during cross-fade
  isAnimating = true;

  gsap.to(images[currentIndex], { opacity: 0, duration: duration.fade});
  gsap.to(images[index], {
    opacity: 1,
    duration: duration.fade,
    onComplete: () => (isAnimating = false)
  });
  gsap.to(headings[currentIndex], { opacity: 0, duration: duration.fade});
  gsap.to(headings[index], {
    opacity: 1,
    duration: duration.fade,
    onComplete: () => (isAnimating = false)
  });
  currentIndex = index;
}

function nextItem() {
    const nextIndex = (currentIndex + 1) % itemCount;
    showItem(nextIndex);
}

function prevItem() {
  const prevIndex = (currentIndex - 1 + itemCount) % itemCount;
  showItem(prevIndex);
}

function pauseCarousel() {
    isPaused = true;
    gsap.delayedCall(duration.pause, () => (isPaused = false))
}

nextBtn.addEventListener('click', () => {
    nextItem();
    pauseCarousel();
});
prevBtn.addEventListener('click', () => {
    prevItem();
    pauseCarousel();
});

function startLoop() {

    //triggers auto fade animation after default duration
    gsap.delayedCall(duration.default, () => {
        if(!isPaused)
        {
            nextItem();
            gsap.delayedCall(duration.fade, () => (startLoop()));
        } else 
        {
            startLoop(); //does nothing until isPaused == true
        }
    }) 
}

startLoop();
