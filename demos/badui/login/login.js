alert("ACHTUNG DIE FOLGENDE WEBSITE KANN SPUREN VON BLINKENDEN OBJEKTEN UND NÜSSEN ENTHALTEN!")

// Mit Klasse URL kann man APIs einbinden
const chuck = new URL('https://api.chucknorris.io/jokes/random');
const body = document.querySelector('body');
const content = document.querySelector('#content');
const label = document.querySelector('#label');
const counterMin = document.querySelector('#counterMin');
const counterSec = document.querySelector('#counterSec');
const sliderValue = document.querySelector('#sliderValue');
const sliderOutput = document.querySelector('.slid-out');
const horizon = document.querySelector('.horizon');
const sliderMath = document.querySelector('.slider-math');
const tutorialBtn = document.querySelector('#tutorialBtn');
const writeTimer = document.querySelector('#writeTimer');
const playground = document.querySelector('#playground');
const shortcut = document.querySelector('#shortcut');
const guidance = document.querySelector('.guidance');

const adds = document.querySelectorAll('.add');
const innerLabel = document.querySelectorAll('.innerLabel');
const fields = document.querySelectorAll('.fields');

const username = document.querySelector('#username');
let usernameBool = false;
const usernameRepeat = document.querySelector('#usernameRepeat');
let usernameRepeatBool = false;
const password = document.querySelector('#password');
let passwordBool = false;
const passwordRepeat = document.querySelector('#passwordRepeat');
let passwordRepeatBool = false;
const mail = document.querySelector('#mail');
let mailBool = false;
const mailRepeat = document.querySelector('#mailRepeat');
let mailRepeatBool = false;
const address = document.querySelector('#address');
let addressBool = false;
const whenHome = document.querySelector('#whenHome');
let whenHomeBool = false;
const nextButton = document.querySelector('.nextField');

let secCounter = Math.floor(Math.random() * 59);
let minCounter = Math.floor(Math.random() * 30);

let allowWrite = false;
let shortcutBool = false;

const colors = [
    "rgb(26, 0, 22)",
    "rgb(80, 0, 102)",
    "rgb(80, 0, 179)",
    "rgb(40, 0, 241)",
    "rgb(0, 68, 255)",
    "rgb(0, 135, 255)",
    "rgb(0, 216, 255)",
    "rgb(0, 255, 212)",
    "rgb(0, 255, 123)",
    "rgb(42, 255, 0)",
    "rgb(161, 255, 0)",
    "rgb(255, 255, 0)",
    "rgb(255, 161, 0)",
    "rgb(255, 29, 0)",
    "rgb(255, 0, 0)"
]

const letters = [   // len 40
    " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@", ".", "_"
];

let listOfFieldsCounter = 0
const listOfFields = [
    username, usernameRepeat, password, passwordRepeat,
    mail, mailRepeat, address, whenHome
]

let boolCounter = 0
const boolArr = [
    usernameBool, usernameRepeatBool, passwordBool, passwordRepeatBool,
    mailBool, mailRepeatBool, addressBool, whenHomeBool
]

setInterval(() => {
    let value = 400 - parseInt(sliderValue.value);  // um es umzudrehen
    sliderOutput.innerHTML = value.toString() + " : 10";

}, 10)

setInterval(() => {
    writeTimer.style.color = colors[Math.floor(Math.random() * colors.length)];
    // WIN CONDITION
    if (    
        shortcutBool 
    ) {
        window.open('../second/second.html', '_self');
    }

    if(counterSec.innerHTML == "00" && counterMin == "00"){
        let maybeReload = true;
        while(maybeReload){
            alert("ZU LANGSAM");
        }
    }

}, 100);

setInterval(() => {
    innerLabel.forEach(label => {
        label.style.color = colors[Math.floor(Math.random() * colors.length)];
    });
    horizon.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
}, 500);

setInterval(() => {
    if (minCounter > 0 && secCounter > 0) {
        secCounter--;
        if (secCounter == 0) {
            if (minCounter > 0) {
                minCounter--;
            }
            counterMin.innerHTML = `0${minCounter.toString()}`;
            counterSec.innerHTML = `0${secCounter.toString()}`;
            secCounter = 59;
        } else if (secCounter < 10 && minCounter < 10) {
            counterMin.innerHTML = `0${minCounter.toString()}`;
            counterSec.innerHTML = `0${secCounter.toString()}`;

        } else if (secCounter < 10 && minCounter > 10) {
            counterMin.innerHTML = minCounter.toString();
            counterSec.innerHTML = `0${secCounter.toString()}`;

        } else if (secCounter > 10 && minCounter < 10) {
            counterMin.innerHTML = `0${minCounter.toString()}`;
            counterSec.innerHTML = secCounter.toString();

        } else {
            counterMin.innerHTML = minCounter.toString();
            counterSec.innerHTML = secCounter.toString();
        }
    }

    fields.forEach(field => {
        field.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
        field.pla = colors[Math.floor(Math.random() * colors.length)];
    });

    adds.forEach( add => {
        add.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    });
}, 1000);

if (secCounter <= 0 && minCounter <= 0) {   //| von == zu <= geändert 
    alert("SIE MÜSSEN BEZAHLEN");
    innerLabel.forEach(element => {
        element.classList.add('alert');
    });
}



// logik für slider 
setInterval(() => {
    let myValue = 400 - parseInt(sliderValue.value);  // um es umzudrehen // int
    //Wenn innerhalb Wertebereich und Textfeld nicht aktiviert
    if (myValue % 10 == 0 && myValue <= 390 && !allowWrite) { 
        myValue /= 10;  // value = value / 10
        sliderMath.innerHTML = myValue.toString();  // rechte Zahl
        boolCounter = listOfFieldsCounter;  // win detection
        boolArr[boolCounter] = true;    // win detection
        // ausgewähltes Feld mit neuem Wert belegen
        listOfFields[listOfFieldsCounter].value += letters[myValue];

        //console.log(username.value);    // VALUE CHECKER --> ALLES SUP
        //console.log(typeof(username.value));    // STRING
    } else if (myValue % 10 == 0 && myValue <= 390 && allowWrite) {
        myValue /= 10;
        sliderMath.innerHTML = myValue.toString();    // rechter wert
        playground.value += letters[myValue];
        setTimeout(() => {
            allowWrite = !allowWrite;
        }, 2000)
    }

    // tutorialBtn kurz aufploppen lassen
    tutorialBtn.style.color = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
        tutorialBtn.style.color = "black";
    }, Math.floor(Math.random() * 800));

    guidance.style.borderColor = colors[Math.floor(Math.random() * colors.length)];

}, 5000);

nextButton.addEventListener('click', () => {
    listOfFieldsCounter++;
    if (listOfFieldsCounter >= listOfFields.length) {
        listOfFieldsCounter = 0;
    }
});

tutorialBtn.addEventListener('click', () => {
    alert(
        `
        Leider ist etwas schiefgelaufen.
        Bitte versuchen Sie es später noch einmal
        `
    )
});

guidance.addEventListener('click', () => {
    console.log("GAMETIME");
    if(
        username.value == usernameRepeat.value &&
        password.value == passwordRepeat.value &&
        mail.value == mailRepeat.value
    ){
        shortcutBool = true;
    }
});

writeTimer.addEventListener('click', () => {
    allowWrite = !allowWrite;
})

adds.forEach(add => {
    add.addEventListener('click', () => {
        window.open('../blank/blank.html', '_blank');
    });
})


content.addEventListener('click', () => {
    fetch(chuck).then(response => response.json()).
    then(result => {
        alert(result.value);
    }).catch(e => {
        console.log("ERROR = \n" + e);
    })
});