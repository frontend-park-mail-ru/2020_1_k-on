import ListView from 'views/listView/listView';
import EventBus from "libs/eventBus";

export default class ListController {
    constructor(router, eventBus, type) {
        this.type = type;
        this.globalEventBus = eventBus;

        this.eventBus = new EventBus();
        this.eventBus.subscribe('changeGenre', (genreValue) => {
            if (genreValue === '%') {
                console.log('index');
                router.change(`/${type}`);
            } else {
                router.change(`/${type}/${genreValue}`);
            }
        });

        this.view = new ListView(this.eventBus, type);
    }
}
