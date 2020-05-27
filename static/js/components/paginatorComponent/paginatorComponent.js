import Component from 'components/component';
import template from './paginatorComponent.tmpl.xml';
import EventBus from 'libs/eventBus';
import {PAGINATOR_EVENTS} from 'libs/constants';

export default class PaginatorComponent extends Component {
    constructor(eventBus = new EventBus(), currentPage = 1) {
        super(template, eventBus);

        this.data = {
            currentPage: currentPage,
        };

        this.isLastPage = false;

        this.element = document.createElement('div');
        this.element.classList.add('paginator');
    }

    afterRender() {
        this.prevBtn = this.element.getElementsByClassName('paginator__btn_prev')[0];
        this.prevBtn.addEventListener('click', this.onBtnClick.bind(this, 'left'));
        this.nextBtn = this.element.getElementsByClassName('paginator__btn_next')[0];
        this.nextBtn.addEventListener('click', this.onBtnClick.bind(this, 'right'));
    }

    onBtnClick(direction) {
        const add = direction === 'left' ? -1 : 1;

        const leftCondition = this.data.currentPage !== 1 && direction === 'left';
        const rightCondition = !this.isLastPage && direction === 'right';

        if (leftCondition || rightCondition) {
            this.eventBus.publish(PAGINATOR_EVENTS.updatePage, this.data.currentPage + add);
        }
    }

    setPage(page) {
        window.scrollTo(0, 0);

        this.data.currentPage = page;
        if (page === 1) {
            this.setBtnDisabled(this.prevBtn);
        } else {
            this.setBtnActive(this.prevBtn);
        }
        this.element.getElementsByClassName('paginator__current-page')[0].innerHTML = page;
    }

    setBtnActive(btn) {
        btn.classList.add('paginator__btn_active');
    }

    setBtnDisabled(btn) {
        btn.classList.remove('paginator__btn_active');
    }

    setIsLastPage(flag = false) {
        this.isLastPage = flag;
        !flag ? this.setBtnActive(this.nextBtn) : this.setBtnDisabled(this.nextBtn);
    }
}
