import View from 'views/view';
import template from './movieView.tmpl.xml';

const data = {
    type: 'series',
    image: 'static/img/sharp-objects.jpg',
    path: [
        {
            name: 'Главная',
            href: '/',
        },
        {
            name: 'Сериалы',
            href: 'series',
        },
        {
            name: 'Триллеры',
            href: 'thriller',
        },
    ],
    russianname: 'Острые предметы',
    englishname: 'Sharp objects',
    seasons: '2',
    trailerlink: 'https://www.youtube.com/embed/78oHFwuBtyU?fs=0',
    year: '2018',
    country: 'США',
    agelimit: '18',
    description: `Мини-сериал от режиссера «Большой маленькой лжи» Жан-Марка
        Валле, снятый по мотивам романа автора «Исчезнувшей» Гиллиан Флинн.
        Криминальный репортер Камилла Прикер (номинант на «Оскар» Эми Адамс)
        возвращается в родной провинциальный город, чтобы расследовать убийства
        двух маленьких девочек. Пытаясь сложить психологический пазл из своего
        прошлого, она обнаруживает, что у нее с юными жертвами слишком много
        общего.`,
    rating: '0',
    producer: 'Жан-Марк Валле',
    actors: [
        {
            name: 'София Лиллис',
            id: '1',
        },
        {
            name: 'Дженнифер Аспен',
            id: '2',
        },
        {
            name: 'Джексон Хёрст',
            id: '3',
        },
        {
            name: 'Уилл Чейз',
            id: '4',
        },
    ],
    genres: [
        {
            name: 'триллер',
            href: 'thriller',
        },
    ],
    user: {
        username: 'AliceSitedge',
        avatar: 'static/img/avatar.jpg',
    },
    comments: [
        {
            username: 'AliceSitedge',
            avatar: 'static/img/avatar.jpg',
            rate: '8',
            text: 'Отличный фильм',
        },
        {
            username: 'AliceSitedge',
            avatar: 'static/img/avatar.jpg',
            rate: '10',
            text: 'Замечательный фильм',
        },
    ],
};

export default class MovieView extends View {
    constructor() {
        super(template);
        this.data = data;
    }

    render(root) {
        super.render(root);
    }
}
