const doNothing = () => ('');

export default class Component {
    constructor(template = doNothing, eventBus = null) {
        this.tmpl = template;
        this.eventBus = eventBus;
        this.data = {};
    }

    render() {
        this.element.innerHTML = this.tmpl(this.data);

        this.afterRender();

        return this.element;
    }

    afterRender() {
    }
}
