import ListView from 'views/listView/listView';
import EventBus from 'libs/eventBus';
import {GLOBAL_EVENTS, LIST_EVENTS} from "libs/constants";

export default class ListController {
    constructor(router, eventBus, type) {
        this.type = type;
        this.globalEventBus = eventBus;
        this.eventBus = new EventBus();

        this.eventBus.subscribe(LIST_EVENTS.internalError, (code) => {
            this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
        });

        this.view = new ListView(this.eventBus, type);
    }
}
