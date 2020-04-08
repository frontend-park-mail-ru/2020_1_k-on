import PersonView from 'views/personView/personView';

export default class PersonController {
    constructor(router, eventBus,) {
        this.view = new PersonView(eventBus);
    }
}
