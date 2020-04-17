import {
    MAX_BG_IMGS,
    BG_IMG_KEY,
} from 'libs/constants';

export default class View {
    constructor(tmpl, eventBus = null) {
        this.tmpl = tmpl;
        this.eventBus = eventBus;
        this.data = {};
    }

    render(root) {
        this.root = root;
        this.root.innerHTML = this.tmpl(this.data);
        window.scrollTo(0, 0);
    }

    close() {
        this.root.innerHTML = '';
    }

    /**
     * Устанавливает номер случайного заднего фона в sessionStorage
     */
    static setBgImgInSessionStorage() {
        const randomNumber = Math.floor(Math.random() * MAX_BG_IMGS) + 1;
        window.sessionStorage.setItem(BG_IMG_KEY, randomNumber.toString());
    }

    /**
     * Устанавливает в this.data путь к случайному заднему фону
     */
    setRandomBackgroundImg() {
        const bgImageNumber = window.sessionStorage.getItem(BG_IMG_KEY);
        if (bgImageNumber === null) {
            View.setBgImgInSessionStorage();
        }

        this.data.bg_img_url = `/static/img/background_${bgImageNumber}.jpg`;
    }
}
