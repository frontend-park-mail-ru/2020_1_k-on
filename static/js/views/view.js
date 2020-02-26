export default class View {
    constructor() {
        this.element = document.createElement('div');
        this.tmpl = '';
    }

    render(root) {
        this.element.innerHTML = this.tmpl;
        root.innerHTML = '';
        root.appendChild(this.element);
    }
}
