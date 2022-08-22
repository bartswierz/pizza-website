"use strict";
/* NOTES
event.preventDefault(); 
Add the above code to all click events to PREVENT FORM SUBMISSION, This will allow us to keep the page going without refreshing
*/

//TODO: Move wings, sides, desserts to front page
//TODO: add pricing logic in btnPepperoni when user clicks 'add to Order' =>
//  if small -> price = 12.99 & total = quantity * price =>
// => order.orders.push([crust, size, quantity, price, total])

// To select an ID, USE '#' =>
//querySelector('#idname)
// To select a class, USE '.' =>
//querySelector('.className')
// Use querySelectorAll() to grab all form input box information

// PIZZA BUTTONS
const btnPepperoniPizza = document.querySelector(".form__btn--pepperoni-pizza");

const pizzaPrice = 12.99; //starting price
const order = {
  orders: [],
};

const pepperoniPizzaForm = document.getElementById("pepperoniPizzaForm");

// Customer added 'Pepperoni Pizza' to their order
btnPepperoniPizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  // Holds userChoice to be pushed into order Object
  const userChoice = []; //to hold our three items
  const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userSize = pepperoniPizzaForm.pepperoni_size.value;
  const userQuantity = pepperoniPizzaForm.pepperoni_quantity.value;

  // To compare to user choice, helps prevent user from submitting incomplete order
  const defaultCrust = "Select Crust";
  const defaultSize = "Select Size";
  const defaultQuantity = "Quantity";

  if (
    userCrust != defaultCrust &&
    userSize != defaultSize &&
    userQuantity != defaultQuantity
  ) {
    console.log(
      `SUCCESS! Crust: ${userCrust}, Size: ${userSize}, Quantity: ${userQuantity}`
    );
    // console.log(`userCrust = ${userCrust}`);
    // console.log(`userSize = ${userQuantity}`);
    // console.log(`userQuantity = ${userQuantity}`);
    // console.log(
    //   `You have ordered ${userQuantity} ${userSize} ${userCrust} pizzas!`
    // );
  }
});
