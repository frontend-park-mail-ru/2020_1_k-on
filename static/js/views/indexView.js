import View from './view';

const template = `
    <p class="index-page__headline">Сериалы</p>

    <div class="filters-block">
        <div class="filter-button">
            <span class="filter-button__filter-value">Все жанры</span>
            <img class="filter-button__arrow" src="static/img/down-arrow.svg">
        </div>

        <div class="filter-button">
            <span class="filter-button__filter-value">Все страны</span>
            <img class="filter-button__arrow" src="static/img/down-arrow.svg">
        </div>

        <div class="filter-button">
            <span class="filter-button__filter-value">По популярности</span>
            <img class="filter-button__arrow" src="static/img/down-arrow.svg">
        </div>
    </div>

    <div class="series-block">
        <a class="series-card">
            <div class="series-card__image series-card__image_1">
                <span class="series-card__age-limit">16+</span>
            </div>
            <span class="series-card__name">Лучшие в Лос-Анджелесе</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_2">
                <span class="series-card__age-limit">18+</span>
            </div>
            <span class="series-card__name">Навстречу тьме</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_3">
                <span class="series-card__age-limit">16+</span>
            </div>
            <span class="series-card__name">Столкновение</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_4">
                <span class="series-card__age-limit">18+</span>
            </div>
            <span class="series-card__name">Триггер</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_1">
                <span class="series-card__age-limit">16+</span>
            </div>
            <span class="series-card__name">Лучшие в Лос-Анджелесе</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_2">
                <span class="series-card__age-limit">18+</span>
            </div>
            <span class="series-card__name">Навстречу тьме</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_3">
                <span class="series-card__age-limit">16+</span>
            </div>
            <span class="series-card__name">Столкновение</span>
        </a>

        <a class="series-card">
            <div class="series-card__image series-card__image_4">
                <span class="series-card__age-limit">18+</span>
            </div>
            <span class="series-card__name">Триггер</span>
        </a>
    </div>
`;

export default class IndexView extends View {
    constructor() {
        super(template);
    }

    render(root) {
        this.element.className = 'index-page';
        super.render(root);
    }
}
