export default function debounce(func, time) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && (this.lastCall - previousCall <= time)) {
            clearTimeout(this.lastCallTimeout)
        }
        this.lastCallTimeout = setTimeout(() => func(args), time);
    }
}
