(function () {

    var messageListener = function (message) {
        if (message.key == "success") {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("#success").style.display = "block";
            setTimeout(function () {
                window.close();
            }, 3000);
        } else {
            document.querySelector("#loading").style.display = "none";
            document.querySelector("#error").style.display = "block";
        }
    };
    chrome.tabs.executeScript(null, {file: 'Scripts/message-listener.js'});
    
    chrome.tabs.executeScript(null, {file: 'Scripts/angular.js'});

    chrome.runtime.onConnect.addListener(function (port) {
        port.onMessage.addListener(messageListener);
    });

    chrome.tabs.executeScript(null, {file: 'Scripts/rest-client.js'});
})();