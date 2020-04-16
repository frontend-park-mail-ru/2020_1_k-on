export default class ListComponent {
    constructor(root) {
        this.root = root;
    }

    render(elements) {
        const elem = document.createElement('div');

        if (elements) {
            elem.classList.add('list-component');
            elements.forEach((item) => (elem.appendChild(item)));
        } else {
            elem.classList.add('list-component__no-results');
            elem.innerText = 'По данному запросу ничего не найдено.';
        }

        this.root.innerHTML = '';
        this.root.appendChild(elem);
    }
}
