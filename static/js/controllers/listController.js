import ListView from '../views/listView/listView';

export default class ListController {
    constructor(router) {
        this.view = new ListView(router);
    }
}
