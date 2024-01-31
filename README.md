# advert-carousel
 An automatic, interactive advert carousel. Built using JavaScript, HTML, CSS and the GSAP animation library. Created for Adylic.

## Approach to functionality

###### Creating a looping animation that is interceptible

Initially, I was going to use GSAP timeline to wrap the animations. However, I found that in order to loop the timeline smoothly, the individual animation instances had to have a repeat value set to "-1". My initial idea, to use GSAP's progress function to detect which element to display on click, wasn't possible without a concrete repeat value. I'd like to figure out a way to make it work with timelines in future.


So I decided I will take a different approach, nesting the GSAP animations inside a "showItem" function that will recieve some index parameter. showItem will be called both on button click, and also inside a recursive function "startLoop", which will infinitely loop to create the automatic animation. 


I'll attempt to add functionality that can briefly pause the loop by running some delay code inside "startLoop" if the boolean isPaused is true.

