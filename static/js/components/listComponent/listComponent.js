export default class ListComponent {
    constructor(root) {
        this.root = root;
    }

    render(elements) {
        let elem;

        if (elements) {
            elem = document.createElement('div');
            elem.classList.add('list-component');
            elements.forEach((item) => (elem.appendChild(item)));
        } else {
            elem = document.createElement('div');
            elem.classList.add('list-component__no-results');
            elem.innerText = 'По данному запросу ничего не найдено.';
        }

        this.root.innerHTML = '';
        this.root.appendChild(elem);
    }
}
