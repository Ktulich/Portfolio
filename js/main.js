$(document).ready(function() {

// Открытие мобильного меню по клику

const burgerWrap = document.querySelector('.burger-wrapper');
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('#overlay');

burgerWrap.addEventListener('click', function() {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('blockscroll-activemenu');
})

// Из бургера в крестик и обратно

const burgerLine = document.querySelector('.burger-line');

burgerLine.addEventListener('click', function() {
    this.classList.toggle('toggle');
})

// Устранение бага с ресайзом

window.addEventListener('resize', function () {
    burger.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('blockscroll-activemenu');
    burgerLine.classList.remove('toggle');
})

// Скрытие мобильного меню после клика на один из пунктов мобильного меню

const removeMobnav = document.querySelectorAll('.remove-mobnav');

removeMobnav.forEach(function(item) {
    item.addEventListener('click', function() {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('blockscroll-activemenu');
        burgerLine.classList.remove('toggle');
    })
})

// Кнопка в начало страницы

const backTopBtn = document.querySelector('.backtop-arrow a');
const backTopBtnText = document.querySelector('.backtop-arrow .backtop-arrow__text')

backTopBtn.classList.add('none');
backTopBtn.style.opacity = 0.5;

    // Скрытие кнопки при скролле выше 500px

    document.addEventListener('scroll', function () {
        if(window.pageYOffset > 500){
            backTopBtn.classList.remove('none');
        }else{
            backTopBtn.classList.add('none');
        }
    });

// Тень у хеадера при скролле

const headerTop = document.querySelector('.header__top');

    // Появление кнопки при скролле ниже px

    document.addEventListener('scroll', function () {
        if(window.pageYOffset > 100){
            headerTop.classList.add('shadow');
        }else{
            headerTop.classList.remove('shadow');
        }
    });

// Подсказка при наведении

backTopBtn.addEventListener('mouseover', function () {
    backTopBtnText.classList.remove('visually-hidden-text');
    backTopBtn.style.opacity = 1;
})

backTopBtn.addEventListener('mouseout', function () {
    backTopBtnText.classList.add('visually-hidden-text');
    backTopBtn.style.opacity = 0.5;
})

// Меню Mixit

let containerEl = document.querySelector('#mix-cards');

let mixer = mixitup(containerEl);
    
// Формы
    
    // Скрипт для fake placeholder
    
    const formItemContent = document.querySelectorAll('.form-item__content');
    
    for(let item of formItemContent){
        const thisParent = item.closest('.form-item');
        const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
        // Если инпут в фокусе
        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('active-form');
        });
        
        // Если инпут теряет фокус
        item.addEventListener('blur', function() {
            if(item.value.length > 0){
                thisPlaceholder.classList.add('active-form');
            }
            else{
                thisPlaceholder.classList.remove('active-form');
            }
        })
    }

    // Валидация формы

    $('.form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Необходимо ввести адрес вашей электронной почты',
                email: 'Отсутствует символ @'
            },
            message: {
                required: 'Введите текст сообщения'
            }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();
        }

    })

    // Функция Ajax при отправке на сервер

    function ajaxFormSubmit() {

        let string = $(".form").serialize(); // Сохраняем данные, введенные в строку

        // Формируем запрос ajax

        $.ajax({
            type: "POST", // Тип запроса
            url: "php/mail.php", // Куда отправляем запрос
            data: string, // Какие данные отправляем, в данном случае отправляем переменную string

            // Функция, если все прошло успешно
            success: function (html) {
                $(".form").slideUp(800);
                $('#answer').html(html);
            }
        });
        // Чтобы по Submit больше ничего не выполнялось - делаем возврат false, чтобы прервать цепочку срабатывания остальных функций
        return false;

    }


});