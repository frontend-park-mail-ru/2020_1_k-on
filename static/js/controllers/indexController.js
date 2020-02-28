import IndexView from '../views/indexView/indexView';

export default class IndexController {
    constructor(router) {
        this.view = new IndexView(router);
    }
}
