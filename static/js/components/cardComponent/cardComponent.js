import template from './cardComponent.tmpl.xml';

export default class CardComponent {
    constructor({
        type = 'films',
        id = '1',
        image = '',
        russianName = 'Name',
        ageLimit = 0,
        year = 0,
        country = 'Russia',
        mainGenre = 'genre',
        yearFirst = 0,
        yearLast = 0,
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
