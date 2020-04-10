import Component from 'components/component';
import template from './listComponent.tmpl.xml';
import Api from 'libs/api';
import {DEFAULT_FILTERS, SUCCESS_STATUS} from 'libs/constants';

export default class ListComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
        this.chosenFilters = DEFAULT_FILTERS;
    }

    render(root) {
        Api.getList(this.type, {
            maingenre: this.chosenFilters.genre.reference === '%' ? this.chosenFilters.genre.reference : this.chosenFilters.genre.name,
            year: this.chosenFilters.year.reference,
            order: this.chosenFilters.ordering.reference,
            page: '1',
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        this.data.list = res.body;
                        this.data.type = this.type;
                        super.render(root);
                    });
                } else {
                    console.log('something went wrong');
                }
            });
    }

    changeFilter(filterName, name, reference) {
        this.chosenFilters[filterName] = {
            name: name,
            reference: reference,
        };
        this.render(this.root);
    }

    setDefaultFilters() {
        this.chosenFilters = Object.assign({}, DEFAULT_FILTERS);
    }

    setFilter(filterName, name, reference) {
        this.chosenFilters[filterName] = {
            name: name,
            reference: reference,
        };
    }
}
