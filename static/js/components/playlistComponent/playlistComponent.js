import Component from 'components/component';
import template from './playlistComponent.tmpl.xml';
import EventBus from 'libs/eventBus';
import Api from 'libs/api';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import TabComponent from 'components/tabComponent/tabComponent';
import FormComponent from 'components/formComponent/formComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import ListComponent from 'components/listComponent/listComponent';
import {
    PLAYLIST_EVENTS,
    PROFILE_EVENTS,
    SUCCESS_STATUS,
    TAB_ADD_INPUTS,
    BAD_REQUEST_STATUS,
    PROFILE_MSGS,
} from 'libs/constants';

export default class PlaylistComponent extends Component {
    constructor(tabList = [], globalEventBus = new EventBus()) {
        super(template, new EventBus());

        this.globalEventBus = globalEventBus;

        this.eventBus.subscribe(PLAYLIST_EVENTS.clickTab, this.onTabClick.bind(this));
        this.eventBus.subscribe(PLAYLIST_EVENTS.deleteTab, this.onDeleteTab.bind(this));
        this.eventBus.subscribe(PLAYLIST_EVENTS.deleteCard, this.onDeleteCard.bind(this));

        this.tabList = tabList;

        this.listComponent = new ListComponent();

        this.element = document.createElement('div');
        this.element.classList.add('playlist');
    }

    afterRender() {
        this.modalWrapper = this.element.getElementsByClassName('modal-wrapper')[0];
        this.element.getElementsByClassName('modal-form__close')[0]
            .addEventListener('click', this.closeModal.bind(this));

        this.tabAddForm = new FormComponent({
            inputs: TAB_ADD_INPUTS,
            buttonText: 'Создать плейлист',
            onSubmitCallback: this.onTabAddSubmit.bind(this),
        });
        this.element.getElementsByClassName('modal-tab-add-form-container')[0]
            .appendChild(this.tabAddForm.render());

        const addTabElement = document.createElement('div');
        addTabElement.classList.add('tab-add');
        addTabElement.innerText = 'Создать плейлист';
        addTabElement.addEventListener('click', this.openModal.bind(this));

        const tabs = this.tabList.map((item) => {
            const tabComponent = new TabComponent({
                name: item.name,
                id: item.id,
                eventBus: this.eventBus,
            });

            return tabComponent.render();
        });
        tabs.push(addTabElement);
        this.swiperComponent = new SwiperComponent(tabs);
        this.element.getElementsByClassName('tabs-container')[0]
            .appendChild(this.swiperComponent.render());

        this.listContainer = this.element.getElementsByClassName('list-container')[0];
        this.listContainer.appendChild(this.listComponent.render());

        this.setChoosenTab(this.element.getElementsByClassName('tab')[0]);
    }

    onTabClick(tab) {
        if (this.choosenTab === tab) {
            return;
        }

        this.choosenTab?.classList.remove('tab_active');
        this.choosenTab?.getElementsByClassName('tab__delete')[0]
            .classList.remove('tab__delete_active');
        this.setChoosenTab(tab);
    }

    onDeleteTab(tab) {
        Api.deletePlaylist(tab.dataset.id)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    tab.remove();
                    this.setChoosenTab(this.element.getElementsByClassName('tab')[0]);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO DELETE PLAYLIST`);
                this.globalEventBus.publish(
                    PROFILE_EVENTS.showMsg,
                    PROFILE_MSGS.error_playlists_delete,
                    true
                );
            });
    }

    setChoosenTab(tab) {
        if (tab === undefined) {
            return;
        }

        TabComponent.setActive(tab);
        this.choosenTab = tab;
        this.updateList(this.choosenTab.dataset.id);
    }

    updateList(id) {
        Api.getPlaylistContent(id)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                res.body.films = res.body.films === null ? [] : res.body.films;
                res.body.series = res.body.series === null ? [] : res.body.series;
                const cards = res.body.films.concat(res.body.series).map((item) => {
                    item.isRemovable = true;
                    item.eventBus = this.eventBus;
                    const card = new CardComponent(item);
                    return card.render();
                });

                this.listComponent.setElements(cards);
            })
            .catch((err) => {
                this.listComponent.setElements(null);
                console.error(`${err.status}: FAILED TO LOAD PLAYLIST DATA`);
                this.globalEventBus.publish(
                    PROFILE_EVENTS.showMsg,
                    PROFILE_MSGS.error_playlists_load,
                    true
                );
            });
    }

    onTabAddSubmit(inputsValue) {
        Api.createPlaylist(inputsValue['tab-add'])
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        this.addTab(res.body.name, res.body.id);
                        this.closeModal();
                    });
                } else if (res.status === BAD_REQUEST_STATUS) {
                    this.showModalError('modal-tab-add', 'Плейлист уже существует');
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO CREATE PLAYLIST`);
                this.globalEventBus.publish(
                    PROFILE_EVENTS.showMsg,
                    PROFILE_MSGS.error_playlists_create,
                    true
                );
            });
    }

    addTab(name, id) {
        const tabComponent = new TabComponent({
            name: name,
            id: id,
            eventBus: this.eventBus,
        });

        this.swiperComponent.insertBeforeLast(tabComponent.render());
    }

    showModalError(modalClassName, errorMsg = 'Error') {
        this.element.getElementsByClassName(modalClassName)[0]
            ?.classList.add('modal-form_error');
        const modalError = this.element.getElementsByClassName('modal-error')[0];
        modalError.innerHTML = errorMsg;
        modalError.style.opacity = '1';
    }

    openModal() {
        this.modalWrapper.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.tabAddForm.clearForm();
        this.element.getElementsByClassName('modal-tab-add')[0]
            .classList.remove('modal-form_error');
        this.element.getElementsByClassName('modal-error')[0].style.opacity = '0';
        this.modalWrapper.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }

    onDeleteCard(card, id, type) {
        type = type === 'films' ? type.slice(0, -1) : type;
        Api.deleteCardFromPlaylist(this.choosenTab.dataset.id, id, type)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    card.remove();
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO DELETE FROM PLAYLIST`);
                this.globalEventBus.publish(
                    PROFILE_EVENTS.showMsg,
                    PROFILE_MSGS.error_delete_from_playlist,
                    true
                );
            });
    }
}
