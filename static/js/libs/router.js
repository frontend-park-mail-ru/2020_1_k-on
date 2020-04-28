import MovieView from 'views/movieView/movieView';
import PersonView from 'views/personView/personView';
import ErrorView from 'views/errorView/errorView';
import {
    NOT_FOUND_ERROR_MSG,
    NOT_FOUND_STATUS,
} from 'libs/constants';

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();

        this.errorView = new ErrorView();

        this.currentRoute = null;

        window.addEventListener('popstate', () => {
            this.change(location.pathname);
        });
    }

    /**
     * Добавляет новый маршрут
     * @param {string} path
     * @param {View} view
     * @param {HTMLElement} root
     */
    add(path, view, root = this.root) {
        const expr = path.split('/').map((elem) => {
            if (elem.match(/^<.+>$/)) {
                switch (elem.replace(/[<>]/g, '')) {
                case 'int':
                    return '\\d+';
                case 'string':
                    return '\\w+';
                default:
                    return elem;
                }
            } else {
                return elem;
            }
        }).join('\\/');

        this.routes.set(RegExp(`^${expr}$`), {
            root: root,
            view: view,
        });
    }

    /**
     * Делает смену view
     * @param {string} path
     */
    change(path) {
        if (this.currentRoute === path) {
            return;
        }

        for (const key of this.routes.keys()) {
            if (this.currentRoute && this.currentRoute.match(key)) {
                this.routes.get(key).view.close();

                if (path === '/logout') {
                    this.currentRoute = '/logout';
                    this.change('/');
                    return;
                }

                break;
            }
        }

        for (const key of this.routes.keys()) {
            if (path.match(key)) {
                this.currentRoute = path;

                const view = this.routes.get(key).view;
                if (view instanceof MovieView || view instanceof PersonView) {
                    view.setId(this.currentRoute.split('/').pop());
                }
                view.render(this.root);

                window.history.pushState(null, null, path);
                return;
            }
        }

        this.renderError(NOT_FOUND_STATUS, NOT_FOUND_ERROR_MSG);
    }


    /**
     * Запускает роутер
     */
    start() {
        document.addEventListener('click', (evt) => {
            const linkElement = evt.target.closest('a');

            if (linkElement) {
                evt.preventDefault();
                this.change(linkElement.pathname);
            }
        });

        // начальный рендер
        this.change(location.pathname);
    }

    /**
     * Выполняет смену на errorView
     * @param {int} code - код ошибки
     * @param {string} msg - сообщение
     */
    renderError(code, msg) {
        for (const key of this.routes.keys()) {
            if (this.currentRoute && this.currentRoute.match(key)) {
                this.routes.get(key).view.close();
                break;
            }
        }

        this.errorView.render(this.root, code, msg);
    }
}
