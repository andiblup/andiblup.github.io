console.log("HIER KÖNNTE IHRE WERBUNG STEHEN!");

const area = document.querySelector('.area');
const circles = document.querySelector('.circles');
const screenWidth = screen.width;
const screenHeight = screen.height;

let audio = new Audio('./sounds/ld28.6.wav');
let jumpSound = new Audio('./sounds/jump.wav');

let easyOn = false;
let scoreCondition = 100;
const easyScore = 150;
const hardScore = 100;


// damit die kaktusse sich nicht gleich bewegt
setTimeout(() => {
	let doom = prompt("Welchen Schwierigkeitsgrad wollen Sie?")
	// if not easy 
	setTimeout(() => {
		if (doom == "easy") {
			alert("🔥 EASTEREGG UNLOCKED: *TOO WEAK TO PLAY* 🔥")
			circles.remove();
			area.className = "bg";
			easyOn = true;
			scoreCondition = easyScore;
			
		}else{
			alert("🔥 EASTEREGG UNLOCKED: *HELLMODE* 🔥");
			scoreCondition = hardScore;
			/*	HELLMODE SETTINGS
			 * // TODO: screen.width für den hardmode *//*
			 *	wenn screen.width kleiner als 1300px ||
			 * wenn screen.height kleiner als CIRCA 900px
			 * // TODO: 
			 * GAME DIV KLEINER GEMACHT WERDEN
			 * EVTL. DINO UND KAKTUS ANPASSEN
			 */ 
			
		} // END OF HELLMODE SETTINGS

		jmpBtnWrap_2.classList.add('jaround');
		jmpBtnWrap_1.classList.add('jaround');
	}, 10);

}, 10);

// COLLISION VELOCITIES
// needed because on devices with less height the game bar needs to be smaller, 
// for laptop
let cactusLeftOf = -132;
let cactusRightOf = -20;
let dinoTopVel = 230;
//

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

const gameBody = document.querySelector('.game');
const jmpBtnWrap_1 = document.querySelector('#btnWrapper_1');
const jmpBtnTotal = document.querySelectorAll('.btn');
const jmpBtnWrap_2 = document.querySelector('#btnWrapper_2');
const html = document.querySelector('html');
const topElements = document.querySelector('#topElements');

const sun = document.querySelector('#sun');
const cloud1 = document.querySelector('#cloud1');
const ufo = document.querySelector('#ufo');
const cloud2 = document.querySelector('#cloud2');
const scoreboard = document.querySelector('#scoreboard');
const scoreValue = document.querySelector('#scoreValue');

/* TODO:
 * NOTES: 
 * detect size of device and resize game div, because on notebook not playable (bottom button row not accessable)
 * EASYMODE does work on notebook 
 * 
 */
const colors = [
	"rgb(164, 198, 57)",	//android green			1
	"rgb(66, 133, 244)",	//google blue			2
	"rgb(219, 68, 55)",		//google red			3
	"rgb(244, 180, 0)",		//google yellow			4
	"rgb(15, 157, 88)",		//google green			5
	"rgb(176, 20, 85)",		//hello kitty pink		6
	"rgb(115, 115, 115)",	//microsoft grey		7
	"rgb(29, 185, 84)",		//spotify green			8
	"rgb(244, 128, 36)",	//stackoverflow orange	9
	"rgb(51, 0, 0)"			//ups brown
]

let score = 0;
let scoreChecker = false;


setInterval(() => {
	scoreValue.style.color = colors[Math.floor(Math.random() * 10)];
}, 500);

jmpBtnTotal.forEach(element => {
	element.style.color = colors[Math.floor(Math.random() * 10)];
});

function innerButtonPos(randomInt){	// NAME CHANGED 
	switch (randomInt) {	// before -> given
		case 0:
			// start
			jmpBtnWrap_2.classList.add('jstart');
			break;
		case 1:
			// center
			jmpBtnWrap_2.classList.add('jcenter');
			break;
		case 2:
			// end
			jmpBtnWrap_2.classList.add('jend');
			break;
		case 3:
			// space around
			jmpBtnWrap_2.classList.add('jbetween');
			break;
		case 4:
			// space between
			jmpBtnWrap_2.classList.add('jaround');
			break;
	}
}

function jump() {
	if (dino.classList != "jump") {
		dino.classList.remove("walk");
		dino.classList.add("jump");

		setTimeout(function () {
			dino.classList.remove("jump");
			dino.classList.add("walk");
		}, 300);
	}
	let randomInt = Math.floor(Math.random() * 5);
	let randomSelector = Math.floor(Math.random() * 5);
	jmpBtnWrap_1.className = 'btnWrapper';
	jmpBtnWrap_2.className = 'btnWrapper';
	switch (randomInt) {
		case 0:
			// start
			jmpBtnWrap_1.classList.add('jstart');
			innerButtonPos(randomSelector);
			break;
		case 1:
			// center
			jmpBtnWrap_1.classList.add('jcenter');
			innerButtonPos(randomSelector);
			break;
		case 2:
			// end
			jmpBtnWrap_1.classList.add('jend');
			innerButtonPos(randomSelector);
			break;
		case 3:
			// space around
			jmpBtnWrap_1.classList.add('jbetween');
			innerButtonPos(randomSelector);
			break;
		case 4:
			// space between
			jmpBtnWrap_1.classList.add('jaround');
			innerButtonPos(randomSelector);
			break;
	}
}

setInterval(() => {	// score
	// set score
	score++;
	document.title = "Score: " + score;
	scoreValue.innerHTML = score.toString();
}, 80)

setInterval(() => {
	// dino Y position
	let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
	// cactus X position
	let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

	if (cactusLeft > cactusLeftOf && cactusLeft < cactusRightOf && dinoTop >= dinoTopVel) {
		let noobOrNot;
		if (score < scoreCondition) {
			noobOrNot = "\nLeider zu wenig Punkte. Sei das nächste mal einfach besser!";
		} else {
			noobOrNot = "\nWOW ein richtiger Meister. Musst nicht gleich so angeben.";
		}
		/*
		 * TODO: muss zur bearbeitung auskommentiert werden!!!!
		 * // TODO: DAS MACHT ES ERST EXTRA BESCHISSEN !!!!!!!! 
		 */ if (confirm("Game Over!\n" + "Your total score is: " + score + noobOrNot) && score >= scoreCondition) {
			window.open('../bsod/bsod.html','_self');	// _self <-- !WICHTIG
		};
		/**/
		score = 0;
		document.title = "Score: " + score;
		scoreValue.innerHTML = score;
	} 
}, 10);	// 11 bis 19 ms nach sprung um aus collision detection rauszukommen

function openFullscreen() {
	if (html.requestFullscreen) {
		html.requestFullscreen();
	} else if (html.webkitRequestFullscreen) { /* Safari */
	html.webkitRequestFullscreen();
	} else if (html.msRequestFullscreen) { /* IE11 */
	html.msRequestFullscreen();
	}
}

setInterval(() => {
	jumpButtonReverse();
	jumpButton();

}, 5000);

function jumpButtonReverse() {
	jmpBtnTotal.forEach(element => {
		element.style.color = colors[Math.floor(Math.random() * 10)];
		if (element.className == "btn btn-success") {
			element.classList.remove('btn-success');
			element.classList.add('btn-dark');
		} 
	});
}

function jumpButton() {
	let randomCounter = Math.floor(Math.random() * 10);
	let locCount = 0;
	jmpBtnTotal.forEach(element => {
		element.style.color = colors[Math.floor(Math.random() * 10)];
		if (locCount == randomCounter) {
			element.classList.remove('btn-dark');
			element.classList.add('btn-success');
			locCount++;
		} else {
			locCount++;
		}
	});
}

// EVENTLISTENER
jmpBtnTotal.forEach(element => {
	element.addEventListener('mouseenter', () => {
		if (element.className == "btn btn-success") {
			jumpSound.volume = 0.2;
			jump();
			setTimeout(() => {
				jumpSound.volume = 0.0;
			}, 400);
		} else {
			gameBody.classList.add('strobo')
			setTimeout(function () {
				gameBody.classList.remove('strobo');
			}, 300);
		}
	})
});

/*
 * to get exact px pos val
document.addEventListener('mousemove', event => {
	console.log("YYYYYYYY" + event.clientX);
	console.log("XXXXXXXX" + event.clientY);
});
 */

ufo.addEventListener('click', () => {
	if(confirm("FULLSCREEN?")){
		openFullscreen();	// API benötigt user gesture
		//audio.play();		
	}
});

document.addEventListener('click', () => {
	audio.volume = 0.2;
	audio.play();
	audio.loop = true;
	
	jumpSound.volume = 0.0;
	jumpSound.play();
	jumpSound.loop = true;
});