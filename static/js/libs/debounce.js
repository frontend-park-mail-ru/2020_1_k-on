export default function debounce(func, time) {
    return function(args) {
        const previousCall = lastCall;
        const lastCall = Date.now();
        if (previousCall && (lastCall - previousCall <= time)) {
            clearTimeout(lastCallTimeout);
        }
        const lastCallTimeout = setTimeout(() => func(args), time);
    };
}
