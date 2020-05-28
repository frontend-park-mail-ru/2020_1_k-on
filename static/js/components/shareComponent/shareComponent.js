import Component from 'components/component';
import template from './shareComponent.tmpl.xml';
import {HOST_ADDRESS, SERVER_ADDRESS} from "libs/constants";

export default class ShareComponent extends Component {
    constructor(
        shareType = 'all',
        title = '',
        text = '',
        image = ''
    ) {
        super(template);
        this.data = shareType;

        this.shareData = {
            title: title,
            text: text,
            image: image,
        };

        this.element = document.createElement('div');
        this.element.classList.add('share-button-block', 'page-layout');
    }

    afterRender() {
        const shareButton = this.element.firstElementChild;

        this.data === 'vk' ? shareButton.addEventListener('click', this.shareVk.bind(this)) :
            shareButton.addEventListener('click', this.share.bind(this));
    }

    shareVk(evt) {
        console.log(`https://vk.com/share.php?url=${window.location.href}&title=${this.shareData.title}&image=${HOST_ADDRESS}${this.shareData.image}`);
        window.location = `https://vk.com/share.php?url=${window.location.href}?share=${this.shareData.image}&title=${this.shareData.title}`;
    }

    share(evt) {
        navigator.share({
            title: this.shareData.title,
            text: this.shareData.text,
            url: window.location.href,
        });
    }
}
