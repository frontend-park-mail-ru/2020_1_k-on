import View from 'views/view';
import template from './errorView.tmpl.xml';
import {
    INTERNAL_ERROR_MSG,
    INTERNAL_ERROR_STATUS,
} from 'libs/constants';

export default class ErrorView extends View {
    constructor() {
        super(template);
    }

    /**
     * Выполняет рендер view
     * @param {HTMLElement} root
     * @param {int} code - код ошибки
     * @param {string} msg - сообщение
     */
    render(root, code=INTERNAL_ERROR_STATUS, msg=INTERNAL_ERROR_MSG) {
        this.root = root;
        this.data = {
            code: code,
            msg: msg,
        };
        this.setRandomBackgroundImg();
        super.render(this.root);
        this.afterRender();
    }

    afterRender() {
        const refreshButton = this.root.getElementsByClassName('internal-error__btn')[0];
        refreshButton.addEventListener('click', () => location.pathname = '/');
    }
}
