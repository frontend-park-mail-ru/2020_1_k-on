import Component from 'components/component';
import template from './cardComponent.tmpl.xml';

export default class CardComponent extends Component {
    constructor({
        type = 'films',
        id = '1',
        image = '',
        russianName = null,
        ageLimit = 0,
        year = null,
        country = null,
        mainGenre = null,
        yearFirst = null,
        yearLast = null,
    } = {}) {
        super(template);

        this.id = id;

        this.data = {
            type: type,
            image: image,
            russianName: russianName,
            ageLimit: ageLimit,
            year: year,
            country: country,
            mainGenre: mainGenre,
            yearFirst: yearFirst,
            yearLast: yearLast,
        };

        this.element = document.createElement('a');
        this.element.classList.add('series-card');
        this.element.href = `/${this.data.type}/${this.id}`;
    }
}
