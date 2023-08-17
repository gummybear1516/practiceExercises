function subscribe() {
  const buttonElement = document.querySelector(".js-button");
  if (buttonElement.innerText === "Subscribe") {
    buttonElement.innerHTML = "Subscribed";
    buttonElement.classList.add("is-subscribed");
  } else {
    buttonElement.innerText = "Subscribe";
    buttonElement.classList.remove("is-subscribed");
  }
}

function calculateCost() {
  let total = 0;
  let errorElement = document.querySelector(".js-error-message");
  const inputElement = document.querySelector(".js-input-cost");
  let cost = Number(inputElement.value);
  let totalElement = document.querySelector(".js-text-total");
  errorElement.innerHTML = "";
  totalElement.innerHTML = "";

  if (cost > 0) {
    if (cost < 40) {
      total = cost + 10;
    } else {
      total = cost;
    }
    totalElement.innerHTML = `Total: $${total}`;
  } else {
    errorElement.innerHTML =
      "Error: The input you entered must be a number and is less than $0";
  }
}

function onEnterKey(event) {
  if (event.key === "Enter") {
    calculateCost();
  }
}
