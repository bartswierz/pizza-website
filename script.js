"use strict";
/* NOTES
event.preventDefault(); 
Add the above code to all click events to PREVENT FORM SUBMISSION, This will allow us to keep the page going without refreshing
*/

//TODO: Move wings, sides, desserts to front page
//TODO: Change HTML 'starting at $12.99' to show the correct price

// To select an ID, USE '#' =>
//querySelector('#idname)
// To select a class, USE '.' =>
//querySelector('.className')
// Use querySelectorAll() to grab all form input box information

// Misc Variables
let price = 0;
let totalPrice = 0;
// Variables are for helper function: isValidOrder
const defaultCrust = "Select Crust";
const defaultSize = "Select Size";
const defaultQuantity = "Quantity";
const empty = "";

// let pizzaPrice = [12.99, 15.99, 18.99];

// PIZZA FORMS
const pepperoniPizzaForm = document.getElementById("pepperoniPizzaForm");
const sausagePizzaForm = document.getElementById("sausagePizzaForm");

// PIZZA BUTTONS
const btnPepperoniPizza = document.querySelector(".form__btn--pepperoni-pizza");
const btnSausagePizza = document.querySelector(".form__btn--sausage-pizza");

const orders = {
  // Will hold our: crust, size, quantity, price, totalPrice
  currentPizzaOrders: [],
  // price: 0,
  // totalPrice: 0
};

////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

// Calculates pizza price based on chosen Pizza Size
const calcPrice = function (
  userSize,
  [priceOfSmall, priceOfMedium, priceOfLarge]
) {
  if (userSize === "small") return (price = priceOfSmall);
  else if (userSize === "medium") return (price = priceOfMedium);
  else if (userSize === "large") return (price = priceOfLarge);
  else return;
};

// Calculates total price
const calcTotalPrice = function (price, userQuantity) {
  return price * userQuantity;
};

// Checks if user chose a crust, size, and quantity
const isOrderValid = function (userCrust, userSize, userQuantity, empty = "") {
  if (
    userCrust !== defaultCrust &&
    userCrust !== empty &&
    userSize !== defaultSize &&
    userSize !== empty &&
    userQuantity !== defaultQuantity &&
    userQuantity !== empty
  )
    return true;
  else return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////

// Customer added 'Pepperoni Pizza' to their order
btnPepperoniPizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userSize = pepperoniPizzaForm.pepperoni_size.value;
  const userQuantity = pepperoniPizzaForm.pepperoni_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order received! ${userQuantity} ${userSize} ${userCrust} pepperoni pizza(s) have been ordered.`
    ); //Add this

    // Calculates price of item and total price
    price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Pepperoni"],
    ]; //sending array to keep pizza orders separate each push
    orders.currentPizzaOrders.push(userChoice);
    // console.log(orders.currentPizzaOrders);
    console.log(orders.currentPizzaOrders.length);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

//Pizza #2 Sausage
btnSausagePizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = sausagePizzaForm.sausage_crust.value;
  const userSize = sausagePizzaForm.sausage_size.value;
  const userQuantity = sausagePizzaForm.sausage_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} sausage pizza(s) have been ordered.`
    ); //Add this

    // Calculates price of item and total price
    price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Sausage"],
    ]; //sending array to keep pizza orders separate each push
    orders.currentPizzaOrders.push(userChoice);
    // console.log(orders.currentPizzaOrders);
    console.log(orders.currentPizzaOrders.length);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});
