import IndexView from 'views/indexView/indexView';

export default class IndexController {
    constructor(router) {
        this.router = router;
        this.view = new IndexView();
    }
}
