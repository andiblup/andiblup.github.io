const html = document.querySelector('html');

const typewriter0 = document.querySelector('.typewriter0');
const typewriter1 = document.querySelector('.typewriter1');
const typewriter2 = document.querySelector('.typewriter2');
const typewriter3 = document.querySelector('.typewriter3');
const typewriter4 = document.querySelector('.typewriter4');
const typewriter5 = document.querySelector('.typewriter5');
const typewriter6 = document.querySelector('.typewriter6');
const typewriter7 = document.querySelector('.typewriter7');
const typewriter8 = document.querySelector('.typewriter8');
const typewriter9 = document.querySelector('.typewriter9');
let counter = 0;

const arr = [
    typewriter0, typewriter1, typewriter2, typewriter3, typewriter4, 
    typewriter5, typewriter6, typewriter7, typewriter8, typewriter9 
];

let intervalChecker = false;
let value = 0;
let pressed = false;

function openFullscreen() {
    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) { /* Safari */
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) { /* IE11 */
        html.msRequestFullscreen();
    }
}

document.body.style.cursor = 'url(), default';

setInterval(() => {
    if(pressed){
        if(counter > 0){
            arr[counter-1].classList.remove('twriter');
        }
        if(counter < 10){   // zuerst adden weil 0 noch nicht hat
            arr[counter].classList.add("twriter");
            arr[counter].style.color = 'white';
            counter++;
        }
    }
}, 4000)

document.addEventListener('keypress', () => {
    pressed = true;
    openFullscreen();
})
