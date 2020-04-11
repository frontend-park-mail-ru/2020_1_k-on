import View from 'views/view';
import template from './listView.tmpl.xml';
import ListComponent from 'components/listComponent/listComponent';
import Api from 'libs/api';
import {DEFAULT_FILTERS, SUCCESS_STATUS} from 'libs/constants';

export default class ListView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;

        this.data.type = type;
        this.data.category = type === 'series' ? 'Сериалы' : 'Фильмы';
        this.data.filtersList = [
            'genre',
            'year',
            'ordering',
        ];
        this.data.chosenFilters = DEFAULT_FILTERS;
        this.listComponent = new ListComponent(this.type);
    }

    render(root) {
        Api.getFilters(this.type).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data.filters = {};
                    this.data.filters.genre = res.body.genres;
                    this.data.filters.genre.unshift({
                        name: 'Все жанры',
                        reference: '%',
                    });
                    this.data.filters.year = [
                        {
                            name: 'Все годы',
                            reference: '%',
                        },
                    ];
                    for (let year = parseInt(res.body.filters.maxyear);
                        year >= parseInt(res.body.filters.minyear); year--) {
                        this.data.filters.year.push({
                            name: year,
                            reference: year,
                        });
                    }
                    this.data.filters.ordering = [
                        {
                            name: 'По рейтингу',
                            reference: 'rating',
                        },
                        // {
                        //     name: 'По новизне',
                        //     reference: 'novelty',
                        // },
                        {
                            name: 'По рейтингу IMDb',
                            reference: 'imdbrating',
                        },
                    ];

                    this.listComponent.setDefaultFilters();
                    this.setDefaultFilters();
                    this.checkGenre();

                    super.render(root);

                    for (const filterButton of document.getElementsByClassName(
                        'filter-button'
                    )) {
                        filterButton.addEventListener(
                            'click',
                            this.onFilterButtonClick.bind(this)
                        );
                    }

                    for (const filterSubmenu of document.getElementsByClassName(
                        'filter-submenu'
                    )) {
                        filterSubmenu.addEventListener(
                            'click',
                            this.onFilterValueClick.bind(this)
                        );
                    }

                    const listContainer = document.getElementById('list-container');
                    this.listComponent.render(listContainer);
                });
            } else {
                console.log('something went wrong');
            }
        });
    }

    onFilterButtonClick(evt) {
        const filterButton = evt.currentTarget;
        const submenu = filterButton.nextElementSibling;
        if (getComputedStyle(submenu).visibility === 'hidden') {
            for (const filterButton of document.getElementsByClassName(
                'filter-button'
            )) {
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
        if (filterName === 'genre') {
            if (filterLink.dataset.reference === '%') {
                window.history.pushState(null, null, `/${this.type}`);
            } else {
                window.history.pushState(null, null,
                    `/${this.type}/${filterLink.dataset.reference}`);
            }
        }
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

    setDefaultFilters() {
        this.data.chosenFilters = Object.assign({}, DEFAULT_FILTERS);
    }

    checkGenre() {
        const genre = location.pathname.split('/').pop();

        if (genre !== this.type) {
            for (const genreFilter of this.data.filters.genre) {
                if (genreFilter.reference === genre) {
                    this.data.chosenFilters['genre'] = {
                        name: genreFilter.name,
                        reference: genre,
                    };

                    this.listComponent.setFilter('genre', genreFilter.name, genre);
                    break;
                }
            }
        }
    }
}
