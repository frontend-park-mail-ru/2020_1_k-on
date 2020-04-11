import Component from 'components/component';
import template from './reviewsComponent.tmpl.xml';
import Api from 'libs/api';
import {DEFAULT_AVATAR, SUCCESS_STATUS} from 'libs/constants';

export default class ReviewsComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
    }

    render(root) {
        this.data = {};

        Api.getUserReview(this.type, this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data.userReviewId = res.body.id;
                });
            } else {
                this.data.userReviewId = 0;
            }

            Api.getReviews(this.type, this.id).then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        if (this.data.userReviewId === 0 || res.body.length !== 1) {
                            this.data.reviews = res.body;
                            this.data.defaultAvatar = DEFAULT_AVATAR;
                        }
                        super.render(root);
                    });
                } else {
                    super.render(root);
                    console.log('something went wrong');
                }
            });
        });
    }

    setId(id) {
        this.id = id;
    }
}
