import View from 'views/view';
import template from './listView.tmpl.xml';
import Api from 'libs/api';
import ListComponent from 'components/listComponent/listComponent';
import FilterComponent from 'components/filterComponent/filterComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import PaginatorComponent from 'components/paginatorComponent/paginatorComponent';
import {
    LIST_EVENTS,
    PAGINATOR_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class ListView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;

        this.data.category = type === 'series' ? 'Сериалы' : 'Фильмы';

        this.eventBus.subscribe(LIST_EVENTS.updateList, this.getList.bind(this));
        this.eventBus.subscribe(PAGINATOR_EVENTS.updatePage, this.getList.bind(this));
        this.eventBus.subscribe(LIST_EVENTS.genrePushHistory, this.updateHistory.bind(this));

        this.isFirstRender = true;
    }

    render(root) {
        super.render(root);

        this.listContainer = document.getElementById('list-container');
        this.listComponent = new ListComponent();
        this.listContainer.appendChild(this.listComponent.render());

        Api.getFilters(this.type)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.filterComponent = new FilterComponent(
                    this.parseFiltersFromBody(res.body),
                    this.eventBus,
                );
                this.parseQuery();
                document.getElementById('filter-container')
                    .appendChild(this.filterComponent.render());

                this.getList();
            })
            .catch((err) => {
                this.eventBus.publish(LIST_EVENTS.internalError, err.status);
            });
    }

    getList(page = 1) {
        Api.getList(this.type, this.filterComponent.getChosenFilters(), page)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                if (page === 1 || res.body !== null) {
                    this.updateList(res.body);
                    if (this.isFirstRender) {
                        this.isFirstRender = false;
                        this.paginatorComponent = new PaginatorComponent(this.eventBus);
                        this.root.appendChild(this.paginatorComponent.render());
                    }
                    this.paginatorComponent.setIsLastPage(false);
                    this.paginatorComponent.setPage(page);
                } else {
                    this.paginatorComponent.setIsLastPage(true);
                }
            })
            .catch((err) => {
                console.error(`${err.url} ${err.status}: FAILED TO UPLOAD`);
            });
    }

    updateList(body) {
        if (body === null) {
            this.listComponent.setElements(null);
        } else {
            const cards = body.map((item) => {
                const card = new CardComponent(item);
                return card.render();
            });

            this.listComponent.setElements(cards);
        }
    }

    parseFiltersFromBody(body) {
        const filters = {};

        Object.keys(body).forEach((filterName) => {
            if (filterName === 'year') {
                filters[filterName] = [];
                filters[filterName].push(body[filterName][0]);

                const maxYear = parseInt(body[filterName][1].reference);
                const minYear = parseInt(body[filterName][2].reference);

                for (let year = maxYear; year >= minYear; year--) {
                    filters[filterName].push({name: year, reference: year});
                }
            } else {
                filters[filterName] = body[filterName];
            }
        });

        return filters;
    }

    parseQuery() {
        const genre = location.pathname.split('/').pop();

        if (genre !== this.type) {
            this.filterComponent.setFilterIfExists('genre', genre);
        }
    }

    updateHistory(genreReference) {
        const url = genreReference === '%' ? `/${this.type}` : `/${this.type}/${genreReference}`;
        window.history.pushState(null, null, url);
    }

    close() {
        this.isFirstRender = true;
        super.close();
    }
}
