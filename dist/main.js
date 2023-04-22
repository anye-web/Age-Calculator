// UI Elements
const formEl = document.querySelector(".form");
const labelEl = document.querySelectorAll("label");
const dayInputEl = document.querySelector("#day");
const monthInputEl = document.querySelector("#month");

const yearInputEl = document.querySelector("#year");
const btnEl = document.querySelector(".btn");
const numYearsEl = document.querySelector(".num__years");
const numDaysEl = document.querySelector(".num__days");

const numMonthsEl = document.querySelector(".num__months");
const formInputEl = document.querySelectorAll(".form-control");
const messageEl = document.querySelectorAll(".message");
const resultEl = document.querySelector(".result");

function main() {
  let numDays, numMonths, numYears;
  const currentDate = new Date();

  // Event Listerners
  formEl.addEventListener("click", function (e) {
    e.preventDefault();
    errorMessage(true, true);
  });

  btnEl.addEventListener("click", displayHandler);

  // Displaying functionality. and adding to the eventhandler
  function displayHandler(e) {
    e.preventDefault();

    numDays = Number(dayInputEl.value);
    numMonths = Number(monthInputEl.value);
    numYears = Number(yearInputEl.value);

    calcDifference();
  }

  // Getting the number of days in a month.
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  // Calculating the diffeence between the userr age and the current date and validating for errors

  function calcDifference() {
    const inputDate = new Date(numYears, numMonths, numDays);

    const timeDifference = Math.floor(
      currentDate.getTime() - inputDate.getTime()
    );
    const dayDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthDiff = Math.floor(dayDiff / 31);
    const yearDiff = Math.ceil(monthDiff / 12);

    // Checking for errors on submission
    if (
      numDays > daysInMonth(numYears, numMonths) ||
      numMonths > 12 ||
      numYears > currentDate.getFullYear()
    ) {
      return errorMessage(true, false);
    } else if (numDays <= 0 || numMonths <= 0 || numYears <= 0) {
      return errorMessage(false, false);
    }

    // Putting the Value to the Ui
    numYearsEl.textContent = yearDiff;
    numMonthsEl.textContent = monthDiff;
    numDaysEl.textContent = dayDiff;
    resultEl.textContent = `${addExtraDigit(numDays)}-${addExtraDigit(
      numMonths
    )}-${numYears}`;
  }

  // Padding extra digit at the start of the result.
  function addExtraDigit(value) {
    return value.toString().length < 2
      ? value.toString().padStart(2, 0)
      : value;
  }

  // Error messages
  function errorMessage(isEmpty, remove) {
    if (!remove) {
      // Add Error Message
      labelEl.forEach((label) => label.classList.add("message-error"));
      formInputEl.forEach((input) => input.classList.add("error"));
      if (isEmpty) {
        messageEl.forEach((msg) => msg.classList.add("show"));
      } else {
        messageEl.forEach((msg) => msg.classList.add("show"));
        messageEl.forEach(
          (msg) => (msg.textContent = "This field is required")
        );
      }
    } else {
      // Remove Error message
      labelEl.forEach((label) => label.classList.remove("message-error"));
      formInputEl.forEach((input) => input.classList.remove("error"));
      messageEl.forEach((msg) => msg.classList.remove("show"));
    }
  }
}

main();
