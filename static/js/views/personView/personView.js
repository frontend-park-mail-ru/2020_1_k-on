import View from 'views/view';
import template from './personView.tmpl.xml';
import Api from 'libs/api';
import convertDate from 'libs/convertDate';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import {
    PERSON_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class PersonView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.id = 0;
    }

    render(root) {
        this.root = root;

        Api.getPerson(this.id)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                res.body.birthDate = convertDate(res.body.birthDate);
                this.data = res.body;
                super.render(root);

                this.afterRender();
            })
            .catch((err) => {
                console.error(`${err.url} ${err.status}: FAILED TO LOAD PERSON`);
                this.eventBus.publish(PERSON_EVENTS.internalError, err.status);
            });
    }

    afterRender() {
        const listsContainer = document.getElementById('person-lists-container');

        if (this.data.films) {
            const cards = this.data.films.map((item) => {
                const cardComponent = new CardComponent(item);
                return cardComponent.render();
            });

            const collectionComponent = new CollectionComponent({
                name: 'Фильмы с участием актера',
                elements: cards,
            });

            listsContainer.appendChild(collectionComponent.render());
        }

        if (this.data.series) {
            const cards = this.data.series.map((item) => {
                const cardComponent = new CardComponent(item);
                return cardComponent.render();
            });

            const collectionComponent = new CollectionComponent({
                name: 'Сериалы с участием актера',
                elements: cards,
            });

            listsContainer.appendChild(collectionComponent.render());
        }
    }

    setId(id) {
        this.id = id;
    }
}
