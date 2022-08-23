"use strict";
/* NOTES
event.preventDefault(); 
Add the above code to all click events to PREVENT FORM SUBMISSION, This will allow us to keep the page going without refreshing
*/

//TODO: Move wings, sides, desserts to front page
//TODO: Change HTML 'starting at $12.99' to show the correct price
//TODO: Fix total price to 2 decimal points
/*TODO: Create a checkout button on navbar
      --Add eventListener click on this button, this will start iterating through all object array information to CREATE a recipt.
      --Place this at the BOTTOM of the 
*/

// ALL FORMS
const pepperoniPizzaForm = document.getElementById("pepperoniPizzaForm");
const sausagePizzaForm = document.getElementById("sausagePizzaForm");
const cheesePizzaForm = document.getElementById("cheesePizzaForm");
const veggiePizzaForm = document.getElementById("veggiePizzaForm");
const hawaiianPizzaForm = document.getElementById("hawaiianPizzaForm");
const buffaloChickenPizzaForm = document.getElementById("buffaloChickenPizzaForm");
const bbqWingForm = document.getElementById("bbqWingForm");
const buffaloWingForm = document.getElementById("buffaloWingForm");
const mildWingForm = document.getElementById("mildWingForm");
const koreanBbqWingForm = document.getElementById("koreanBbqWingForm");
const teriyakiWingForm = document.getElementById("teriyakiWingForm");
const plainWingForm = document.getElementById("plainWingForm");
const breadstickSideForm = document.getElementById("breadstickSideForm");
const friesSideForm = document.getElementById("friesSideForm");
const chickenTenderSideForm = document.getElementById("chickenTenderSideForm");
const garlicBreadSideForm = document.getElementById("garlicBreadSideForm");
const cookieDessertForm = document.getElementById("cookieDessertForm");
const browniesDessertForm = document.getElementById("browniesDessertForm");

// ALL BUTTONS
const btnPepperoniPizza = document.querySelector(".form__btn--pepperoni-pizza");
const btnSausagePizza = document.querySelector(".form__btn--sausage-pizza");
const btnCheesePizza = document.querySelector(".form__btn--cheese-pizza");
const btnVeggiePizza = document.querySelector(".form__btn--veggie-pizza");
const btnHawaiianPizza = document.querySelector(".form__btn--hawaiian-pizza");
const btnBuffaloChickenPizza = document.querySelector(".form__btn--buffalo-chicken-pizza");
const btnBbqWings = document.querySelector(".form__btn--bbq-wings");
const btnBuffaloWings = document.querySelector(".form__btn--buffalo-wings");
const btnMildWings = document.querySelector(".form__btn--mild-wings");
const btnKoreanBbqWings = document.querySelector(".form__btn--korean-bbq-wings");
const btnTeriyakiWings = document.querySelector(".form__btn--teriyaki-wings");
const btnPlainWings = document.querySelector(".form__btn--plain-wings");
const btnBreadstickSide = document.querySelector(".form__btn--breadstick-side");
const btnFriesSide = document.querySelector(".form__btn--fries-side");
const btnChickenTenderSide = document.querySelector(".form__btn--tenders-side");
const btnGarlicBreadSide = document.querySelector(".form__btn--garlic-bread-side");
const btnCookieDessert = document.querySelector(".form__btn--cookie-dessert");
const btnBrowniesDessert = document.querySelector(".form__btn--brownie-dessert");

const current_total = document.getElementById("current_total");
console.log("current_total", current_total);

// ORDERS OBJECT
const orders = {
  pizzaOrders: [],
  wingOrders: [],
  sideOrders: [],
  dessertOrders: [],
  total: 0,
};

/* 
  ==========================================================
                      PIZZA
  ==========================================================
*/
//  PIZZA HELPER FUNCTIONS
// Calculates pizza price based on chosen Pizza Size
const calcPrice = function (userSize, [priceOfSmall, priceOfMedium, priceOfLarge]) {
  if (userSize === "small") return priceOfSmall;
  else if (userSize === "medium") return priceOfMedium;
  else if (userSize === "large") return priceOfLarge;
  else return;
};

// const updateTotal = function (current_total, addToTotal) {
//   let updateTotal = current_total + addToTotal;
//   parseFloat(updateTotal).toFixed(2);
//   document.getElementById("current_total").textContent = `$${updateTotal}`;
// };

// Calculates total price
const calcTotalPrice = function (price, userQuantity) {
  return price * userQuantity;
};

// const calcTotalPrice = function (price, userQuantity) {
//   let total = price * userQuantity;
//   // parseFloat(total).toFixed(2);
//   console.log("parseFloat(total): ", parseFloat(total.toFixed(2)));
//   console.log("total Typeof", typeof total);
//   console.log("calcTotalPrice", total);

//   return total;
// };

// Checks if user chose a crust, size, and quantity. "" conditional ensures no option is left unchanged
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
    console.log(`Order received! ${userQuantity} ${userSize} ${userCrust} pepperoni pizza(s) have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Pepperoni"]]; //sending array to keep pizza orders separate each push
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
    // updateTotal(orders.total, totalPrice);

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
    console.log(`Order Received! ${userQuantity} ${userSize} ${userCrust} sausage pizza(s) have been ordered.`);

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Sausage"]];
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
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
    console.log(`Order Received! ${userQuantity} ${userSize} ${userCrust} cheese pizza(s) have been ordered.`);

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Cheese"]];
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
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
    console.log(`Order Received! ${userQuantity} ${userSize} ${userCrust} veggie pizza(s) have been ordered.`);

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Veggie"]];
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
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
    console.log(`Order Received! ${userQuantity} ${userSize} ${userCrust} hawaiian pizza(s) have been ordered.`);

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Hawaiian"]];
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
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
    console.log(`Order Received! ${userQuantity} ${userSize} ${userCrust} buffalo chicken pizza(s) have been ordered.`);

    // Calculates price of item and total price
    let price = calcPrice(userSize, [12.99, 15.99, 18.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Placing ALL order details into an array and pushing into Object 'orders'
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Buffalo Chicken"]];
    orders.pizzaOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a crust, size, and quantity. Thanks!");
});

/* 
==========================================================
                    WING
==========================================================
*/

// WINGS HELPER FUNCTIONS
// Calculates Wing Price based on quantity selected
const calcWingPrice = function (userQuantity, [priceOf_8, priceOf_16, priceOf_24, priceOf_48]) {
  if (userQuantity === "8") return priceOf_8;
  if (userQuantity === "16") return priceOf_16;
  if (userQuantity === "24") return priceOf_24;
  if (userQuantity === "48") return priceOf_48;
  else return;
};

// Checks if user chose a wing style and quantity. "" conditional ensures no option is left unchanged
const isWingOrderValid = function (userWing, userQuantity) {
  if (userWing !== "Select Wing Style" && userWing !== "" && userQuantity !== "Quantity" && userQuantity !== "")
    return true;
  else return false;
};
//////////////////////////////////////////////////////
btnBbqWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  // const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userWing = bbqWingForm.bbq_wing.value;
  const userQuantity = bbqWingForm.bbq_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} honey bbq wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Honey BBQ"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

//BUFFALO WINGS
btnBuffaloWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  // const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userWing = buffaloWingForm.buffalo_wing.value;
  const userQuantity = buffaloWingForm.buffalo_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} buffalo wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Buffalo"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

// MILD WINGS
btnMildWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  // const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userWing = mildWingForm.mild_wing.value;
  const userQuantity = mildWingForm.mild_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} mild wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Mild"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

// Korean BBQ Wings
btnKoreanBbqWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  // const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userWing = koreanBbqWingForm.korean_bbq_wing.value;
  const userQuantity = koreanBbqWingForm.korean_bbq_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} korean bbq wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Korean BBQ"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

btnTeriyakiWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  // const userCrust = pepperoniPizzaForm.pepperoni_crust.value;
  const userWing = teriyakiWingForm.teriyaki_wing.value;
  const userQuantity = teriyakiWingForm.teriyaki_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} teriyaki wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Teriyaki"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

// PLAIN WINGS
btnPlainWings.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userWing = plainWingForm.plain_wing.value;
  const userQuantity = plainWingForm.plain_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isWingOrderValid(userWing, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userWing} plain wings have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcWingPrice(userQuantity, [7.99, 15.99, 23.99, 47.99]);

    //Pushing order details into Object 'orders'
    userChoice = [[userWing, userQuantity, price, "Plain"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += price;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a wing style and quantity. Thanks!");
});

/* 
==========================================================
                    SIDE
==========================================================
*/

// SIDES HELPER FUNCTIONS
// Checks if user chose a crust, size, and quantity. "" conditional ensures no option is left unchanged
const isSideOrderValid = function (userSize, userQuantity) {
  if (userSize !== "Select Size" && userSize !== "" && userQuantity !== "Quantity" && userQuantity !== "") return true;
  else return false;
};

// BREADSTICKS
btnBreadstickSide.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = breadstickSideForm.breadstick_size.value;
  const userQuantity = breadstickSideForm.breadstick_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} breadsticks have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [3.99, 5.99, 7.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Breadsticks"]]; //sending array to keep pizza orders separate each push
    orders.sideOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});

//FRENCH FRIES
btnFriesSide.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = friesSideForm.fries_size.value;
  const userQuantity = friesSideForm.fries_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} french fries have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [2.99, 3.99, 4.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'order.sideOrders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Fries"]]; //sending array to keep pizza orders separate each push
    orders.sideOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});

// CHICKEN TENDERS
btnChickenTenderSide.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = chickenTenderSideForm.chicken_tender_size.value;
  const userQuantity = chickenTenderSideForm.chicken_tender_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} chicken tenders have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [2.99, 4.99, 6.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Chicken Tenders"]]; //sending array to keep pizza orders separate each push
    orders.sideOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});

// GARLIC BREAD
btnGarlicBreadSide.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = garlicBreadSideForm.garlic_bread_size.value;
  const userQuantity = garlicBreadSideForm.garlic_bread_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} garlic breads have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [3.99, 5.99, 7.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Garlic Bread"]]; //sending array to keep pizza orders separate each push
    orders.sideOrders.push(userChoice);

    //Updates our total displayed on the nav
    orders.total += totalPrice;
    document.getElementById("current_total").textContent = `$${orders.total}`;
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});

/* 
==========================================================
                    DESSERTS
==========================================================
*/
// CHOCOLATE CHIP COOKIES
btnCookieDessert.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = cookieDessertForm.cookie_size.value;
  const userQuantity = cookieDessertForm.cookie_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} chocolate chip cookies have been ordered.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [2.99, 5.99, 7.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Chocolate Chip Cookies"]]; //sending array to keep pizza orders separate each push
    orders.dessertOrders.push(userChoice);
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});

//BROWNIES
btnBrowniesDessert.addEventListener("click", function (event) {
  // PREVENTS FORM SUBMISSION
  event.preventDefault();

  let userChoice = []; //Will hold our five items
  const userSize = browniesDessertForm.brownies_size.value;
  const userQuantity = browniesDessertForm.brownies_quantity.value;

  // If user input is valid(User chose BOTH options)
  if (isSideOrderValid(userSize, userQuantity)) {
    console.log(`Order received! ${userQuantity} ${userSize} orders of brownies have been added.`); //Add this

    // Calculates price of item and total price
    let price = calcPrice(userSize, [2.99, 5.99, 7.99]);
    let totalPrice = calcTotalPrice(price, userQuantity);

    //Pushing order details into Object 'orders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "Brownies"]]; //sending array to keep pizza orders separate each push
    orders.dessertOrders.push(userChoice);
    console.log(orders.dessertOrders);
    console.log(orders.dessertOrders.length);
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});
