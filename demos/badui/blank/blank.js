const body = document.querySelector('body');
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

setInterval(() => {
    body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}, 10);