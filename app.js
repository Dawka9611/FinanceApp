

var uiController = (function () {
    var DOMstring = {
        inputType: ".add__type",
        inputDesc: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDesc).value,
                value: document.querySelector(DOMstring.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstring
        },
        addListItem: function (item, type) {
            //orlogo zarlagiin element aguulsan html-iig beltgeh
            var html, list
            if (type === inc) {
                list = '.income__list'
                html = '<div class="item clearfix" id="income - %id%">< div class="item__description" >%description%/div ><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >'
            } else {
                list = '.expenses__list'
                html = '<div class="item clearfix" id="expense- %id%">< div class="item__description" > %description%</div ><div class="right clearfix"><div class="item__value">-  %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>d</div > '
            }
            //ter html-dee utguuda hadgalah
            html = html.replace('%id%', item.id)
            html = html.replace("%description%", item.description)
            html= html.replace(' %value%', item.value)
            //beltgesen html-ee DOM-ruu hine
            document.querySelector(list).insertAdjacentHTML("beforeend", html)
        }
    }
})()

var financeController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }
    return {
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
        },

    };
})()

// var appController = (function () {

// })()

var appController = (function (uiCtrl, fnCtrl) {
    var ctrlAddItem = function () {
        //1.oruulah ogogfliig delgetsend haruulah
        var input = uiCtrl.getInput()
        //2.irsen medeellig sanhuugin controll ru damjuulah
        fnCtrl.addItem(input.type, input.description, input.value)
        //3.olj awsan info-oo web-iin tohiroh hesegt haruulah
        uiCtrl.addListItem(item, input.type)
        //4.tosovoo tooshoh

        //5.etsiin uldegdel, tootsoog delgetsend haruulah
    }
    var setupEventListener = function () {
        var DOM = uiCtrl.getDOMstrings()
        document.querySelector(DOM.addBtn).addEventListener('click', function () {
            ctrlAddItem()
        })
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })
    }

    return {
        init: function () {
            console.log('app started')
            setupEventListener()
        }
    }
})(uiController, financeController)

appController.init()

