import MovieView from "views/movieView/movieView";
import PersonView from 'views/personView/personView';

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();

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

        for (let key of this.routes.keys()) {
            if (this.currentRoute && this.currentRoute.match(key)) {
                this.routes.get(key).view.close();
                break;
            }
        }

        for (let key of this.routes.keys()) {
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

        this.currentRoute = '/';
        this.routes.get(/\//).view.render(this.root);
        window.history.pushState(null, null, '/');
        console.log(`404: ${path} not found`);
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
}
