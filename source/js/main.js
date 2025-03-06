(window.addEventListener('load',function() {        
    alert('test');
    addNavLinkEvent();
    init();
})());

function init() {
    const openFormButton = document.querySelector('.arrow-down');
    var form = document.querySelector('.form');
    
    if (openFormButton) {
        openFormButton.addEventListener('click', function (e) {
            e.preventDefault();            
            open();
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (isValid()) {
                console.log('form valid');
            }
            else {
                console.log('field of form is not valid');
            }
        });
    }
    
};

function isValid() {
    if (!isAllCompleate(document.querySelectorAll('[data-valid="required"]'))) {
        console.log('Заполните поля формы');
        return false;
    }
    else {
        return true;
    }
};

function isAllCompleate(data) {
    var result = true;

    for (var i = 0; i < data.length; i++) {
        if (!this.isNotEmpty(data[i].value)) {
            result = false;
            break;
        }
    }

    return result;
};


function open() {
    var me = {};
    var form = document.querySelector('.form-container');
    var closeButton = null;    

    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close-button');    
    if (closeButton) {
        closeButton.addEventListener('click', onClose);
    }
};

function onClose(e) {
    e.preventDefault();
    var form = document.querySelector('.form-container');
    form.classList.add('is-hidden');
    closeButton.removeEventListener('click', onClose);
};

//validation
(function validForm() {
    var me = {};

    me.isEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    me.isNumber = function (number) {
        var re = /^\d+$/;
        return re.test(email);
    };

    me.isNotEmpty = function (str) {
        return Boolean(str);
    };


    me.isValid = function () {
        if (!me.isAllCompleate(document.querySelectorAll('[data-valid="required"]'))) {
            console.log('Заполните поля формы');
        }
    };

    me.isAllCompleate = function (data) {
        var result = true;

        for (var i = 0; i < data.length; i++) {
            if (!this.isNotEmpty(data[i].value)) {
                result = false;
                break;
            }
        }

        return result;
    };

    window.validation = me;

});

function addNavLinkEvent() {
    var nav = document.querySelector(".nav");
    alert('test');
    if (nav) {
        nav.addEventListener('click', function (e) {
            var target = e.target;

            if (target.tagName.toLowerCase() !== 'a') {
                return;
            }

            e.preventDefault();

        });
    }

    var toggleToActiveLink = function (target) {
        var links = document.querySelectorAll('.nav__link');

        for (var i = 0; i < links.length; i++) {
            if (links[i].classList.contains('nav__link--active')) {
                links[i].classList.remove('nav__link--active');
            }
        }

        target.classList.add('nav__link--active');

    };

};

function navNavigation(target) {
    var showedSection = target.dataset.link;
};

function scrollToActiveSection(showSection) {
    var section = document.querySelector('.' + showSection);
    var coords = section.getBoundingClientRect();

    var timerId = setInterval(function () {
        if (document.body.scrollTop < coords.top) {
            window.scrollBy(0, 10);
        }
        else {
            clearInterval(timerId);
        }
    }, 0.5);
    
};