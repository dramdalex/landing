(window.addEventListener('load', () => {
    init();
})());


(function init() {
    var me = {};
    var form = document.querySelector('.form-container');    
    var closeButton = null;

    function onClose(e) {
        e.preventDefault();
        e.close();
        closeButton.removeEventListener('click', onClose);
    };

    me.open = function () {
        form.classList.remove('is-hidden');

        closeButton = document.querySelector('.form__close-button');
        if (closeButton) {
            closeButton.addEventListener('click',onClose);
        }
    };

    me.close = function () {
        form.classList.add('is-hidden');
    };

    window.form = me;

});