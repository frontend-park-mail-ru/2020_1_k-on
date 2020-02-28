export default class View {
    constructor(tmpl) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
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
