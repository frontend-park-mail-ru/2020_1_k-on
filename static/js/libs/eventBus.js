export default class EventBus {
    constructor() {
        this.subscriptions = {};
    }

    subscribe(eventType, callback) {
        if (!(eventType in this.subscriptions)) {
            this.subscriptions[eventType] = [];
        }

        this.subscriptions[eventType].push(callback);
    }

    publish(eventType, ...args) {
        if (!(eventType in this.subscriptions)) {
            return;
        }

        this.subscriptions[eventType].forEach((callback) => callback(...args));
    }
}
