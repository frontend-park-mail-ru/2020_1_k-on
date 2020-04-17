import template from './reviewsComponent.tmpl.xml';
import Api from 'libs/api';
import {DEFAULT_AVATAR, SUCCESS_STATUS} from 'libs/constants';

export default class ReviewsComponent {
    constructor(type) {
        this.tmpl = template;
        this.type = type;
    }

    render(root) {
        this.root = root;
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
                        this.root.innerHTML += this.tmpl(this.data);
                    });
                } else {
                    this.root.innerHTML += this.tmpl(this.data);
                    console.log('something went wrong');
                }
            });
        });
    }

    setId(id) {
        this.id = id;
    }
}
