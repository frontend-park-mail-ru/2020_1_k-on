export default class View {
    constructor(tmpl, eventBus) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
        this.eventBus = eventBus;
    }

    render(root, data) {
        this.root = root;
        this.element.innerHTML = this.tmpl(data);
        root.innerHTML = '';
        root.appendChild(this.element);
    }

    close() {
        this.element.innerHTML = '';
    }
}
