import Component from 'components/component';
import template from './shareComponent.tmpl.xml';

export default class ShareComponent extends Component {
    constructor() {
        super(template);

        this.element = document.createElement('div');
        this.element.classList.add('share-button-block', 'page-layout');
    }

    afterRender() {
        const shareButton = this.element.firstElementChild;
        shareButton.addEventListener('click', this.share.bind(this));
    }

    share(evt) {
        navigator.share({
            title: '',
            text: '',
            url: window.location.href,
        });
    }
}
