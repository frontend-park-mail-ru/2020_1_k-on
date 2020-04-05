import template from './reviewsComponent.tmpl.xml';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';
import Component from 'components/component';

const data = [
    {
        username: 'AliceSitedge',
        avatar: '/static/img/avatar.jpg',
        rate: '8',
        text: 'Отличный фильм',
    },
    {
        username: 'AliceSitedge',
        avatar: '/static/img/avatar.jpg',
        rate: '10',
        text: 'Замечательный фильм',
    },
];

export default class ReviewsComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
    }

    render(root) {
        Api.getReviews(this.type, this.id).then((res) => {
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
