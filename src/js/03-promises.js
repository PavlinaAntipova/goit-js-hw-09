import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.2.min.css";

const formRef = document.querySelector(".form");
const formDataObj = {
  deleteDelay() {
    this.delay = "";
    this.step = "";
    this.amount = "";
  }
};

formRef.addEventListener("submit", onSubmitForm);


function onSubmitForm(event) {
  event.preventDefault();
  collectFormData(event.currentTarget);
  const { delay, step, amount } = formDataObj;
  let totalDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    
    createPromise(i, totalDelay).then(({ position, delay}) => {
        
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
    }).catch(({ position, delay }) => {

      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
    }).finally(() => {
      formDataObj.deleteDelay();
    });
    
    totalDelay += step;
    console.log(formDataObj);
  }
  
  formRef.reset();
  
}


  function collectFormData(element) {
  const formData = new FormData(element);
  formData.forEach((value, name) => formDataObj[name] = Number(value));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({position, delay});
    } else {
      // Reject
      reject({position, delay});
    }
  }, delay);
  })
    
    ;
}

