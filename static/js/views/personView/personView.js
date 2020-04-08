import View from 'views/view';
import template from './personView.tmpl.xml';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import Api from 'libs/api';
import {SUCCESS_STATUS} from 'libs/constants';

export default class PersonView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.id = 0;
    }

    render(root) {
        Api.getPerson(this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data = res.body;
                    super.render(root);

                    const listsContainer = document.getElementById('person-lists-container');

                    if (this.data.films) {
                        const filmsSwiper = new SwiperComponent({
                            name: 'Фильмы с участием актера',
                            list: this.data.films,
                        });
                        filmsSwiper.render(listsContainer);
                    }

                    if (this.data.series) {
                        const seriesSwiper = new SwiperComponent({
                            name: 'Сериалы с участием актера',
                            list: this.data.series,
                        });
                        seriesSwiper.render(listsContainer);
                    }
                });
            } else {
                console.log('something went wrong');
            }
        });
    }

    setId(id) {
        this.id = id;
    }
}
