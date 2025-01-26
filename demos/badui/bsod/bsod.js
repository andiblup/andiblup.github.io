const button = document.querySelector('#fullscreen');
const divblank = document.querySelector('#divblank');
const html = document.querySelector('html');
const body = document.querySelector('body');
const survive = document.querySelector('#survive');
const allP = document.querySelectorAll('p');
const qrContainer = document.querySelector('#qrContainer');
const errorMessage = document.querySelector('.errorMessage');
const perVal = document.querySelector('#percentageValue');

let intervalChecker = false;
let value = 0;

function openFullscreen() {
    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) { /* Safari */
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) { /* IE11 */
        html.msRequestFullscreen();
    }
}

button.addEventListener('click', () => {
    while (!intervalChecker) {
        if (confirm("Drücken Sie auf 'Ok' um einen Preis zu Gewinnen!\nWir versprechen auch nichts böses zu tun!")) {
            openFullscreen();	// API benötigt user gesture
            allP.forEach(element => {
                element.style.color = "white";
            });
            let img = document.createElement('img');
            img.id = "qrImg";
            img.src = "../assets/imgs/customQr.PNG";

            qrContainer.insertAdjacentElement('afterbegin',
                img
            )
            intervalChecker = !intervalChecker;
        }
    }
})

setInterval(() => {// && intervalChecker
    value = parseInt(perVal.innerHTML);
    if (value < 85 && intervalChecker) {
        value += Math.floor(Math.random() * 16);
    }
    else if (value >= 85 && value < 99 && intervalChecker) {
        value += 99 - value;
    }else{
        value = 100;
    }
    perVal.innerHTML = value.toString();
}, 5000);

setInterval(() => {
    if(value == 100){
        window.open('../bios/bios.html', '_self')
    }
},10000)
