import View from 'views/view';
import template from './searchView.tmpl.xml';
import debounce from 'libs/debounce';
import {SEARCH_DELAY, SEARCH_EVENTS, SEARCH_TABS, SUCCESS_STATUS} from 'libs/constants';
import Api from 'libs/api';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import ListComponent from 'components/listComponent/listComponent';

export default class SearchView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this.currentTab = 'all';
        this.currentPage = 1;
        this.data = SEARCH_TABS;
    }

    render(root) {
        super.render(root);

        this.searchInput = document.getElementsByClassName('search-header__input')[0];
        this.searchInput.addEventListener(
            'input',
            debounce(this.onInputChange.bind(this), SEARCH_DELAY)
        );

        for (const searchTab of document.getElementsByClassName('search-tabs__tab')) {
            searchTab.addEventListener('click', this.onTabClick.bind(this));
        }

        this.messageContainer = document.getElementsByClassName('search-header__message')[0];
        this.collectionsContainer = document.getElementById('search-page__collections');
        this.listContainer = document.getElementById('search-page__list');
    }

    onInputChange(evt) {
        if (this.searchInput.value === '') {
            this.clear();
            return;
        }

        if (this.currentTab === 'all') {
            this.searchAll();
        } else {
            this.searchTab();
        }
    }

    onTabClick(evt) {
        const clickedTab = evt.currentTarget;
        if (clickedTab.classList.contains('search-tabs__tab_active')) {
            return;
        }

        this.setTab(clickedTab.dataset.value);
    }

    setTab(value) {
        this.clear();
        this.currentTab = value;

        for (const searchTab of document.getElementsByClassName('search-tabs__tab')) {
            if (searchTab.classList.contains('search-tabs__tab_active')) {
                searchTab.classList.remove('search-tabs__tab_active');
            }
            if (searchTab.dataset.value === value) {
                searchTab.classList.add('search-tabs__tab_active');
            }
        }

        if (this.searchInput.value === '') {
            return;
        }

        if (value === 'all') {
            this.searchAll();
        } else {
            this.searchTab();
        }
    }

    searchAll() {
        const searchText = this.searchInput.value;

        const searchPromise = (type) => {
            return Api.doSearch(type, searchText, 1)
                .then((res) => {
                    if (res.status === SUCCESS_STATUS) {
                        return res.json();
                    } else {
                        return Promise.reject(res);
                    }
                })
                .then((res) => {
                    if (!res.body) {
                        return null;
                    }

                    const cards = res.body.map((cardItem) => {
                        const card = type === 'persons' ?
                            new CardComponent({
                                type: 'persons',
                                id: cardItem.id,
                                image: cardItem.image,
                                russianName: cardItem.name,
                            }) :
                            new CardComponent(cardItem);
                        return card.render();
                    });

                    return new CollectionComponent({
                        name: type === 'series' ? 'Сериалы' :
                            type === 'films' ? 'Фильмы' : 'Актеры',
                        elements: cards,
                        isSearchResult: true,
                        type: type,
                    }).render();
                });
        };

        Promise.all([
            searchPromise('series'),
            searchPromise('films'),
            searchPromise('persons'),
        ])
            .then((results) => {
                this.clear();
                const isEmpty = !results.some((elem) => {
                    return elem;
                });

                if (isEmpty) {
                    this.messageContainer.innerText = 'По вашему запросу ничего не найдено.';
                    return;
                }

                this.messageContainer.innerText = 'Результаты поиска:';
                results.map((collection) => {
                    if (collection) {
                        this.collectionsContainer.appendChild(collection);

                        const showAllButton = collection
                            .getElementsByClassName('collection__show-all-button')[0];
                        showAllButton.addEventListener('click', (evt) => {
                            this.setTab(evt.currentTarget.dataset.type);
                        });
                    }
                });
            })
            .catch((err) => {
                this.eventBus.publish(SEARCH_EVENTS.internalError, err.status);
                console.error(`${err.status}: FAILED TO GET SEARCH RESULTS`);
            });
    }

    searchTab() {
        Api.doSearch(
            this.currentTab,
            this.searchInput.value,
            1
        )
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.clear();

                if (!res.body) {
                    this.messageContainer.innerText = 'По вашему запросу ничего не найдено.';
                    return;
                }

                const cards = res.body.map((cardItem) => {
                    const card = this.currentTab === 'persons' ?
                        new CardComponent({
                            type: 'persons',
                            id: cardItem.id,
                            image: cardItem.image,
                            russianName: cardItem.name,
                        }) :
                        new CardComponent(cardItem);
                    return card.render();
                });

                this.messageContainer.innerText = 'Результаты поиска:';

                const list = new ListComponent(cards);
                this.listContainer.appendChild(list.render());
            })
            .catch((err) => {
                this.eventBus.publish(SEARCH_EVENTS.internalError, err.status);
                console.error(`${err.status}: FAILED TO GET SEARCH RESULTS`);
            });
    }

    clear() {
        this.messageContainer.innerText = '';
        this.collectionsContainer.innerHTML = '';
        this.listContainer.innerHTML = '';
    }
}
