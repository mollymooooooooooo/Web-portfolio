document.getElementById("js-open-modal-btn").addEventListener("click",function(){
    document.getElementById("js-my-modal").classList.add("open")
})

document.getElementById("js-close-my-modal").addEventListener("click",function(){
    document.getElementById("js-my-modal").classList.remove("open")
})

const input = document.querySelectorAll('input');
for (let elem of input)
{
    elem.addEventListener('input', () => {
        if (elem.value !== '') {
            elem.classList.add('input_filled');
        } else {
            elem.classList.remove('input_filled');
        }
    })
}

let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header-top');
const scrollPosition = () => window.pageYOffset || document.documentElement.scroll;
const containHide = () => header.classList.contains('hide');
window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add('hide');
    }
    else if(scrollPosition() < lastScroll && containHide()) {
        header.classList.remove('hide');
    }
    lastScroll = scrollPosition();
})

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header-top nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header-top nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        }
        else {{
            sec.classList.remove('show-animate');
        }}
    })
}

window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 1000);
}

menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');



gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if(ScrollTrigger.isTouch !==1) {
    ScrollSmoother.create ({
        wrapper: '.wrapper',
        content: '.content',
        smoorh: 1.5,
        effects: true
    })

    gsap.fromTo('.home', { opacity: 1 }, { 
        opacity: 0,
        scrollTrigger: {
            trigger: '.home',
            start: 'center',
            end: '1000',
            scrub: true
        }
     })

     let itemsL = gsap.utils.toArray('.gallery-left .gallery__item')
     itemsL.forEach(item => {
        gsap.fromTo(item, { x: -50, opacity:0 }, {
            opacity: 1, x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-850',
                end: '-100',
                scrub: true
            }
         })
     })

     let itemsR = gsap.utils.toArray('.gallery-right .gallery__item')
     itemsR.forEach(item => {
        gsap.fromTo(item, { x: 50, opacity:0 }, {
            opacity: 1, x: 0,
            scrollTrigger: {
                trigger: item,
                start: '-850',
                end: '-100',
                scrub: true
            }
         })
     })
}

//Валидация формы
let validation = new JustValidate('#form')

let selector = document.querySelector("#phone")
let im = new Inputmask("+7(999)999-99-99")
im.mask(selector)

validation.addField("#name", [
    {
        rule: 'required',
        errorMessage: 'Введите имя'
    },
    {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 символа'
    }
])

.addField("#email", [
    {
        rule: 'required',
        errorMessage: 'Введите почту'
    },
    {
        rule: 'email',
        errorMessage: 'Ошибка в почте'
    }
])

.addField("#phone", [
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length > 0)
        },
        errorMessage: 'Введите номер телефона'
    },
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length === 10)
        },
        errorMessage: 'Неверный номер телефона'
    }
])

.addField("#textheader", [
    {
        rule: 'required',
        errorMessage: 'Введите тему текста'
    },
])

.addField("#textarea", [
    {
        rule: 'required',
        errorMessage: 'Введите текст'
    },
]).onSuccess(async function() {
    let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        textheader: document.getElementById("textheader").value,
        tel: '+7' + selector.inputmask.unmaskedvalue(),
        textarea: document.getElementById("textarea").value
    }
    let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    let result = await response.text()

    alert(result)
})

//Перемещение по странице
let smoother = ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1.5,
    effects: true
});

document.getElementById("start-btn").addEventListener("click", function() {
    smoother.scrollTo("#contact", true);
});

document.getElementById("home-link").addEventListener("click", function() {
    smoother.scrollTo("#home", true);
});

document.getElementById("projects-link").addEventListener("click", function() {
    smoother.scrollTo("#projects", true);
});

document.getElementById("about-link").addEventListener("click", function() {
    smoother.scrollTo("#about", true);
});

document.getElementById("contact-link").addEventListener("click", function() {
    smoother.scrollTo("#contact", true);
});

//Прочие анимации
const tl = gsap.timeline()
tl.fromTo(
    '.home-content',
    {
        x: -150,
        opacity: 0,
    },
    {
        x: 0,
        opacity: 1,
        duration: 1,
    },
)

gsap.from('.skills-item', {
    scrollTrigger: {
        trigger: '.sub-header',
        start: '-30% center',
        end: '+=300px',
        scrub: true,
    },
    scale: 0,
    transformOrigin: 'left center',
    ease: 'none',
    duration: 2,
    stagger: 1,
})