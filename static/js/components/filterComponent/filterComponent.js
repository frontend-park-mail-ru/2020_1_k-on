import template from './filterComponent.tmpl.xml';
import {LIST_EVENTS} from 'libs/constants';

export default class FilterComponent {
    constructor(filters = {}, eventBus) {
        this.tmpl = template;
        this.eventBus = eventBus;
        this.filters = filters;

        this.filterList = [];
        this.chosenFilters = {};
        Object.keys(filters).forEach((filterName) => {
            this.filterList.push(filterName);
            this.chosenFilters[filterName] = filters[filterName][0];
        });
    }

    render(root) {
        this.root = root;

        this.data = {
            filterList: this.filterList,
            chosenFilters: this.chosenFilters,
            filters: this.filters,
        };

        const elem = document.createElement('div');
        elem.classList.add('filters-block', 'page-layout');
        elem.innerHTML += this.tmpl(this.data);

        this.root.appendChild(elem);

        this.afterRender();
    }

    afterRender() {
        Array.from(document.getElementsByClassName('filter-button'))
            .forEach((elem) => {
                elem.addEventListener(
                    'click',
                    this.onFilterButtonClick.bind(this)
                );
            });

        Array.from(document.getElementsByClassName('filter-submenu'))
            .forEach((elem) => {
                elem.addEventListener(
                    'click',
                    this.onFilterValueClick.bind(this)
                );
            });
    }

    onFilterValueClick(evt) {
        if (!(evt.target instanceof HTMLSpanElement)) {
            return;
        }

        const filterLink = evt.target;
        const submenu = evt.currentTarget;
        const filterButton = submenu.previousElementSibling;
        this.closeFilter(filterButton);

        if (filterLink.classList.contains('filter-submenu__item_active')) {
            return;
        }

        submenu.childNodes.forEach((submenuItem) => {
            submenuItem.firstElementChild.classList.remove(
                'filter-submenu__item_active'
            );
        });
        filterButton.firstElementChild.innerText = filterLink.innerText;
        filterLink.classList.add('filter-submenu__item_active');

        const filterName = submenu.dataset.name;
        const name = filterLink.innerText;
        const reference = filterLink.dataset.reference;

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
    }

    closeFilter(filterButton) {
        const arrow = filterButton.lastElementChild;
        const submenu = filterButton.nextElementSibling;

        filterButton.classList.remove('filter-button_active');
        arrow.classList.remove('filter-button__arrow_active');
        submenu.classList.remove('filter-submenu_active');
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
}
