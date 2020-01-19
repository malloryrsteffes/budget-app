// BUDGET CONTROLLER ===================

let budgetController = (function() {
  // Some code
})();

// UI CONTROLLER ===================

let UIController = (function() {
  // Private variable to hold our dom strings
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  // Function to get our user input
  // Needs to be a public function so our appController can access it
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    // Exposes the DOMstrings to the public
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// APP CONTROLLER ===================

// pass the other two modules as arguments to the controller
let appController = (function(budgetCtrl, UICtrl) {
  //Grab DOM strings from the UI Controller
  let DOM = UICtrl.getDOMstrings();
  // Control add item function that we can pass to both event listeners
  // This way we don't have to write the code twice
  let ctrlAddItem = function() {
    // 1. Get the input data from the user
    let input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to the budget controller
    // 3. Add the new item to the UI
    // 4. Calculate the new budget
    // 5. Display the new budget on the UI
  };

  // Button Event Listener
  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
  // Keypress Listener
  document.addEventListener("keypress", function(event) {
    // Only run code if button pressed was "enter"
    // "Which" is for older browsers
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
