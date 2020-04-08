import View from 'views/view';
import template from './internalErrorView.tmpl.xml';

export default class InternalErrorView extends View {
    constructor() {
        super(template);
    }

    render(root, code) {
        this.root = root;
        this.data = {
            code: code,
        };
        this.setRandomBackgroundImg();
        super.render(this.root);
        this.afterRender();
    }

    afterRender() {
        const refreshButton = this.root.getElementsByClassName(
            'internal-error__btn'
        )[0];
        refreshButton.addEventListener('click', () => location.reload());
    }
}
