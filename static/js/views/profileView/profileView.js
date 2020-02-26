import View from '../view';

const data = {
    profile: {
        login: 'AliceSitedge',
        email: 'a.seledkina@mail.ru',
        avatar: '/static/img/avatar.jpg'
    },
    lists: [
        {
            name: 'Смотрю',
            series: [
                {
                    'name': 'Игра престолов',
                    'seasons': '7/8',
                    'rating': '-'
                },
                {
                    'name': 'Твин Пикс',
                    'seasons': '2/3',
                    'rating': '-'
                }
            ]
        },
        {
            name: 'Просмотрено',
            series: [
                {
                    'name': 'Игра престолов',
                    'seasons': '7/8',
                    'rating': '8'
                },
                {
                    'name': 'Твин Пикс',
                    'seasons': '2/3',
                    'rating': '9'
                },
                {
                    'name': 'Друзья',
                    'seasons': '1/10',
                    'rating': '-'
                },
                {
                    'name': 'Во все тяжкие',
                    'seasons': '5/5',
                    'rating': '7'
                }
            ]
        }
    ]
};

export default class ProfileView extends View {
    constructor() {
        super();
        this._data = data;
    }

    render(root) {
        this.element.className = 'profile-page';
        this.tmpl = window.fest['js/views/profileView/profileView.tmpl'](this._data);
        super.render(root);
    }
}
