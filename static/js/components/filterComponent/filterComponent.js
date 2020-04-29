import Component from 'components/component';
import template from './filterComponent.tmpl.xml';
import {LIST_EVENTS} from 'libs/constants';

export default class FilterComponent extends Component {
    constructor(filters = {}, eventBus = null) {
        super(template, eventBus);

        this.filters = filters;
        this.filterList = [];
        this.chosenFilters = {};
        Object.keys(filters).forEach((filterName) => {
            this.filterList.push(filterName);
            this.chosenFilters[filterName] = filters[filterName][0];
        });

        this.data = {
            filterList: this.filterList,
            chosenFilters: this.chosenFilters,
            filters: this.filters,
            filtersHeadlines: {
                genre: 'Выбор жанра',
                year: 'Выбор года',
                order: 'Выбор рейтинга',
            },
        };

        this.element = document.createElement('div');
        this.element.classList.add('filters-block', 'page-layout');
    }

    afterRender() {
        for (const elem of this.element.getElementsByClassName('filter-button')) {
            elem.addEventListener('click', this.onFilterButtonClick.bind(this)
            );
        }

        for (const elem of this.element.getElementsByClassName('filter-submenu__list')) {
            elem.addEventListener('click', this.onFilterValueClick.bind(this));
        }

        for (const elem of this.element.getElementsByClassName('filter-submenu__close-icon')) {
            elem.addEventListener('click', this.onCloseIconClick.bind(this));
        }
    }

    onFilterValueClick(evt) {
        if (!(evt.target instanceof HTMLSpanElement)) {
            return;
        }

        const filterLink = evt.target;
        const submenuList = evt.currentTarget;
        const filterButton = submenuList.parentNode.previousElementSibling;
        this.closeFilter(filterButton);

        if (filterLink.classList.contains('filter-submenu__item_active')) {
            return;
        }

        submenuList.childNodes.forEach((submenuItem) => {
            submenuItem.firstElementChild.classList.remove(
                'filter-submenu__item_active'
            );
        });
        filterButton.firstElementChild.innerText = filterLink.innerText;
        filterLink.classList.add('filter-submenu__item_active');

        const filterName = submenuList.dataset.name;
        const name = filterLink.innerText;
        const reference = filterLink.dataset.reference;

        if (filterName === 'genre') {
            this.eventBus.publish(LIST_EVENTS.genrePushHistory, filterLink.dataset.reference);
        }

        this.setFilter(filterName, name, reference);

        this.eventBus.publish(LIST_EVENTS.updateList);
    }

    onFilterButtonClick(evt) {
        const filterButton = evt.currentTarget;
        const submenu = filterButton.nextElementSibling;
        if (getComputedStyle(submenu).visibility === 'hidden') {
            for (const filterButton of document.getElementsByClassName('filter-button')) {
                this.closeFilter(filterButton);
            }

            this.openFilter(filterButton);

            const navbarMenu = document.getElementsByClassName('navbar-menu')[0];
            navbarMenu.classList.remove('navbar-menu_active');
        } else {
            this.closeFilter(filterButton);
        }
    }

    openFilter(filterButton) {
        const arrow = filterButton.lastElementChild;
        const submenu = filterButton.nextElementSibling;

        filterButton.classList.add('filter-button_active');
        arrow.classList.add('filter-button__arrow_active');
        submenu.classList.add('filter-submenu_active');

        document.body.classList.add('no-scroll-mobile');
    }

    closeFilter(filterButton) {
        const arrow = filterButton.lastElementChild;
        const submenu = filterButton.nextElementSibling;

        filterButton.classList.remove('filter-button_active');
        arrow.classList.remove('filter-button__arrow_active');
        submenu.classList.remove('filter-submenu_active');

        document.body.classList.remove('no-scroll-mobile');
    }

    setFilter(filterName, name, reference) {
        this.chosenFilters[filterName] = {
            name: name,
            reference: reference,
        };
    }

    setFilterIfExists(filterName, reference) {
        if (filterName in this.filters) {
            this.filters[filterName].forEach((filter) => {
                if (filter.reference === reference) {
                    this.setFilter(filterName, filter.name, reference);
                }
            });
        }
    }

    getChosenFilters() {
        return this.chosenFilters;
    }

    onCloseIconClick(evt) {
        const filterButton = evt.target.parentNode.parentNode.previousElementSibling;
        this.closeFilter(filterButton);
    }
}
