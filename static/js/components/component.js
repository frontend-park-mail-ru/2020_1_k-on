export default class Component {
    constructor(template) {
        this.tmpl = template;
        this. data = {};
    }

    render(root) {
        this.root = root;
        this.root.innerHTML = this.tmpl(this.data);
    }
}
