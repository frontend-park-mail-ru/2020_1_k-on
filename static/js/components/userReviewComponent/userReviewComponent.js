import Component from 'components/component';
import template from './userReviewComponent.tmpl.xml';
import Api from 'libs/api';
import {DEFAULT_AVATAR, MAX_RATING, SUCCESS_STATUS} from 'libs/constants';

export default class UserReviewComponent extends Component {
    constructor(type, id, review) {
        super(template);
        this.type = type;
        this.id = id;
        this.rating = 0;
    }

    render(root) {
        this.data = {};

        Api.getUserData().then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data.user = res.body;
                    this.data.user.image = res.body.image === '' ?
                        DEFAULT_AVATAR : ` http://64.225.100.179:8080/image/${res.body.image}`;

                    Api.getUserReview(this.type, this.id).then((res) => {
                        if (res.status === SUCCESS_STATUS) {
                            res.json().then((res) => {
                                this.data.review = res.body;

                                super.render(root);
                            });
                        } else {
                            this.renderOnNoReview(root);
                        }
                    });
                });
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
            if (parseInt(starIcon.dataset['value']) > this.rating) {
                starIcon.classList.remove('review-form__star-icon_active');
            }
        });
    }

    onStarClick(evt) {
        const starIcon = evt.target;
        this.rating = starIcon.dataset['value'];

        this.toPreviousStars(MAX_RATING, (starIcon) => {
            if (parseInt(starIcon.dataset['value']) > this.rating) {
                starIcon.classList.remove('review-form__star-icon_active');
            }
        });
    }

    toPreviousStars(starValue, func) {
        const rateBlock = document.getElementsByClassName('review-form__rate')[0];
        for (const star of rateBlock.children) {
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

        Api.createReview(this.type, this.id, this.rating, reviewText)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                    });
                } else {
                    console.log('something went wrong');
                }
            });

        this.data.review = {
            rating: this.rating,
            body: reviewText,
        };
        super.render(this.root);
    }

    renderOnNoReview(root) {
        super.render(root);

        for (const starIcon of document.getElementsByClassName('review-form__star-icon')) {
            starIcon.addEventListener('mouseover', this.onStarMouseOver.bind(this));
            starIcon.addEventListener('mouseout', this.onStarMouseOut.bind(this));
            starIcon.addEventListener('click', this.onStarClick.bind(this));
        }

        const submitButton = document.getElementsByClassName('review-form__button')[0];
        submitButton.addEventListener('click', this.onSubmit.bind(this));
    }
}
