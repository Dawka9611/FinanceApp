var uiController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        budgeValue: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        persentageLabel: ".budget__expenses--percentage"
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // exp, inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        clearFields: function () {
            var fields = document.querySelectorAll(
                DOMstrings.inputDescription + ", " + DOMstrings.inputValue
            )

            //convert list to array
            var fieldsArr = Array.prototype.slice.call(fields)

            // for (var i = 0; i < fieldsArr.length; i++) {
            //     fieldsArr[i].value = ""
            // }

            fieldsArr.forEach(function (el, index) {
                el.value = ""
            })

            fieldsArr[0].focus()
        },

        showBudge: function (budge) {
            // budge: data.budge,
            // percent: data.percent,
            // totalInc: data.totals.inc,
            // totalExp: data.totals.exp,

            document.querySelector(DOMstrings.budgeValue).textContent = budge.budge
            document.querySelector(DOMstrings.incomeLabel).textContent = budge.totalInc
            document.querySelector(DOMstrings.expenseLabel).textContent = budge.totalExp
            if (budge.percent !== 0) {
                document.querySelector(DOMstrings.persentageLabel).textContent = budge.percent + "%"
            } else {
                document.querySelector(DOMstrings.persentageLabel).textContent = budge.percent
            }
        },

        addListItem: function (item, type) {
            // ÐžÑ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¸Ð¹Ð³ Ð°Ð³ÑƒÑƒÐ»ÑÐ°Ð½ html-Ð¸Ð¹Ð³ Ð±ÑÐ»Ñ‚Ð³ÑÐ½Ñ.
            var html, list;
            if (type === "inc") {
                list = DOMstrings.incomeList;
                html =
                    '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
            } else {
                list = DOMstrings.expenseList;
                html =
                    '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Ð¢ÑÑ€ HTML Ð´Ð¾Ñ‚Ñ€Ð¾Ð¾ Ð¾Ñ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ ÑƒÑ‚Ð³ÑƒÑƒÐ´Ñ‹Ð³ REPLACE Ð°ÑˆÐ¸Ð³Ð»Ð°Ð¶ Ó©Ó©Ñ€Ñ‡Ð¸Ð»Ð¶
            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            // Ð‘ÑÐ»Ñ‚Ð³ÑÑÑÐ½ HTML ÑÑ DOM Ñ€ÑƒÑƒ Ñ…Ð¸Ð¹Ð¶ Ó©Ð³Ð½Ó©.
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };
})();

// Ð¡Ð°Ð½Ñ…Ò¯Ò¯Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var financeController = (function () {
    // private data
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        budge: 0,

        percent: 0
    };

    var calculateTotal = function (type) {
        var sum = 0
        data.items[type].forEach(function (el) {
            sum = sum + el.value
        })
        data.totals[type] = sum
    }

    return {
        calculateBudge: function () {
            calculateTotal('inc');
            calculateTotal('exp');

            //tosov tootsoh
            data.budge = data.totals.inc - data.totals.exp
            //orogo zarlagiin huvi
            data.percent = Math.round((data.totals.exp / data.totals.inc) * 100)

        },

        getBudge: function () {
            return {
                budge: data.budge,
                percent: data.percent,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            }
        },

        deleteItems: function (type, id) {
            var ids = data.items[type].map(function (el) {
                return el.id
            })

            var index = ids.indexOf(id)

            if (index !== -1) {
                data.items[type].splice(index, 1)
            }
        },

        addItem: function (type, desc, val) {
            var item, id;

            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },

        seeData: function () {
            return data;
        }
    };
})();

// ÐŸÑ€Ð¾Ð³Ñ€Ð°Ð¼Ñ‹Ð½ Ñ…Ð¾Ð»Ð±Ð¾Ð³Ñ‡ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        // 1. oruulah ogogdloo olj awah
        var input = uiController.getInput();

        if (input.description !== "" && input.value !== "") {
            // 2. olj awsan ogodloo finanace moduldaa hadgalah
            var item = financeController.addItem(
                input.type,
                input.description,
                input.value
            );

            // 3. ogogdluudee delgetsin tohiroh hesegt bairluulah
            uiController.addListItem(item, input.type);
            uiController.clearFields()

            const d = financeController.seeData()
            console.log(d)

            // 4. Tosov tootsooloh
            financeController.calculateBudge()
            // 5. tootsoollig delgetsend gargah
            var budge = financeController.getBudge()
            //6. delgetsend gargah
            uiController.showBudge(budge)
        }

    };

    var setupEventListeners = function () {
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function () {
            ctrlAddItem();
        });

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    return {
        init: function () {
            console.log("Application started...");
            setupEventListeners();
            uiController.showBudge({
                budge: 0,
                percent: 0,
                totalInc: 0,
                totalExp: 0,
            })
        }
    };
})(uiController, financeController);

appController.init();