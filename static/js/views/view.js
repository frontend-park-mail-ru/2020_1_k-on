import {MAX_BG_IMGS} from '../libs/constants';

export default class View {
    constructor(tmpl, eventBus) {
        this.tmpl = tmpl;
        this.eventBus = eventBus;
        this.data = {};
    }

    render(root) {
        this.root = root;
        this.root.innerHTML = this.tmpl(this.data);
    }

    close() {
        this.root.innerHTML = '';
    }

    /**
     * Устанавливает в this.data путь к случайному заднему фону
     */
    setRandomBackgroundImg() {
        const randomNumber = Math.floor(Math.random() * MAX_BG_IMGS) + 1;
        this.data.bg_img_url = `/static/img/background_${randomNumber}.jpg`;
    }
}
