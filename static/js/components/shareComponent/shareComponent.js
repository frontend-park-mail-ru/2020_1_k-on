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
            image: image.split('/').pop(),
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
        const linkString = `https://vk.com/share.php?url=${window.location.href}&title=${this.shareData.title}&image=${HOST_ADDRESS}/static/img/${this.shareData.image}`;
        window.location = linkString;
    }

    share(evt) {
        navigator.share({
            title: this.shareData.title,
            url: `${window.location.href}?share=${this.shareData.image}&description=${this.shareData.title}`,
        });
    }
}
