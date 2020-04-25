import template from './userReviewComponent.tmpl.xml';
import Api from 'libs/api';
import {MAX_RATING, SUCCESS_STATUS} from 'libs/constants';
import Component from 'components/component';

export default class UserReviewComponent extends Component {
    constructor(
        type = 'films',
        id = '1',
        user = null,
        review = null
    ) {
        super(template);

        this.data = {
            review: review,
            user: user,
        };

        this.type = type;
        this.id = id;
        this.rating = 0;

        this.element = document.createElement('div');
        this.element.classList.add('reviews', 'page-layout');
    }

    afterRender() {
        if (this.data.review) {
            return;
        }

        Array.from(this.element.getElementsByClassName('review-form__star-icon')).forEach(
            (starIcon) => {
                starIcon.addEventListener('mouseover', this.onStarMouseOver.bind(this));
                starIcon.addEventListener('mouseout', this.onStarMouseOut.bind(this));
                starIcon.addEventListener('click', this.onStarClick.bind(this));
            });

        const submitButton = this.element.getElementsByClassName('review-form__button')[0];
        submitButton.addEventListener('click', this.onSubmit.bind(this));
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
        if (!reviewText || this.rating === 0) {
            this.showError();
            return;
        }

        this.hideError();

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
        this.element.innerHTML = this.tmpl(this.data);
    }

    showError() {
        const error = document.getElementsByClassName('review-form__error')[0];
        error.classList.add('review-form__error_shown');
    }

    hideError() {
        const error = document.getElementsByClassName('review-form__error')[0];
        error.classList.remove('review-form__error_shown');
    }
}
