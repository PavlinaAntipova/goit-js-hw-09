
const bodyRef = document.body;
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;


startBtn.addEventListener("click", onStartBtn);
stopBtn.addEventListener("click", onStopBtn);



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn() {
    startBtn.setAttribute("disabled", "disabled");
    stopBtn.removeAttribute("disabled");

    timerId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onStopBtn() {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "disabled");

}