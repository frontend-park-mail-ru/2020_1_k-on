import template from './reviewsComponent.tmpl.xml';
import Api from 'libs/api';
import {DEFAULT_AVATAR, SUCCESS_STATUS} from 'libs/constants';
import Component from 'components/component';

export default class ReviewsComponent extends Component {
    constructor(
        userReviewId = 0,
        reviews = null,
    ) {
        super(template);

        this.data = {
            userReviewId: userReviewId,
            reviews: reviews,
            defaultAvatar: DEFAULT_AVATAR
        };

        this.element = document.createElement('div');
        this.element.classList.add('reviews', 'page-layout');
    }
}
