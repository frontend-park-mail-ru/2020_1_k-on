import template from './userReviewComponent.tmpl.xml';
import Component from 'components/component';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';

const data = {
    user: {
        username: 'AliceSitedge',
        avatar: '/static/img/avatar.jpg',
    }
};

export default class UserReviewComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
    }

    render(root) {
        Api.getUserReview(this.type, this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                });
            } else {
                console.log('something went wrong');
            }
        });

        this.data = data;
        super.render(root);
    }

    setId(id) {
        this.id = id;
    }
}
