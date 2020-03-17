import {MAX_BG_IMGS} from '../libs/constants';
import {BG_IMG_KEY} from '../libs/constants';

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
     * Устанавливает url к случайному заднему фону в sessionStorage
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
            console.log(`There is no key - ${BG_IMG_KEY} in sessionStorage`);
        } else {
            this.data.bg_img_url =
                `/static/img/background_${bgImageNumber}.jpg`;
        }
    }
}
