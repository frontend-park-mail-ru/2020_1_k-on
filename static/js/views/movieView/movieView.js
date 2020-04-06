import View from 'views/view';
import template from './movieView.tmpl.xml';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';
import ReviewsComponent from 'components/reviewsComponent/reviewsComponent';
import UserReviewComponent from 'components/userReviewComponent/userReviewComponent';

const data = {
    image: '/static/img/sharp-objects.jpg',
    russianName: 'Острые предметы',
    englishName: 'Sharp objects',
    seasons: '2',
    trailerLink: 'https://www.youtube.com/embed/78oHFwuBtyU?fs=0',
    yearFirst: '2018',
    yearLast: '0',
    country: 'США',
    ageLimit: '18',
    mainGenre: {
        name: 'Триллеры',
        reference: 'thriller'
    },
    description: `Мини-сериал от режиссера «Большой маленькой лжи» Жан-Марка
        Валле, снятый по мотивам романа автора «Исчезнувшей» Гиллиан Флинн.
        Криминальный репортер Камилла Прикер (номинант на «Оскар» Эми Адамс)
        возвращается в родной провинциальный город, чтобы расследовать убийства
        двух маленьких девочек. Пытаясь сложить психологический пазл из своего
        прошлого, она обнаруживает, что у нее с юными жертвами слишком много
        общего.`,
    rating: '0',
    imdbRating: '0',
    producers: [
        {
            name: 'Жан-Марк Валле',
            id: '1',
        },
    ],
    actors: [
        {
            name: 'София Лиллис',
            id: '1',
        },
        {
            name: 'Дженнифер Аспен',
            id: '1',
        },
        {
            name: 'Джексон Хёрст',
            id: '1',
        },
        {
            name: 'Уилл Чейз',
            id: '1',
        },
    ],
    genres: [
        {
            name: 'Триллеры',
            reference: 'thriller',
        },
    ],
};

export default class MovieView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;
        this.id = 0;

        this.userReviewComponent = new UserReviewComponent(type);
        this.reviewsComponent = new ReviewsComponent(type);
    }

    render(root) {
        Api.getMovie(this.type, this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                });
            } else {
                console.log('something went wrong');
            }
        });

        this.data = data;
        this.data.type = this.type;
        this.data.path = [
            {
                name: 'Главная',
                reference: '/',
            },
            {
                name: this.type === 'series' ? 'Сериалы' : 'Фильмы',
                reference: `/${this.type}`,
            },
            {
                name: this.data.mainGenre.name,
                reference: this.data.mainGenre.reference,
            },
        ];

        super.render(root);

        this.userReviewComponent.setId(this.id);
        const userReviewContainer = document.getElementById("user-review-container");
        this.userReviewComponent.render(userReviewContainer);

        this.reviewsComponent.setId(this.id);
        const reviewsContainer = document.getElementById("reviews-container");
        this.reviewsComponent.render(reviewsContainer);
    }

    setId(id) {
        this.id = id;
    }
}
