import View from 'views/view';
import template from './searchView.tmpl.xml';
import debounce from 'libs/debounce';
import {SEARCH_TABS} from 'libs/constants';

export default class SearchView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this.currentTab = 'all';
        this.data = SEARCH_TABS;
    }

    render(root) {
        super.render(root);

        const searchInput = document.getElementsByClassName('search-header__input')[0];
        searchInput.addEventListener('input', debounce(this.onInputChange.bind(this), 500));

        for (let searchTab of document.getElementsByClassName('search-tabs__tab')) {
            searchTab.addEventListener('click', this.onTabClick.bind(this));
        }
    }

    onInputChange(evt) {
        // TODO: search
    }

    onTabClick(evt) {
        const clickedTab = evt.currentTarget;
        if (clickedTab.classList.contains('search-tabs__tab_active')) {
            return;
        }

        for (let searchTab of document.getElementsByClassName('search-tabs__tab')) {
            if (searchTab.classList.contains('search-tabs__tab_active')) {
                searchTab.classList.remove('search-tabs__tab_active');
            }
            if (searchTab === clickedTab) {
                searchTab.classList.add('search-tabs__tab_active');
                this.currentTab = searchTab.dataset.value;
            }
        }

        // TODO: search
    }
}
