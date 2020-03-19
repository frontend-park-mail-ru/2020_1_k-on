import ListView from '../views/listView/listView';

export default class ListController {
    constructor(router) {
        this.router = router;
        this.view = new ListView();
    }
}
