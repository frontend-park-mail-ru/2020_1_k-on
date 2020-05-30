import Component from 'components/component';
import template from './addToListComponent.tmpl.xml';
import Api from 'libs/api';
import {
    SHOW_MSG_TIMEOUT,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class AddToListComponent extends Component {
    constructor(
        type = 'films',
        id = 1,
        playlists = null
    ) {
        super(template);

        this.type = type;
        this.id = id;
        if (playlists) {
            this.chosenPlaylist = {
                id: playlists[0].id,
                name: playlists[0].name,
            };
        } else {
            this.chosenPlaylist = null;
        }

        this.data = {
            type: type,
            id: id,
            playlists: playlists,
            chosenPlaylist: this.chosenPlaylist,
        };

        this.element = document.createElement('div');
        this.element.classList.add('add-to-list', 'reviews', 'page-layout');
    }

    afterRender() {
        if (!this.data.playlists) {
            return;
        }

        const chooseListButton = this.element
            .getElementsByClassName('choose-list-button')[0];
        chooseListButton.addEventListener('click', this.onChooseListButtonClick.bind(this));

        const addToListButton = this.element
            .getElementsByClassName('add-to-list-button')[0];
        addToListButton.addEventListener('click', this.onAddToListButtonClick.bind(this));

        const chooseListBlock = this.element
            .getElementsByClassName('choose-list-block')[0];
        chooseListBlock.addEventListener('click', this.onListChoose.bind(this));
    }

    onChooseListButtonClick(evt) {
        const button = evt.currentTarget;

        button.classList.contains('choose-list-button_active') ?
            this.closeList(button) : this.openList(button);
    }

    openList(chooseListButton) {
        const addToListButton = chooseListButton.nextElementSibling;
        const chooseListBlock = chooseListButton.parentNode.nextElementSibling;

        chooseListButton.classList.add('choose-list-button_active');
        addToListButton.classList.add('add-to-list-button_hidden');
        chooseListBlock.classList.add('choose-list-block_visible');
    }

    closeList(chooseListButton) {
        const addToListButton = chooseListButton.nextElementSibling;
        const chooseListBlock = chooseListButton.parentNode.nextElementSibling;

        chooseListButton.classList.remove('choose-list-button_active');
        addToListButton.classList.remove('add-to-list-button_hidden');
        chooseListBlock.classList.remove('choose-list-block_visible');
    }

    onAddToListButtonClick() {
        Api.addFilmToPlaylist(
            this.chosenPlaylist.id,
            this.type,
            this.id,
        )
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.deletePlaylist(this.chosenPlaylist.id);
                    this.showMessage('Добавлено!');
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                this.showMessage('Не удалось добавить в плейлист', true);
                console.error(err.status);
            });
    }

    showMessage(text, isError = false) {
        const resultMessage = this.element.getElementsByClassName('result-message')[0];

        resultMessage.innerText = text;
        resultMessage.classList.add('result-message_visible');
        if (isError) {
            resultMessage.classList.add('result-message_error');
        } else {
            resultMessage.classList.remove('result-message_error');
        }

        setTimeout(() => {
            resultMessage.classList.remove('result-message_visible');
        }, SHOW_MSG_TIMEOUT);
    }

    deletePlaylist(id) {
        const elementIndex = this.data.playlists.findIndex((element, index, array) => {
            return element.id === parseInt(id);
        });

        this.data.playlists.splice(elementIndex, 1);
        if (this.data.playlists.length !== 0) {
            this.chosenPlaylist = this.data.playlists[0];
            this.data.chosenPlaylist = this.data.playlists[0];
        } else {
            this.data.playlists = null;
        }

        this.element.innerHTML = this.tmpl(this.data);
        this.afterRender();
    }

    onListChoose(evt) {
        const playlistElement = evt.target.closest('div');
        if (!playlistElement.classList.contains('choose-list-block__playlist')) {
            return;
        }

        const playlistLink = playlistElement.firstElementChild;
        this.chosenPlaylist = {
            id: playlistLink.dataset.id,
            name: playlistLink.innerText,
        };

        const chooseListButton = this.element
            .getElementsByClassName('choose-list-button')[0];
        chooseListButton.firstElementChild.innerText = playlistLink.innerText;
        this.closeList(chooseListButton);
    }
}
