export default class View {
    constructor(tmpl, eventBus) {
        this.tmpl = tmpl;
        this.eventBus = eventBus;
    }

    render(root, data) {
        this.root = root;
        this.root.innerHTML = this.tmpl(data);
    }

    close() {
        this.root.innerHTML = '';
    }
}
