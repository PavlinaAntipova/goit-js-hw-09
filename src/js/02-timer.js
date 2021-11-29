import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.2.min.css";
import rocketLaunch from "./02-rocket-animation";

const inputRef = document.querySelector("#datetime-picker");
const startBtnRef = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {

        if (selectedDates[0] - Date.now() < 0) {
            Notiflix.Notify.failure('Please, choose a date in the future');
            startBtnRef.setAttribute("disabled", "disabled");
            return;
        }
      
        startBtnRef.removeAttribute("disabled");
        startBtnRef.addEventListener("click", onStarntBtnClick);
    },
    
 
};

const calendar = flatpickr(inputRef, options);
startBtnRef.setAttribute("disabled", "disabled");




function onStarntBtnClick() {
    timer();
    calendar.config.minDate = "today";
}

function timer() {
    const idTimer = setInterval(() => {
        const differenceTime = calendar.selectedDates[0] - Date.now();
        if (differenceTime < 0) {
            clearInterval(idTimer);
            rocketLaunch();
            return;
        }
        updateTextTimer(convertMs(differenceTime));
    }, 1000);

}

function updateTextTimer(objDate) {
    const { days, hours, minutes, seconds } = objDate;
            changeText(daysRef, days);
            changeText(hoursRef, hours);
            changeText(minutesRef, minutes);
            changeText(secondsRef, seconds); 
    }

function changeText(element, value) {
    element.textContent =  addLeadingZero(value);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}






