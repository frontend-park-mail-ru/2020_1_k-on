import Component from 'components/component';
import template from './reviewsComponent.tmpl.xml';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';

export default class ReviewsComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
    }

    render(root) {
        this.data = {};

        Api.getReviews(this.type, this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data = res.body;
                    super.render(root);
                });
            } else {
                super.render(root);
                console.log('something went wrong');
            }
        });
    }

    setId(id) {
        this.id = id;
    }
}
