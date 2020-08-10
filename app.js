// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID =  data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on inc or exp
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        }

    }

})();


// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
                description:  document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type) {
            var html, newHTML, element;
            
            // Create the HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%""><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
            }

            // Replace the placeholder text with the actual data
            newHTML = html
            .replace('%id%', obj.id)
            .replace('%description%', obj.description)
            .replace('%value%', obj.value);

            // Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        clearFields: function() {
            
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();


// GLOBAL APP CONTROLLER
var controller = (function(BudgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
           
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
    
        });
    }

    var ctrlAddItem = function() {

        // 1. Get the field input data
        var input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UIController.addListItem(newItem, input.type);

        // 4. Calculate the budget
        // 5. Displat the budget in UI
    }

    return {
        init: function() {
            console.log('Application has started!');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();































