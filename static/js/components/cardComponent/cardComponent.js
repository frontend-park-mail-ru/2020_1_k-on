import template from './cardComponent.tmpl.xml';

export default class CardComponent {
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
        this.tmpl = template;
        this.data = {
            type: type,
            id: id,
            image: image,
            russianName: russianName,
            ageLimit: ageLimit,
            year: year,
            country: country,
            mainGenre: mainGenre,
            yearFirst: yearFirst,
            yearLast: yearLast,
        };
    }

    render() {
        const anchor = document.createElement('a');
        anchor.classList.add('series-card');
        anchor.href = `/${this.data.type}/${this.data.id}`;
        anchor.innerHTML += this.tmpl(this.data);

        return anchor;
    }
}
