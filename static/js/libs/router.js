export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;

        window.addEventListener('popstate', () => {
            this.change(location.pathname);
        });
    }

    add(path, view, root = this.root) {
        this.routes.set(path, {
            root: root,
            view: view,
        });
    }

    change(path) {
        if (this.currentRoute === path) {
            return;
        }

        if (this.routes.has(this.currentRoute)) {
            this.routes.get(this.currentRoute).view.close();
        }

        if (this.routes.has(path)) {
            this.currentRoute = path;
            this.routes.get(path).view.render(this.root);
            window.history.pushState(null, null, path);
        } else {
            console.log(`404: ${path} not found`);
        }
    }

    start() {
        document.addEventListener('click', (evt) => {
            const {target} = evt;

            if (target instanceof HTMLAnchorElement) {
                evt.preventDefault();
                this.change(target.pathname);
            }
        });

        // начальный рендер
        this.change(location.pathname);
    }
}
