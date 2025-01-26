
const colors = [	// len 15
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

const exclamWrap = document.querySelector('#exclam');
const login = document.querySelector('#login');
const allExclam = document.querySelectorAll('.exclamEach');
const allArrow = document.querySelectorAll('.arrow');
const adds = document.querySelectorAll('.add');
const gameLinks = document.querySelectorAll('.grid-item');

let clickedLogin = false;  // Erlaubt klicken auf Bild und lässt zum Spielen

// DESIGN FOR BOTH PAGES
setInterval(() => {
	allExclam.forEach(exclam => {
		exclam.style.color = colors[Math.floor(Math.random() * 15)];
	});
},500);

setInterval(() => {
	allArrow.forEach(arrow => {
		arrow.style.color = colors[Math.floor(Math.random() * 15)];
	});
	login.style.borderColor = colors[Math.floor(Math.random() * 15)];
	login.style.color = colors[Math.floor(Math.random() * 15)];
		
	adds.forEach(add => {
		add.style.borderColor = colors[Math.floor(Math.random() * 15)];
		add.style.color = colors[Math.floor(Math.random() * 15)];
	
	});
},100);

setInterval(() => {
	
},100);
// DESIGN FOR BOTH PAGES -> END


gameLinks.forEach(icon => {
	icon.addEventListener('click',() => {
	window.open('../dino/dino.html','_self');
	});
});

adds.forEach(add => {
	add.addEventListener('click', () => {
		window.open("../blank/blank.html", '_blank')
	});
})


// TODO: Mainpage -> login -> auf Bild -> Dinospiel -> Bsod,  