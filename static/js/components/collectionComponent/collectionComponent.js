import SwiperComponent from 'components/swiperComponent/swiperComponent';

export default class CollectionComponent {
    constructor({
        name = 'collection',
        elements = [],
    } = {}) {
        this.name = name;
        this.elements = elements;
    }

    render() {
        const collection = document.createElement('div');
        collection.classList.add('collection');

        const collectionName = document.createElement('div');
        collectionName.classList.add('collection__header', 'page-layout');
        collectionName.innerText = this.name;

        collection.appendChild(collectionName);

        const swiperComponent = new SwiperComponent(this.elements);
        collection.appendChild(swiperComponent.render());

        return collection;
    }
}
