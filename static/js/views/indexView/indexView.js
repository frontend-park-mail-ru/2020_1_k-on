import View from 'views/view';
import template from './indexView.tmpl.xml';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import SliderComponent from 'components/sliderComponent/sliderComponent';

const cardList = [
    {
        id: '1',
        type: 'films',
        russianName: 'Навстречу Тьме',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Столкновение',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Триггер',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Навстречу Тьме',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Столкновение',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Триггер',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Навстречу Тьме',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Столкновение',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Триггер',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Навстречу Тьме',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Столкновение',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Триггер',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Навстречу Тьме',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Столкновение',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        id: '1',
        type: 'films',
        russianName: 'Триггер',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
];

const data = {
    recommendations: [
        {
            id: '1',
            type: 'series',
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
        },
        {
            id: '1',
            type: 'series',
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
        },
        {
            id: '1',
            type: 'series',
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
        },
    ],
    collections: [
        {
            name: 'Сейчас смотрят',
            list: cardList,
        },
        {
            name: 'Новое',
            list: cardList,
        },
        {
            name: 'Комедии',
            list: cardList,
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

    afterRender() {
        this.slider = new SliderComponent(data.recommendations);
        this.mainSlider = this.root.getElementsByClassName('main-slider')[0];
        this.slider.render(this.mainSlider);

        this.collections = this.root.getElementsByClassName('collections')[0];

        this.data.collections.forEach((colletion) => {
            const swiper = new SwiperComponent(colletion);
            swiper.render(this.collections);
        });
    }

    close() {
        this.slider.close();
        super.close();
    }
}
