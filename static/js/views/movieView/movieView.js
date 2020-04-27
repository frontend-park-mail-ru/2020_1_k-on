import View from 'views/view';
import template from './movieView.tmpl.xml';
import UserReviewComponent from 'components/userReviewComponent/userReviewComponent';
import ReviewsComponent from 'components/reviewsComponent/reviewsComponent';
import Api from 'libs/api';
import {DEFAULT_AVATAR, MOVIE_EVENTS, SUCCESS_STATUS} from 'libs/constants';
import AddToListComponent from "components/addToListComponent/addToListComponent";

export default class MovieView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;
        this.id = 0;

        this.userReviewComponent = new UserReviewComponent(type);
        this.reviewsComponent = new ReviewsComponent(type);
    }

    render(root) {
        this.root = root;

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
        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    this.renderReviews();
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                const userData = {
                    username: res.body.username,
                    image: res.body.image === '' ?
                        DEFAULT_AVATAR : ` http://64.225.100.179:8080/image/${res.body.image}`,
                };

                Api.getUserReview(this.type, this.id)
                    .then((res) => {
                        if (res.status === SUCCESS_STATUS) {
                            return res.json();
                        } else {
                            this.userReviewComponent = new UserReviewComponent(
                                this.type,
                                this.id,
                                userData
                            );
                            document.getElementById('user-review-container')
                                .appendChild(this.userReviewComponent.render());

                            this.renderReviews();
                            return Promise.reject(res);
                        }
                    })
                    .then((res) => {
                        this.userReviewComponent = new UserReviewComponent(
                            this.type,
                            this.id,
                            userData,
                            res.body
                        );
                        document.getElementById('user-review-container')
                            .appendChild(this.userReviewComponent.render());

                        this.renderReviews(res.body.id);
                    });

                Api.getPlaylistsWithoutFilm(this.type, this.id)
                    .then((res) => {
                        if (res.status === SUCCESS_STATUS) {
                            return res.json();
                        } else {
                            return Promise.reject(res);
                        }
                    })
                    .then((res) => {
                        this.addToListComponent = new AddToListComponent(
                            this.type,
                            this.id,
                            res.body
                        );
                        document.getElementById('add-to-list-container')
                            .appendChild(this.addToListComponent.render());
                    })
                    .catch((err) => {
                        console.log(err);
                        this.eventBus.publish(MOVIE_EVENTS.internalError, err.status);
                    });
            });
    }

    renderReviews(userReviewId = 0) {
        Api.getReviews(this.type, this.id)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.reviewsComponent = new ReviewsComponent(
                    userReviewId,
                    (userReviewId === 0 || res.body.length !== 1) ? res.body : null
                );

                document.getElementById('reviews-container')
                    .appendChild(this.reviewsComponent.render());
            })
            .catch((err) => {
                this.eventBus.publish(MOVIE_EVENTS.internalError, err.status);
            });
    }

    setId(id) {
        this.id = id;
    }
}
