import View from './view';

const template = `
    <div class="profile-block">
        <div class="profile-block__avatar"></div>

        <div class="profile-info">
            <div class="profile-info__header">
                <span class="profile-info__login">AliceSitedge</span>
                <a href="#">
                    <img class="profile-info__edit" src="static/img/pencil.svg"
                        height="20">
                </a>
                <a class="profile-info__exit" href="#">Выйти</a>
            </div>

            <div class="profile-info__email">
                <span>Почта:</span>
                <span class="profile-info__email-value">
                    a.seledkina@mail.ru
                </span>
            </div>
        </div>
    </div>

    <div class="lists-nav">
        <a class="lists-nav__list-link lists-nav__list-link_active"
            href="#">Все</a>
        <a class="lists-nav__list-link" href="#">Смотрю</a>
        <a class="lists-nav__list-link" href="#">Просмотрено</a>
        <a class="lists-nav__list-link" href="#">Запланировано</a>
        <a class="lists-nav__list-link" href="#">Брошено</a>
    </div>

    <div class="list-block">
        <p class="list-block__headline">Смотрю</p>

        <div class="series-list">
            <div class="series-list__header">
                <a class="series-list__col1">#</a>
                <a class="series-list__col2">Название</a>
                <a class="series-list__col3">Сезоны</a>
                <a class="series-list__col4">Оценка</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">1</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Игра престолов</a>
                <a class="series-list__col3">7/8</a>
                <a class="series-list__col4">-</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">2</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Твин Пикс</a>
                <a class="series-list__col3">2/3</a>
                <a class="series-list__col4">-</a>
            </div>
        </div>
    </div>

    <div class="list-block">
        <p class="list-block__headline">Просмотрено</p>

        <div class="series-list">
            <div class="series-list__header">
                <a class="series-list__col1">#</a>
                <a class="series-list__col2">Название</a>
                <a class="series-list__col3">Сезоны</a>
                <a class="series-list__col4">Оценка</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">1</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Игра престолов</a>
                <a class="series-list__col3">7/8</a>
                <a class="series-list__col4">8</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">2</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Твин Пикс</a>
                <a class="series-list__col3">2/3</a>
                <a class="series-list__col4">9</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">3</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Друзья</a>
                <a class="series-list__col3">1/10</a>
                <a class="series-list__col4">-</a>
            </div>

            <div class="series-list__row" href="#">
                <a class="series-list__col1">4</a>
                <a class="series-list__col2 series-list__series-name"
                    href="#">Во все тяжкие</a>
                <a class="series-list__col3">5/5</a>
                <a class="series-list__col4">7</a>
            </div>
        </div>
    </div>
`;

export default class ProfileView extends View {
    constructor() {
        super(template);
    }

    render(root) {
        this.element.className = 'profile-page';
        super.render(root);
    }
}