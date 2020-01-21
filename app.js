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
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // Public method that allows other modules to add a new item to our data structure
  return {
    addItem: function(type, des, val) {
      let newItem, id;

      // Create new ID. If there are no items, the first ID = 0
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item based on inc or exp type
      if (type === "inc") {
        newItem = new Income(id, des, val);
      } else if (type === "exp") {
        newItem = new Expense(id, des, val);
      }

      // push the data to our data structure
      data.allItems[type].push(newItem);
      // Return the new element
      return newItem;
    },
    testing: function() {
      console.log(data);
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
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  // Function to get our user input
  // Needs to be a public function so our appController can access it
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      // 1. Create an HTML with some placeholder text
      let html, newHtml, element;

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // 2. Replace the placeholder text with real data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // 3. Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    // Public method to clear fields
    clearFields: function() {
      // querySelectorAll returns a list, NOT an array
      let fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // We will use the slice method on the list (tricking JS, essentially)
      let fieldsArray = Array.prototype.slice.call(fields);

      // Clear each field using forEach
      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();
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

  // Controller add item function that we can pass to both event listeners
  // This way we don't have to write the code twice
  let ctrlAddItem = function() {
    // 1. Get the input data from the user as an object
    let input = UICtrl.getInput();
    // only execute below code IF we have data:
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      let newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3a. Add the new item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 3b. Clear the input fields
      UICtrl.clearFields();

      // Calculate and update budget
      updateBudget();
    }
  };

  let updateBudget = function() {
    // 4. Calculate the new budget
    // 4a. Return the budget
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
