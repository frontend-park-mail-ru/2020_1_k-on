import View from 'views/view';
import template from './searchView.tmpl.xml';
import debounce from 'libs/debounce';
import {
    PAGINATOR_EVENTS,
    SEARCH_DELAY,
    SEARCH_EVENTS,
    SEARCH_SWIPER_LIMIT,
    SEARCH_TABS,
    SUCCESS_STATUS,
} from 'libs/constants';
import Api from 'libs/api';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import ListComponent from 'components/listComponent/listComponent';
import PaginatorComponent from 'components/paginatorComponent/paginatorComponent';

export default class SearchView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this.currentTab = 'all';
        this.data = SEARCH_TABS;

        this.eventBus.subscribe(PAGINATOR_EVENTS.updatePage, this.updateList.bind(this));
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
        this.paginatorContainer = document.getElementById('search-page__paginator');
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

                    const cards = res.body.slice(0, SEARCH_SWIPER_LIMIT).map((cardItem) => {
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
                    }
                });

                for (const showAllButton of this.collectionsContainer
                    .getElementsByClassName('collection__show-all-button')) {
                    showAllButton.addEventListener('click', (evt) => {
                        this.setTab(evt.currentTarget.dataset.type);
                    });
                }
            })
            .catch((err) => {
                this.eventBus.publish(SEARCH_EVENTS.internalError, err.status);
                console.error(`${err.status}: FAILED TO GET SEARCH RESULTS`);
            });
    }

    searchTab() {
        this.clear();

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
                if (!res.body) {
                    this.messageContainer.innerText = 'По вашему запросу ничего не найдено.';
                    return;
                }

                this.paginatorComponent = new PaginatorComponent(this.eventBus);
                this.paginatorContainer.appendChild(this.paginatorComponent.render());

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

                this.listComponent = new ListComponent(cards);
                this.listContainer.appendChild(this.listComponent.render());

                this.messageContainer.innerText = 'Результаты поиска:';
            })
            .catch((err) => {
                this.eventBus.publish(SEARCH_EVENTS.internalError, err.status);
                console.error(`${err.status}: FAILED TO GET SEARCH RESULTS`);
            });
    }

    updateList(page = 1) {
        Api.doSearch(
            this.currentTab,
            this.searchInput.value,
            page
        )
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                if (page === 1 || res.body) {
                    this.paginatorComponent.setIsLastPage(false);
                    this.paginatorComponent.setPage(page);
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

                    this.listComponent.setElements(cards);
                } else {
                    this.paginatorComponent.setIsLastPage(true);
                }
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
        this.paginatorContainer.innerHTML = '';
    }
}
