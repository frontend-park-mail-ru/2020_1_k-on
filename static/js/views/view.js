export default class View {
    constructor(tmpl) {
        this.element = document.createElement('div');
        this.tmpl = tmpl;
    }

    render(root) {
        this.element.innerHTML = this.tmpl;
        root.innerHTML = '';
        root.appendChild(this.element);
    }
}
