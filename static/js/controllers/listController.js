import ListView from 'views/listView/listView';

export default class ListController {
    constructor(router, eventBus, type) {
        this.type = type;
        this.view = new ListView(eventBus, type);
    }
}
