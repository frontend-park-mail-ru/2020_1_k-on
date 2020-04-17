import Component from 'components/component';

export default class ListComponent extends Component {
    constructor(elements = []) {
        super();

        this.elements = elements;

        this.element = document.createElement('div');
    }

    setElements(elements) {
        this.elements = elements;
    }

    afterRender() {
        if (this.elements) {
            this.element.classList.add('list-component');
            this.elements.forEach((item) => (this.element.appendChild(item)));
        } else {
            this.element.classList.add('list-component__no-results');
            this.element.innerText = 'По данному запросу ничего не найдено.';
        }
    }
}
