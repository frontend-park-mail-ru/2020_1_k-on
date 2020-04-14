import View from 'views/view';
import template from './listView.tmpl.xml';
import ListComponent from 'components/listComponent/listComponent';
import FilterComponent from 'components/filterComponent/filterComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import Api from 'libs/api';
import {
    LIST_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class ListView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;

        this.data.category = type === 'series' ? 'Сериалы' : 'Фильмы';

        this.eventBus.subscribe(LIST_EVENTS.updateList, () => {
            this.getList();
        });
        this.eventBus.subscribe(LIST_EVENTS.genrePushHistory, (genreReference) => {
            if (genreReference === '%') {
                window.history.pushState(null, null, `/${this.type}`);
            } else {
                window.history.pushState(null, null,
                    `/${this.type}/${genreReference}`);
            }
        });
    }

    render(root) {
        super.render(root);

        this.listComponent = new ListComponent(document.getElementById('list-container'));

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
                this.filterComponent.render(document.getElementById('filter-container'));

                this.getList();
            })
            .catch((err) => {
                this.eventBus.publish(LIST_EVENTS.internalError, err.status);
            });
    }

    getList() {
        Api.getList(this.type, this.filterComponent.getChosenFilters(), 1)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                res.status === SUCCESS_STATUS ? this.updateList(res.body): this.updateList(null);
            })
            .catch((err) => {
                console.log(err);
                this.eventBus.publish(LIST_EVENTS.internalError, err.status);
            });
    }

    updateList(body) {
        if (body === null) {
            this.listComponent.render(null);
        } else {
            const cards = body.map((item) => {
                const card = new CardComponent(item);
                return card.render();
            });

            this.listComponent.render(cards);
        }
    }

    parseFiltersFromBody(body) {
        const filters = {};

        Object.keys(body).forEach((filterName) => {
            if (filterName === 'year') {
                filters[filterName] = [];
                filters[filterName].push(body[filterName][0]);

                const maxyear = parseInt(body[filterName][1].reference);
                const minyear = parseInt(body[filterName][2].reference);

                for (let year = maxyear; year >= minyear; year--) {
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
}
