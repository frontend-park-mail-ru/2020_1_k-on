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
        const linkString = `https://vk.com/share.php?url=${window.location.href}?share=${this.shareData.image}&title=${this.shareData.title}`;
        window.location = linkString;
    }

    share(evt) {
        navigator.share({
            url: `${window.location.href}?share=${this.shareData.image}&title=${this.shareData.title}&description=${this.shareData.text}`,
        });
    }
}
