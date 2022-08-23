"use strict";
/* NOTES
event.preventDefault(); 
Add the above code to all click events to PREVENT FORM SUBMISSION, This will allow us to keep the page going without refreshing
*/

//TODO: Move wings, sides, desserts to front page
//TODO: Change HTML 'starting at $12.99' to show the correct price

// PIZZA FORMS
const pepperoniPizzaForm = document.getElementById("pepperoniPizzaForm");
const sausagePizzaForm = document.getElementById("sausagePizzaForm");
const cheesePizzaForm = document.getElementById("cheesePizzaForm");
const veggiePizzaForm = document.getElementById("veggiePizzaForm");
const hawaiianPizzaForm = document.getElementById("hawaiianPizzaForm");
const buffaloChickenPizzaForm = document.getElementById(
  "buffaloChickenPizzaForm"
);

// PIZZA BUTTONS
const btnPepperoniPizza = document.querySelector(".form__btn--pepperoni-pizza");
const btnSausagePizza = document.querySelector(".form__btn--sausage-pizza");
const btnCheesePizza = document.querySelector(".form__btn--cheese-pizza");
const btnVeggiePizza = document.querySelector(".form__btn--veggie-pizza");
const btnHawaiianPizza = document.querySelector(".form__btn--hawaiian-pizza");
const btnBuffaloChickenPizza = document.querySelector(
  ".form__btn--buffalo-chicken-pizza"
);

// HOLDS ALL ORDER DETAILS
const orders = {
  pizzaOrders: [],
};

////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

// Calculates pizza price based on chosen Pizza Size
const calcPrice = function (
  userSize,
  [priceOfSmall, priceOfMedium, priceOfLarge]
) {
  if (userSize === "small") return priceOfSmall;
  else if (userSize === "medium") return priceOfMedium;
  else if (userSize === "large") return priceOfLarge;
  else return;
};

// Calculates total price
const calcTotalPrice = function (price, userQuantity) {
  return price * userQuantity;
};

// Checks if user chose a crust, size, and quantity. "" prevents no empty order attempts
const isOrderValid = function (userCrust, userSize, userQuantity) {
  if (
    userCrust !== "Select Crust" &&
    userCrust !== "" &&
    userSize !== "Select Size" &&
    userSize !== "" &&
    userQuantity !== "Quantity" &&
    userQuantity !== ""
  )
    return true;
  else return false;
};

/////////////////////////////////////////////////////////////////////////////////////////
// PIZZA LOGIC
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
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Pepperoni"],
    ]; //sending array to keep pizza orders separate each push
    orders.pizzaOrders.push(userChoice);
    console.log(orders.pizzaOrders);
    console.log(orders.pizzaOrders.length);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

// SAUSAGE PIZZA
btnSausagePizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = sausagePizzaForm.sausage_crust.value;
  const userSize = sausagePizzaForm.sausage_size.value;
  const userQuantity = sausagePizzaForm.sausage_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity)) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} sausage pizza(s) have been ordered.`
    );

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Sausage"],
    ];
    orders.pizzaOrders.push(userChoice);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

// CHEESE PIZZA
btnCheesePizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = cheesePizzaForm.cheese_crust.value;
  const userSize = cheesePizzaForm.cheese_size.value;
  const userQuantity = cheesePizzaForm.cheese_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} cheese pizza(s) have been ordered.`
    );

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Cheese"],
    ];
    orders.pizzaOrders.push(userChoice);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

// VEGGIE PIZZA
btnVeggiePizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = veggiePizzaForm.veggie_crust.value;
  const userSize = veggiePizzaForm.veggie_size.value;
  const userQuantity = veggiePizzaForm.veggie_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} veggie pizza(s) have been ordered.`
    );

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Veggie"],
    ];
    orders.pizzaOrders.push(userChoice);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

//Hawaiian Pizza
btnHawaiianPizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = hawaiianPizzaForm.hawaiian_crust.value;
  const userSize = hawaiianPizzaForm.hawaiian_size.value;
  const userQuantity = hawaiianPizzaForm.hawaiian_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} hawaiian pizza(s) have been ordered.`
    );

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Hawaiian"],
    ];
    orders.pizzaOrders.push(userChoice);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

// BUFFALO CHICKEN PIZZA
btnBuffaloChickenPizza.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userCrust = buffaloChickenPizzaForm.buffalo_chicken_crust.value;
  const userSize = buffaloChickenPizzaForm.buffalo_chicken_size.value;
  const userQuantity = buffaloChickenPizzaForm.buffalo_chicken_quantity.value;

  // If user input is valid, then PUSH order details to object 'orders'
  if (isOrderValid(userCrust, userSize, userQuantity, "")) {
    console.log(
      `Order Received! ${userQuantity} ${userSize} ${userCrust} buffalo chicken pizza(s) have been ordered.`
    );

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [
      [userCrust, userSize, userQuantity, price, totalPrice, "Buffalo Chicken"],
    ];
    orders.pizzaOrders.push(userChoice);
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

/////////////////////////////////////////////////////////////////////////////////////////
// WINGS LOGIC
