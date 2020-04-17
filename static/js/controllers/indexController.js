import IndexView from 'views/indexView/indexView';
import EventBus from 'libs/eventBus';
import {
    GLOBAL_EVENTS,
    INDEX_EVENTS,
} from 'libs/constants';

export default class IndexController {
    constructor(globalEventBus) {
        this.globalEventBus = globalEventBus;
        this.eventBus = new EventBus();
        this.eventBus.subscribe(
            INDEX_EVENTS.internalError,
            (code) => {
                this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
            }
        );

        this.view = new IndexView(this.eventBus);
    }
}
