(function () {
    window.addEventListener("message", postMessage, true);
    function postMessage(event) {
        if (event.data.id && event.data.id == "SpRestClient") {
            var port = chrome.runtime.connect({ name: "SpRestClient" });
            port.postMessage(event.data);
        }
    }
})();