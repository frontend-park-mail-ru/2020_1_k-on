import template from './userReviewComponent.tmpl.xml';
import Component from 'components/component';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';

const data = {
    user: {
        username: 'AliceSitedge',
        avatar: '/static/img/avatar.jpg',
    },
    // review: {
    //     rate: 5,
    //     text: `Странный сериал`,
    // },
};

export default class UserReviewComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
        this.id = 0;
        this.rate = 0;
    }

    render(root) {
        this.data = {};

        Api.getUserData().then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data.user = res.body;

                    Api.getUserReview(this.type, this.id).then((res) => {
                        if (res.status === SUCCESS_STATUS) {
                            res.json().then((res) => {
                                this.data.review = res.body;

                                super.render(root);
                            });
                        } else {
                            super.render(root);

                            for (let starIcon of document.getElementsByClassName('review-form__star-icon')) {
                                starIcon.addEventListener('mouseover', this.onStarMouseOver.bind(this));
                                starIcon.addEventListener('mouseout', this.onStarMouseOut.bind(this));
                                starIcon.addEventListener('click', this.onStarClick.bind(this));
                            }

                            const submitButton = document.getElementsByClassName('review-form__button')[0];
                            submitButton.addEventListener('click', this.onSubmit.bind(this));

                            console.log('something went wrong');
                        }
                    });
                })
            }
        });
    }

    setId(id) {
        this.id = id;
    }

    onStarMouseOver(evt) {
        this.toPreviousStars(evt.target.dataset['value'], (starIcon) => {
            starIcon.classList.add('review-form__star-icon_active');
        });
    }

    onStarMouseOut(evt) {
        this.toPreviousStars(evt.target.dataset['value'], (starIcon) => {
            if (parseInt(starIcon.dataset['value']) > this.rate) {
                starIcon.classList.remove('review-form__star-icon_active');
            }
        });
    }

    onStarClick(evt) {
        const starIcon = evt.target;
        this.rate = starIcon.dataset['value'];

        this.toPreviousStars(10, (starIcon) => {
            if (parseInt(starIcon.dataset['value']) > this.rate) {
                starIcon.classList.remove('review-form__star-icon_active');
            }
        });
    }

    toPreviousStars(starValue, func) {
        const rateBlock = document.getElementsByClassName('review-form__rate')[0];
        for (let star of rateBlock.children) {
            const starIcon = star.firstElementChild;
            func(starIcon);

            if (starIcon.dataset['value'] === starValue) {
                break;
            }
        }
    }

    onSubmit(evt) {
        evt.preventDefault();

        const reviewText = document.getElementsByClassName('review-form__input')[0].value;
        if (!reviewText) {
            // TODO: empty text
            return;
        }

        Api.createReview(this.type, this.id, this.rate, reviewText)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                    });
                } else {
                    console.log('something went wrong');
                }
            });

        this.data.review = {
            rating: this.rate,
            body: reviewText,
        };
        this.render(this.root);
    }
}
