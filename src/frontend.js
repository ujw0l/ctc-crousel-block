import { ctcCarousel } from "ctc-carousel-js";

window.addEventListener('DOMContentLoaded',()=>{

   Array.from(document.querySelectorAll('.ctc-carousel')).map(x=>{ 

    console.log(x.getAttribute('data-autoplay-interval'));
    let autoplay = 'true'== x.getAttribute('data-autoplay') ? true : false;
    let autoPlayinterval = null != x.getAttribute('data-autoplay-interval')? parseInt(x.getAttribute('data-autoplay-interval')) : 2000;
    new ctcCarousel(`#${x.id}`,{ autoPlay:autoplay,autoPlayInterval:autoPlayinterval,autoPlaySelector:`#${x.id}`},{callBack:(el)=>el.style.opacity = '1'});	
   })
})