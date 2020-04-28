import template from './reviewsComponent.tmpl.xml';
import Component from 'components/component';
import {
    DEFAULT_AVATAR,
    SERVER_ADDRESS,
} from 'libs/constants';

export default class ReviewsComponent extends Component {
    constructor(
        userReviewId = 0,
        reviews = [],
    ) {
        super(template);

        reviews = reviews.map((item) => {
            item.user.image = item.user.image === '' ?
                DEFAULT_AVATAR :
                `${SERVER_ADDRESS}/image/${item.user.image}`;
            return item;
        });

        this.data = {
            userReviewId: userReviewId,
            reviews: reviews,
        };

        this.element = document.createElement('div');
        this.element.classList.add('reviews', 'page-layout');
    }
}
