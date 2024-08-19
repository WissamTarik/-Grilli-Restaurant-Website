let preloader=document.querySelector(".preload"),
header=document.querySelector("header"),
navbar=document.querySelector("nav"),
navbarToggler=document.querySelectorAll("[ data-nav-toggler]"),
overlay=document.querySelector(".overlay"),
closeBtn=document.querySelector(".close-btn"),
heroSlider=document.querySelector(".hero-slider"),
heroSliderItems=document.querySelectorAll(".slider-item"),
heroSliderPrevBtn=document.querySelector(".prev"),
heroSliderNextBtn=document.querySelector(".next"),
parallaxItems=document.querySelectorAll("[data-parallaX-item]"),
backToTopBtn=document.querySelector(".back-to-top")

// Global Variables
let lastScrollPosition=0,
currentSlidePosition=0,
lastActiveSlider=heroSliderItems[0],
autoSlideInterval,
x,
y




// Global function
function addEventOnElements(elements,eventType,callback){
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType,callback)
        
    }
}


// Make the page load
window.addEventListener("load",()=>{
    preloader.classList.add("loaded")
    document.body.classList.add('loaded')
})

// Header Functions
function toggleNavbar(){
     overlay.classList.toggle('active')
     navbar.classList.toggle('active')
     document.body.classList.toggle('nav-active')
}
closeBtn.addEventListener('click',toggleNavbar)
addEventOnElements(navbarToggler,'click',toggleNavbar)

function hideHeader(){
    let isScrollPosition=lastScrollPosition < window.scrollY
    if(isScrollPosition){
        header.classList.add('hide')
    }
    else{
        header.classList.remove('hide')

    }
    lastScrollPosition=window.scrollY
}
window.addEventListener("scroll",()=>{
    if(window.scrollY >50){
        header.classList.add("active")
        backToTopBtn.classList.add("active")
        hideHeader()
    }
    else{
        header.classList.remove("active")
        backToTopBtn.classList.remove("active")
    }
})

function updateSliderPosition(){
          lastActiveSlider.classList.remove("active")   
        heroSliderItems[currentSlidePosition].classList.add("active")
        lastActiveSlider=  heroSliderItems[currentSlidePosition]
}
function slideNext(){
    if(currentSlidePosition >= heroSliderItems.length -1 ){
             currentSlidePosition=0
    }
    else{
        currentSlidePosition++;
    }
    updateSliderPosition()
}
function slidePrev(){
    if(currentSlidePosition <=0){
          currentSlidePosition=heroSliderItems.length -1
    }
    else{
        currentSlidePosition--;
    }
    updateSliderPosition()
}
heroSliderPrevBtn.addEventListener("click",slidePrev)
heroSliderNextBtn.addEventListener("click",slideNext)

function autoSlide(){
   autoSlideInterval=setInterval(() => {
           slideNext()
   }, 7000);
}
addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn],'mouseover',()=>{
    clearInterval(autoSlideInterval)
})
window.addEventListener("load",autoSlide)


// Start About
window.addEventListener("mousemove",function(event){
    x=(event.clientX /window.innerWidth *10 )-5
    y=(event.clientY /window.innerHeight *10 )-5
    x=Math.abs(x)
    y=Math.abs(y)
    for (let i = 0; i < parallaxItems.length; i++) {
       x=x*Number(parallaxItems[i].dataset.parallaxSpeed)
       y=y*Number(parallaxItems[i].dataset.parallaxSpeed)
       parallaxItems[i].style.transform=`translate3d(${x}px ,${y}px ,0px)`
      
    }
})
// End About