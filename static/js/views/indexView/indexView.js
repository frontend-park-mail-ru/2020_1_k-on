import View from 'views/view';
import template from './indexView.tmpl.xml';
import {
    SLIDER_INTERVAL,
    SLIDER,
} from 'libs/constants';

const data = {
    recommendations: [
        {
            name: 'Мир дикого запада',
            image: '/static/img/background_4.jpg',
            description:
                `Джонатан Нолан и Джей Джей Абрамс приглашают в 
                 футуристический парк развлечений. «Мир Дикого Запада» — это
                 взрывной коктейль из «Бегущего по лезвию», «Черного зеркала»,
                 «Из машины» и «Парка Юрского периода». История про тематический
                 парк, куда к андроидам приходят люди и творят с ними все,
                 что взбредет в голову, влюбляет в себя намертво:
                 напряженным сюжетом, потрясающим визуальным стилем 
                 и актерской игрой.`,
            link: '/movie',
        },
        {
            name: 'Черное зеркало',
            image: '/static/img/background_5.jpg',
            description:
                `За последние годы технологии всесторонне изменили нашу жизнь,
                 прежде чем мы успели опомниться и усомниться в них.
                 В каждом доме, на каждом столе, на каждой ладони —
                 плазменный телевизор, монитор компьютера, дисплей смартфона —
                 черное зеркало нашего существования в XXI веке.
                 Наша связь с реальностью меняется. В «Чёрном зеркале»
                 отображается всеобщее беспокойство за наш современный мир.`,
            link: '/movie',
        },
        {
            name: 'Острые предметы',
            image: '/static/img/sharp-objects.jpg',
            description:
                `Мини-сериал от режиссера «Большой маленькой лжи»
                 Жан-Марка Валле, снятый по мотивам романа автора «Исчезнувшей»
                 Гиллиан Флинн. Криминальный репортер Камилла Прикер
                 (номинант на «Оскар» Эми Адамс) возвращается в родной
                 провинциальный город, чтобы расследовать убийства двух 
                 маленьких девочек. Пытаясь сложить психологический
                 пазл из своего прошлого, она обнаруживает,
                 что у нее с юными жертвами слишком много общего.`,
            link: '/movie',
        },
    ],
    collections: [
        {
            name: 'Сейчас смотрят',
            list: [
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
            ],
        },
        {
            name: 'Новое',
            list: [
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
            ],
        },
        {
            name: 'Первая серия бесплатно',
            list: [
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
            ],
        },
        {
            name: 'Комедии',
            list: [
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
                {
                    name: 'Навстречу Тьме',
                    link: '/movie',
                    image: '/static/img/series2.jpg',
                },
                {
                    name: 'Carpisma',
                    link: '/movie',
                    image: '/static/img/series3.jpg',
                },
                {
                    name: 'Триггер',
                    link: '/movie',
                    image: '/static/img/series4.jpg',
                },
            ],
        },
    ],
};

export default class IndexView extends View {
    constructor() {
        super(template);
        this.data = data;
    }

    render(root) {
        super.render(root);
        this.afterRender();
    }

    mainSlider(direction) {
        this.curMainSlide.classList.add('hidden');

        const offset = direction === 'left' ? -1 : 1;
        this.curMainIndex =
            (this.curMainIndex + offset) % this.mainSlides.length;
        if (this.curMainIndex === -1) {
            this.curMainIndex = this.mainSlides.length - 1;
        }
        this.curMainSlide = this.mainSlides[this.curMainIndex];
        this.curMainSlide.classList.remove('hidden');
    }

    collectionSlider(slider) {
        const leftArrow = slider.getElementsByClassName(
            'swiper__arrows_left'
        )[0];
        const rigthArrow = slider.getElementsByClassName(
            'swiper__arrows_right'
        )[0];
        leftArrow.addEventListener('click', () => {
            this.scrollAnimation(slider, 'left');
        });
        rigthArrow.addEventListener('click', () => {
            this.scrollAnimation(slider, 'right');
        });
    }

    scrollAnimation(element, direction) {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            if (direction === 'left') {
                element.scrollLeft -= SLIDER.step;
            } else {
                element.scrollLeft += SLIDER.step;
            }
            scrollAmount += SLIDER.step;
            if (scrollAmount >= SLIDER.distance) {
                window.clearInterval(slideTimer);
            }
        }, SLIDER.speed);
    }

    afterRender() {
        this.mainSlides = this.root.getElementsByClassName(
            'main-slider__wrapper'
        );
        this.curMainIndex = 0;
        this.curMainSlide = this.mainSlides[this.curMainIndex];
        this.curMainSlide.classList.remove('hidden');

        this.leftArrow = this.root.getElementsByClassName(
            'main-slider__arrows_left'
        )[0];
        this.leftArrow.addEventListener(
            'click', this.mainSlider.bind(this, 'left')
        );
        this.rightArrow = this.root.getElementsByClassName(
            'main-slider__arrows_right'
        )[0];
        this.rightArrow.addEventListener(
            'click', this.mainSlider.bind(this, 'right')
        );

        this.slideInterval = setInterval(
            this.mainSlider.bind(this),
            SLIDER_INTERVAL,
            'right'
        );

        this.sliders = this.root.getElementsByClassName('swiper__wrapper');
        Array.from(this.sliders).forEach(this.collectionSlider, this);
    }

    close() {
        clearInterval(this.slideInterval);
        super.close();
    }
}
