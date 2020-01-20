// BUDGET CONTROLLER ===================
// Immediately Invoked Function Expression keeps data private
let budgetController = (function() {
  // Expense Function Constructor
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Income Function Constructor
  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Store new data items in respective arrays
  let allExpenses = [];
  let allIncomes = [];

  let data = {
    allItems: {
      expenses: [],
      incomes: []
    },
    totals: {
      expenses: 0,
      incomes: 0
    }
  };
})();

// UI CONTROLLER ===================
// Immediately Invoked Function Expression keeps data private
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
// Immediately Invoked Function Expression keeps data private
// For the app, pass the other two modules as arguments to the controller
let appController = (function(budgetCtrl, UICtrl) {
  // Function that sets up event listeners
  let setupEventListeners = function() {
    //Grab DOM strings from the UI Controller
    let DOM = UICtrl.getDOMstrings();
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
  };

  // Control add item function that we can pass to both event listeners
  // This way we don't have to write the code twice
  let ctrlAddItem = function() {
    // 1. Get the input data from the user
    let input = UICtrl.getInput();
    // 2. Add the item to the budget controller
    // 3. Add the new item to the UI
    // 4. Calculate the new budget
    // 5. Display the new budget on the UI
  };

  // Public initialization function
  return {
    init: function() {
      console.log("The app has started!");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

// Only line of code placed on the outside. Starts the code.

appController.init();
