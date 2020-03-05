export default class View {
    constructor(tmpl, eventBus) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
        this.eventBus = eventBus;
    }

    render(root, data) {
        this.root = root;
        root.innerHTML = this.tmpl(data);
    }

    close() {
        this.element.innerHTML = '';
    }
}
