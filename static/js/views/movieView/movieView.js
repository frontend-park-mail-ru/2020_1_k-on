import View from 'views/view';
import template from './movieView.tmpl.xml';
import UserReviewComponent from 'components/userReviewComponent/userReviewComponent';
import ReviewsComponent from 'components/reviewsComponent/reviewsComponent';
import Api from 'libs/api';
import {MOVIE_EVENTS, SUCCESS_STATUS} from 'libs/constants';

export default class MovieView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;
        this.id = 0;

        this.userReviewComponent = new UserReviewComponent(type);
        this.reviewsComponent = new ReviewsComponent(type);
    }

    render(root) {
        Api.getMovie(this.type, this.id)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.data = res.body;
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
                        name: this.data.genres[0].name,
                        reference: `/${this.data.type}/${this.data.genres[0].reference}`,
                    },
                ];

                super.render(root);

                this.afterRender();
            })
            .catch((err) => {
                this.eventBus.publish(MOVIE_EVENTS.internalError, err.status);
            });
    }

    afterRender() {
        this.userReviewComponent.setId(this.id);
        const userReviewContainer = document.getElementById('user-review-container');
        this.userReviewComponent.render(userReviewContainer);

        this.reviewsComponent.setId(this.id);
        const reviewsContainer = document.getElementById('reviews-container');
        this.reviewsComponent.render(reviewsContainer);
    }

    setId(id) {
        this.id = id;
    }
}
