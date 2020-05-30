import View from 'views/view';
import template from './indexView.tmpl.xml';
import Api from 'libs/api';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import SliderComponent from 'components/sliderComponent/sliderComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import {
    INDEX_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

const sliderData = [
    {
        id: 9,
        type: 'films',
        russianName: 'Джокер',
        description: 'Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.',
        image: '/static/img/A90.jpg',
    },
    {
        id: 14,
        type: 'series',
        russianName: 'Бумажный дом',
        description: 'История о преступниках, решивших ограбить Королевский монетный двор Испании и украсть 2,4 млрд евро.',
        image: '/static/img/403a7361b00435249e8493f872ff0fce928fe93d2de493de59e5c82ef0bf13b6.jpg',
    },
    {
        id: 16,
        type: 'series',
        russianName: 'Мир Дикого Запада',
        description: 'В футуристическом парке развлечений «Мир Дикого Запада» специально сконструированные андроиды выполняют любые прихоти посетителей, чтобы те чувствовали безнаказанность и полную свободу действий. Если робота убили - не беда, техники его починят, сотрут память и снова поставят в строй, навстречу новому дню и новым людским прихотям. Но оказывается, что далеко не все роботы теряют воспоминания.',
        image: '/static/img/475065c48f55739f4afb7e100ac0880f852118fed5e4d1c83ebd1f6cf214b33d.jpg',
    },
    {
        id: 421,
        type: 'films',
        russianName: 'Ford против Ferrari',
        description: 'В начале 1960-х Генри Форд II принимает решение улучшить имидж компании и сменить курс на производство более модных автомобилей. После неудавшейся попытки купить практически банкрота Ferrari американцы решают бросить вызов итальянским конкурентам на трассе и выиграть престижную гонку 24 часа Ле-Мана. Чтобы создать подходящую машину, компания нанимает автоконструктора Кэррола Шэлби, а тот отказывается работать без выдающегося, но, как считается, трудного в общении гонщика Кена Майлза. Вместе они принимаются за разработку впоследствии знаменитого спорткара Ford GT40.',
        image: 'https://st.kp.yandex.net/im/kadr/3/4/4/kinopoisk.ru-Ford-v-Ferrari-3444231.jpg',
    },
    {
        id: 9,
        type: 'series',
        russianName: 'Острые козырьки',
        description: 'Британский сериал о криминальном мире Бирмингема 20-х годов прошлого века, в котором многолюдная семья Шелби стала одной из самых жестоких и влиятельных гангстерских банд послевоенного времени. Фирменным знаком группировки, промышлявшей грабежами и азартными играми, стали зашитые в козырьки лезвия.',
        image: '/static/img/90.jpg',
    },
    {
        id: 15,
        type: 'series',
        russianName: 'Черное зеркало',
        description: 'За последние годы технологии всесторонне изменили нашу жизнь, прежде чем мы успели опомниться и усомниться в них. В каждом доме, на каждом столе, на каждой ладони - плазменный телевизор, монитор компьютера, дисплей смартфона - черное зеркало нашего существования в XXI веке. Наша связь с реальностью меняется. У нас есть доступ ко всей информации в мире, но в голове хватает места лишь для того, чтобы воспринять 140 символов из сообщения в Twitter. В «Чёрном зеркале» отображается всеобщее беспокойство за наш современный мир.',
        image: '/static/img/41da2a25e8141188c7c9579b732d3edfa1f5c97edfc34c1e58d25cfcc9b56c6e.jpg',
    },
    {
        id: 422,
        type: 'films',
        russianName: 'Зеленая книга',
        description: 'Утонченный светский лев, богатый и талантливый музыкант нанимает в качестве водителя и телохранителя человека, который менее всего подходит для этой работы. Тони «Болтун» — вышибала, не умеющий держать рот на замке и пользоваться столовыми приборами, зато он хорошо работает кулаками. Это турне навсегда изменит жизнь обоих.',
        image: '/static/img/e108c48e3a3877f53cfd6ed40ffdecaac4251dd2c2b31706a240323cefc01c4e.jpg',
    },
    {
        id: 6,
        type: 'films',
        russianName: 'Убийство в восточном экспрессе',
        description: 'Путешествие на одном из самых роскошных поездов Европы неожиданно превращается в одну из самых стильных и захватывающих загадок в истории. Фильм рассказывает историю тринадцати пассажиров поезда, каждый из которых находится под подозрением. И только сыщик должен как можно быстрее разгадать головоломку, прежде чем преступник нанесет новый удар.',
        image: '/static/img/A60.jpg',
    },
];

export default class IndexView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    render(root) {
        super.render(root);

        this.slider = new SliderComponent(sliderData);
        this.root.prepend(this.slider.render());

        // Api.getSlider()
        //     .then((res) => {
        //         if (res.status === SUCCESS_STATUS) {
        //             return res.json();
        //         } else {
        //             return Promise.reject(res);
        //         }
        //     })
        //     .then((res) => {
        //         this.slider = new SliderComponent(res.body.recommendations);
        //         this.root.prepend(this.slider.render());
        //     })
        //     .catch((err) => {
        //         console.error(`${err.status}: FAILED TO LOAD MAIN SLIDER`);
        //         this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
        //     });

        Api.getIndex(window.sessionStorage.getItem('isUserAuth') === 'true')
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.renderSubscriptions(res.body === null ? [] : res.body);
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO LOAD MAIN PLAYLISTS`);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });
    }

    renderSubscriptions(subsList = []) {
        subsList.forEach((subItem) => {
            subItem.films = subItem.films === null ? [] : subItem.films;
            subItem.series = subItem.series === null ? [] : subItem.series;
            const cards = subItem.films.concat(subItem.series).map((cardItem) => {
                const card = new CardComponent(cardItem);
                return card.render();
            });

            const collectionComponent = new CollectionComponent({
                name: subItem.name,
                elements: cards,
                isPlaylist: true,
                isUserSubscribed: subItem.isSubscribed,
                id: subItem.id,
                eventBus: this.eventBus,
            });

            const collectionsElem = this.root.getElementsByClassName('collections')[0];
            collectionsElem.appendChild(collectionComponent.render());
        });
    }

    close() {
        this.slider?.close();
        super.close();
    }
}
