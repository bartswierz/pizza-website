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
//TODO: Fix order total to always have 2 decimal places (use .toFixed)

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

const global_reset = document.getElementById("global_reset"); //THIS WILL BE OUR GLOBAL RESET WHEN USER WANTS TO PLACE ANOTHER ORDER

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
  if (userSize === "Small") return priceOfSmall;
  else if (userSize === "Medium") return priceOfMedium;
  else if (userSize === "Large") return priceOfLarge;
  else return;
};

// Calculates total price
const calcTotalPrice = function (price, userQuantity) {
  return price * userQuantity;
};

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

// UPDATES current order total displayed on page
const updateCurrentTotal = function () {
  document.getElementById("current_total").textContent = `$${parseFloat(orders.total).toFixed(2)}`;
};

// RESETS current order total displayed on page
const resetCurrentTotal = function () {
  document.getElementById("current_total").textContent = `$0.00`;
};

// Updates current tax amount displayed on page
const updateCurrentTax = function () {
  document.getElementById("current_total").textContent = `$${orders.total}`;
};

const calcTwoFloats = function (valueOne, valueTwo) {
  /*Parse converts STRING to FLOAT
  Math.round multiplication FIXES our floating addition inaccuracy error giving 10-12 extra decimal places. */
  return Math.round((parseFloat(valueOne) + parseFloat(valueTwo)) * 100) / 100;
};

//updates the subtotal, tax and total price after each order addition. PLACE AT THE END OF an order
//Add total, add subtotal, add tax(0.06 * subtotal)
const updateModalFooter = function () {
  const update_footer = document.querySelector(".update-modal-footer");
  const subtotal = orders.total;
  const tax = orders.total * 0.06; //6%
  const total = calcTwoFloats(subtotal, tax); //works
  //Reason for parse: Had to place parseFloat inside template BECAUSE floating addition added trailing 0s on our display
  //remove current and then add new in its place

  update_footer.innerHTML = `
  Subtotal: $${parseFloat(subtotal).toFixed(2)}<br>
  Tax:      $${parseFloat(tax).toFixed(2)}<br>
  Total:    $${parseFloat(total).toFixed(2)}
  `;

  // update_footer.innerHTML = `
  // Subtotal: $${subtotal.padEnd(9, "0")}<br>
  // Tax:      $${tax}<br>
  // Total:    $${total}
  // `;
};

// Updates modal window data to match user's pizza order items chosen
const updateViewOrder = function (userChoice) {
  // Destructuring array to pull out data for our html tag
  const [crust, size, quantity, price, totalPrice, name] = userChoice[0];
  const update_modal_body = document.querySelector(".modal-body");
  // parseFloat(totalPrice).toFixed(2);
  // parseFloat(price).toFixed(2);
  // Adds html into our modal body section. Ternary -> if quantity is greater than 1, then use totalPrice, otherwise use price.
  update_modal_body.innerHTML += `<p class="align-item-end">${quantity}x ${size} ${crust} ${name} <span class="align-item-end">$${
    quantity > 1 ? parseFloat(totalPrice).toFixed(2) : parseFloat(price).toFixed(2)
  }</span></p>`;
  updateModalFooter();
};

const resetViewOrder = function () {
  const update_modal_body = document.querySelector(".modal-body");
  update_modal_body.innerHTML = ``;
};

// RESETS modal footer (subtotal, tax, total removed)
const resetModalFooter = function () {
  const update_footer = document.querySelector(".update-modal-footer");
  update_footer.innerHTML = ``;
};

// RESET ORDERS values back to default
const resetOrders = function () {
  (orders.pizzaOrders = []), (orders.wingOrders = []), (orders.sideOrders = []), (orders.dessertOrders = []), (orders.total = 0);
};

// RESETTING ALL ORDER OPTIONS TO DEFAULT VALUES
const resetOptions = function () {
  // PIZZA
  const pepperoni_crust = document.getElementById("pepperoni_crust");
  const pepperoni_size = document.getElementById("pepperoni_size");
  const pepperoni_quantity = document.getElementById("pepperoni_quantity");
  pepperoni_crust.selectedIndex = null;
  pepperoni_size.selectedIndex = null;
  pepperoni_quantity.selectedIndex = null;

  const sausage_crust = document.getElementById("sausage_crust");
  const sausage_size = document.getElementById("sausage_size");
  const sausage_quantity = document.getElementById("sausage_quantity");
  sausage_crust.selectedIndex = null;
  sausage_size.selectedIndex = null;
  sausage_quantity.selectedIndex = null;

  const cheese_crust = document.getElementById("cheese_crust");
  const cheese_size = document.getElementById("cheese_size");
  const cheese_quantity = document.getElementById("cheese_quantity");
  cheese_crust.selectedIndex = null;
  cheese_size.selectedIndex = null;
  cheese_quantity.selectedIndex = null;

  const veggie_crust = document.getElementById("veggie_crust");
  const veggie_size = document.getElementById("veggie_size");
  const veggie_quantity = document.getElementById("veggie_quantity");
  veggie_crust.selectedIndex = null;
  veggie_size.selectedIndex = null;
  veggie_quantity.selectedIndex = null;

  const hawaiian_crust = document.getElementById("hawaiian_crust");
  const hawaiian_size = document.getElementById("hawaiian_size");
  const hawaiian_quantity = document.getElementById("hawaiian_quantity");
  hawaiian_crust.selectedIndex = null;
  hawaiian_size.selectedIndex = null;
  hawaiian_quantity.selectedIndex = null;

  const buffalo_chicken_crust = document.getElementById("buffalo_chicken_crust");
  const buffalo_chicken_size = document.getElementById("buffalo_chicken_size");
  const buffalo_chicken_quantity = document.getElementById("buffalo_chicken_quantity");
  buffalo_chicken_crust.selectedIndex = null;
  buffalo_chicken_size.selectedIndex = null;
  buffalo_chicken_quantity.selectedIndex = null;

  // WINGS
  const bbq_wing = document.getElementById("bbq_wing");
  const bbq_quantity = document.getElementById("bbq_quantity");
  bbq_wing.selectedIndex = null;
  bbq_quantity.selectedIndex = null;

  const buffalo_wing = document.getElementById("buffalo_wing");
  const buffalo_quantity = document.getElementById("buffalo_quantity");
  buffalo_wing.selectedIndex = null;
  buffalo_quantity.selectedIndex = null;

  const mild_wing = document.getElementById("mild_wing");
  const mild_quantity = document.getElementById("mild_quantity");
  mild_wing.selectedIndex = null;
  mild_quantity.selectedIndex = null;

  const korean_bbq_wing = document.getElementById("korean_bbq_wing");
  const korean_bbq_quantity = document.getElementById("korean_bbq_quantity");
  korean_bbq_wing.selectedIndex = null;
  korean_bbq_quantity.selectedIndex = null;

  const teriyaki_wing = document.getElementById("teriyaki_wing");
  const teriyaki_quantity = document.getElementById("teriyaki_quantity");
  teriyaki_wing.selectedIndex = null;
  teriyaki_quantity.selectedIndex = null;

  const plain_wing = document.getElementById("plain_wing");
  const plain_quantity = document.getElementById("plain_quantity");
  plain_wing.selectedIndex = null;
  plain_quantity.selectedIndex = null;

  const breadstick_size = document.getElementById("breadstick_size");
  const breadstick_quantity = document.getElementById("breadstick_quantity");
  breadstick_size.selectedIndex = null;
  breadstick_quantity.selectedIndex = null;

  const fries_size = document.getElementById("fries_size");
  const fries_quantity = document.getElementById("fries_quantity");
  fries_size.selectedIndex = null;
  fries_quantity.selectedIndex = null;

  const chicken_tender_size = document.getElementById("chicken_tender_size");
  const chicken_tender_quantity = document.getElementById("chicken_tender_quantity");
  chicken_tender_size.selectedIndex = null;
  chicken_tender_quantity.selectedIndex = null;

  const garlic_bread_size = document.getElementById("garlic_bread_size");
  const garlic_bread_quantity = document.getElementById("garlic_bread_quantity");
  garlic_bread_size.selectedIndex = null;
  garlic_bread_quantity.selectedIndex = null;

  const cookie_size = document.getElementById("cookie_size");
  const cookie_quantity = document.getElementById("cookie_quantity");
  cookie_size.selectedIndex = null;
  cookie_quantity.selectedIndex = null;

  const brownies_size = document.getElementById("brownies_size");
  const brownies_quantity = document.getElementById("brownies_quantity");
  brownies_size.selectedIndex = null;
  brownies_quantity.selectedIndex = null;
};

// const global_reset = document.getElementById("global_reset"); //THIS WILL BE OUR GLOBAL RESET WHEN USER WANTS TO PLACE ANOTHER ORDER
global_reset.addEventListener("click", function (event) {
  console.log("PLACE NEW ORDER BUTTON CLICKED!");
  // RESETS OBJECT 'orders' back to its original state
  resetOrders();

  // RESETS USER'S CURRENT TOTAL BACK TO $0.00
  resetCurrentTotal();

  //RESET MODAL BODY
  resetViewOrder();

  // RESET MODAL FOOTER
  resetModalFooter();

  // RESET SELECT OPTIONS BACK TO DEFAULT
  resetOptions();
});

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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Pepperoni Pizza(s)"]]; //sending array to keep pizza orders separate each push
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    console.log(orders.pizzaOrders);
    // console.log(orders.pizzaOrders.length);

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Sausage Pizza(s)"]];
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Cheese Pizza(s)"]];
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Veggie Pizza(s)"]];
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Hawaiian Pizza(s)"]];
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
    userChoice = [[userCrust, userSize, userQuantity, price, totalPrice, "Buffalo Chicken Pizza(s)"]];
    orders.pizzaOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrder(userChoice);
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
  if (userWing !== "Select Wing Style" && userWing !== "" && userQuantity !== "Quantity" && userQuantity !== "") return true;
  else return false;
};

// Updates modal window by adding user's wing order
const updateViewOrderWings = function (userChoice) {
  // Destructuring array to pull out data for our html tag
  const [wingType, quantity, price, name] = userChoice[0];
  const update_modal_body = document.querySelector(".modal-body");

  // Adds html into our modal body section. Ternary -> if quantity is greater than 1, then use totalPrice, otherwise use price.
  // update_modal_body.innerHTML += `<p>${quantity} ${size} ${crust} ${name} $${quantity > 1 ? totalPrice : price}</p>`; //works
  update_modal_body.innerHTML += `<p class="align-item-end">${quantity} Pcs. ${wingType} ${name} <span class="align-item-end">$${price}</span></p>`;
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
    userChoice = [[userWing, userQuantity, price, "Honey BBQ Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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
    userChoice = [[userWing, userQuantity, price, "Buffalo Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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
    userChoice = [[userWing, userQuantity, price, "Mild Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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
    userChoice = [[userWing, userQuantity, price, "Korean BBQ Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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
    userChoice = [[userWing, userQuantity, price, "Teriyaki Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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
    userChoice = [[userWing, userQuantity, price, "Plain Wings"]]; //sending array to keep pizza orders separate each push
    orders.wingOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, price);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderWings(userChoice);
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

// Updates modal window by adding user's side order
const updateViewOrderSides = function (userChoice) {
  // Destructuring array to pull out data for our html tag
  const [size, quantity, price, totalPrice, name] = userChoice[0];
  const update_modal_body = document.querySelector(".modal-body");
  // userChoice = [[userSize, userQuantity, price, totalPrice, "Breadsticks"]];
  //Medium(3 Pcs) Breadsticks $price

  // Adds html into our modal body section. Ternary -> if quantity is greater than 1, then use totalPrice, otherwise use price. DOES NOT REPLACE PREVIOUS ORDER TEXT, WE ARE ADDING ANOTHER ENTRY ABOVE
  update_modal_body.innerHTML += `<p class="align-item-end">${quantity}x ${size} ${name} <span class="align-item-end">$${
    quantity > 1 ? parseFloat(totalPrice).toFixed(2) : parseFloat(price).toFixed(2)
  }</span></p>`;

  // update_modal_body.innerHTML += `<p class="align-item-end">${quantity}x ${size} ${crust} ${name} <span class="align-item-end">$${
  //   quantity > 1 ? parseFloat(totalPrice).toFixed(2) : parseFloat(price).toFixed(2)
  // }</span></p>`;
  updateModalFooter();
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

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
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

    // parseFloat(totalPrice).toFixed(2);
    // console.log("Type totalPrice", typeof totalPrice);

    //Pushing order details into Object 'order.sideOrders'
    userChoice = [[userSize, userQuantity, price, totalPrice, "French Fries"]]; //sending array to keep pizza orders separate each push
    orders.sideOrders.push(userChoice);

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
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

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
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

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
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

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
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

    //Updating orders utilizing parseFloat() and Math.round() to FIX/PREVENT rounding errors
    orders.total = calcTwoFloats(orders.total, totalPrice);

    //Updating our current order total
    updateCurrentTotal();

    //UPDATING VIEW ORDER MODAL WINDOW
    updateViewOrderSides(userChoice);
  } else alert("Incomplete order, please choose a size and quantity. Thanks!");
});
