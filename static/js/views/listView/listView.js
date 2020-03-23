import View from '../view';
import template from './listView.tmpl.xml';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';
import ListComponent from '../../components/listComponent/listComponent';

const data = {
    filters: {
        genre: [
            {
                name: 'Все жанры',
                reference: 'all',
            },
            {
                name: 'Анимация',
                reference: 'all',
            },
            {
                name: 'Биографические',
                reference: 'all',
            },
            {
                name: 'Боевики',
                reference: 'all',
            },
            {
                name: 'Военные',
                reference: 'all',
            },
            {
                name: 'Детективы',
                reference: 'all',
            },
            {
                name: 'Документальные',
                reference: 'all',
            },
            {
                name: 'Драмы',
                reference: 'all',
            },
            {
                name: 'Исторические',
                reference: 'all',
            },
            {
                name: 'Комедии',
                reference: 'all',
            },
            {
                name: 'Криминал',
                reference: 'all',
            },
            {
                name: 'Мелодрамы',
                reference: 'all',
            },
        ],
        year: [
            {
                name: 'Все годы',
                reference: 'all',
            },
            {
                name: '2020',
                reference: '2020',
            },
            {
                name: '2019',
                reference: '2019',
            },
            {
                name: '2018',
                reference: '2018',
            },
            {
                name: '2017',
                reference: '2017',
            },
            {
                name: '2016',
                reference: '2016',
            },
            {
                name: '2015',
                reference: '2015',
            },
        ],
    },
};

export default class ListView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;

        this.data = {};
        this.data.type = type;
        this.data.category = type === 'series' ? 'Сериалы' : 'Фильмы';
        this.data.filtersList = [
            'genre',
            'year',
            'ordering',
        ];
        this.listComponent = new ListComponent(this.type);
    }

    render(root) {
        Api.getFilters().then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                });
            } else {
                console.log('something went wrong');
            }
        });

        this.data.filters = data.filters;
        this.data.filters.ordering = [
            {
                name: 'По рейтингу',
                reference: 'rating',
            },
            {
                name: 'По новизне',
                reference: 'novelty',
            },
            {
                name: 'По рейтингу IMDb',
                reference: 'imdbRating',
            },
        ];
        super.render(root);

        for (const filterButton of document.getElementsByClassName('filter-button')) {
            filterButton.addEventListener(
                'click',
                this.onFilterButtonClick.bind(this)
            );
        }

        for (const filterSubmenu of document.getElementsByClassName('filter-submenu')) {
            filterSubmenu.addEventListener(
                'click',
                this.onFilterValueClick.bind(this)
            );
        }

        this.listComponent.setDefaultFilters();
        const listContainer = document.getElementById('listContainer');
        this.listComponent.render(listContainer);
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
        this.listComponent.changeFilter(
            filterName,
            filterLink.innerText,
            filterLink.dataset.reference
        );
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
}
