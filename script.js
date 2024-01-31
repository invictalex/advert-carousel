const imageContainer = document.querySelector(".img--container");
const headingContainer = document.querySelector(".heading--container");
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

const itemData = [
    {
        heading: "Mini Alexa in Amethyst",
        image: "images/1.png"
    },
    {
        heading: "Medium Lily in Sapphire",
        image: "images/2.png"
    },
    {
        heading: "Micro Bags",
        image: "images/3.png"
    },
    {
        heading: "Small Check Merino Wool Scarf",
        image: "images/4.png"
    }
]

itemData.forEach(item => {
    const image = document.createElement("div");
    image.classList.add("img");
    image.style.backgroundImage = `url(${item.image})`;
    imageContainer.append(image);

    const heading = document.createElement("h1");
    heading.textContent = item.heading;
    headingContainer.append(heading);
})

const images = document.querySelectorAll('.img');
const headings = document.querySelectorAll('h1');


let isPaused = false;
let itemCount = itemData.length;
let currentIndex = 0; //sets index to front-showing image
let isAnimating = false;

const duration = {
    default: 1.5,
    fade: 0.5,
    pause: 3
}


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
