import View from 'views/view';
import template from './movieView.tmpl.xml';
import Api from 'libs/api';
import UserReviewComponent from 'components/userReviewComponent/userReviewComponent';
import ReviewsComponent from 'components/reviewsComponent/reviewsComponent';
import AddToListComponent from 'components/addToListComponent/addToListComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import {
    DEFAULT_AVATAR,
    HOST_ADDRESS,
    INTERNAL_ERROR_STATUS,
    MOVIE_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class MovieView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;
        this.id = 0;
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
                console.error(`${err.url} ${err.status}: FAILED TO LOAD`);
                this.eventBus.publish(MOVIE_EVENTS.internalError, err.status);
            });
    }

    afterRender() {
        this.renderSimilar(this.data.simfilms, this.data.simseries);

        Api.getUserData().then((res) => {
            if (res.status !== SUCCESS_STATUS) {
                return Promise.reject(res);
            }

            res.json().then((res) => {
                const userData = {
                    username: res.body.username,
                    image: res.body.image === '' ?
                        DEFAULT_AVATAR : `${HOST_ADDRESS}/static/img/${res.body.image}`,
                };

                Api.getUserReview(this.type, this.id)
                    .then((res) => {
                        if (res.status === SUCCESS_STATUS) {
                            res.json().then((res) => {
                                this.renderUserReview(userData, res.body);
                                this.renderReviews(res.body.id);
                            });
                        } else {
                            return Promise.reject(res);
                        }
                    })
                    .catch((err) => {
                        if (err.status === INTERNAL_ERROR_STATUS) {
                            console.error(`${err.status}: FAILED TO LOAD USER REVIEW`);
                        } else {
                            this.renderUserReview(userData);
                        }
                        this.renderReviews();
                    });

                Api.getPlaylistsWithoutFilm(this.type, this.id).then((res) => {
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
                        console.error(`${err.status}: FAILED TO FETCH USER PLAYLISTS`);
                    });
            });
        })
            .catch((err) => {
                this.renderReviews();
                if (err.status === INTERNAL_ERROR_STATUS) {
                    console.error(`${err.status}: FAILED TO LOAD USER DATA`);
                }
            });
    }

    renderSimilar(simFilms = [], simSeries = []) {
        const container = document.getElementById('similar-container');

        container.appendChild(this.renderSimilarElem(
            'Похожие фильмы',
            simFilms,
            'Похожих фильмов не найдено',
        ));
        container.appendChild(this.renderSimilarElem(
            'Похожие сериалы',
            simSeries,
            'Похожих сериалов не найдено',
        ));
    }

    renderSimilarElem(name = '', items = [], notFoundMsg = '') {
        if (items !== null && items.length !== 0) {
            const cards = items.map((cardItem) => {
                const card = new CardComponent(cardItem);
                return card.render();
            });

            const collectionComponent = new CollectionComponent({
                name: name,
                elements: cards,
            });

            return collectionComponent.render();
        } else {
            const notFoundElem = document.createElement('div');
            notFoundElem.classList.add('message');
            notFoundElem.innerText = notFoundMsg;
            return notFoundElem;
        }
    }

    renderUserReview(userData, reviewData = null) {
        const userReviewComponent = new UserReviewComponent(
            this.type,
            this.id,
            userData,
            reviewData
        );

        document.getElementById('user-review-container')
            .appendChild(userReviewComponent.render());
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
                    (!res.body || res.body.length === 1 && res.body[0].id === userReviewId) ?
                        [] : res.body
                );
                document.getElementById('reviews-container')
                    .appendChild(this.reviewsComponent.render());
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO FETCH REVIEWS`);
            });
    }

    setId(id) {
        this.id = id;
    }
}
