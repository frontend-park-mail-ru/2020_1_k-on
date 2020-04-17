import SwiperComponent from 'components/swiperComponent/swiperComponent';
import Component from 'components/component';
import template from './collectionComponent.tmpl.xml';

export default class CollectionComponent extends Component {
    constructor({
        name = 'collection',
        elements = [],
    } = {}) {
        super(template);

        this.data = {
            name: name,
        };

        this.elements = elements;

        this.element = document.createElement('div');
        this.element.classList.add('collection');
    }

    afterRender() {
        const swiperComponent = new SwiperComponent(this.elements);
        this.element.appendChild(swiperComponent.render());
    }
}
