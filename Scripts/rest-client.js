(function () {

    function addSpRestClientInPage() {
        
        var displayJson = function (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        };

        var RestApiExplorer = (function () {
            function RestApiExplorer(baseUrl) {
                this.baseUrl = baseUrl || _spPageContextInfo.siteAbsoluteUrl;
            }

            RestApiExplorer.prototype.getRequest = function (query) {
                var baseUrl = this.baseUrl;
                return new Promise(function (resolve, reject) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", baseUrl + query);
                    xmlhttp.setRequestHeader("Accept", "application/json;odata=verbose");

                    xmlhttp.onload = function () {
                        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                            if (xmlhttp.status == 200) {
                                var successResponse = JSON.parse(xmlhttp.responseText);
                                resolve(successResponse);
                            } else {
                                var errorResponse = {
                                    status: xmlhttp.statusText,
                                    error: JSON.parse(xmlhttp.responseText)
                                };
                                reject(errorResponse);
                            }
                        }
                    };
                    xmlhttp.send();
                });
            };

            RestApiExplorer.prototype.postRequest = function (data, url) {
                var baseUrl = this.baseUrl;
                return new Promise(function (resolve, reject) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", baseUrl + url);
                    xmlhttp.setRequestHeader("Accept", "application/json;odata=verbose");
                    xmlhttp.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").value);
                    xmlhttp.setRequestHeader("content-Type", "application/json;odata=verbose");

                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                            if (xmlhttp.status == 201 || xmlhttp.status == 200) {
                                var successResponse = JSON.parse(xmlhttp.responseText);
                                resolve(successResponse);
                            } else {
                                var errorResponse = {
                                    status: xmlhttp.statusText,
                                    error: JSON.parse(xmlhttp.responseText)
                                };
                                reject(errorResponse);
                            }
                        }
                    };
                    xmlhttp.send(JSON.stringify(data));
                });
            };

            RestApiExplorer.prototype.updateRequest = function (data, url) {
                var baseUrl = this.baseUrl;
                return new Promise(function (resolve, reject) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("PATCH", baseUrl + url);
                    xmlhttp.setRequestHeader("Accept", "application/json;odata=verbose");
                    xmlhttp.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").value);
                    xmlhttp.setRequestHeader("content-Type", "application/json;odata=verbose");
                    xmlhttp.setRequestHeader("X-Http-Method", "PATCH");
                    xmlhttp.setRequestHeader("If-Match", "*");

                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                            if (xmlhttp.status == 204) {
                                resolve(xmlhttp.status);
                            } else {
                                var errorResponse = {
                                    status: xmlhttp.statusText,
                                    error: JSON.parse(xmlhttp.responseText)
                                };
                                reject(errorResponse);
                            }
                        }
                    };
                    xmlhttp.send(JSON.stringify(data));
                });
            };

            RestApiExplorer.prototype.deleteRequest = function (url) {
                var baseUrl = this.baseUrl;
                return new Promise(function (resolve, reject) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("DELETE", baseUrl + url);
                    xmlhttp.setRequestHeader("Accept", "application/json;odata=verbose");
                    xmlhttp.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").value);
                    xmlhttp.setRequestHeader("If-Match", "*");

                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                            if (xmlhttp.status == 200) {
                                resolve(xmlhttp.status);
                            } else {
                                var errorResponse = {
                                    status: xmlhttp.statusText,
                                    error: JSON.parse(xmlhttp.responseText)
                                };
                                reject(errorResponse);
                            }
                        }
                    };
                    xmlhttp.send();
                });
            };

            RestApiExplorer.prototype.executeRequest = function (requestInfo) {
                switch (requestInfo.requestType) {
                    case "GET": {
                        return this.getRequest(requestInfo.requestUrl);
                    }
                    case "POST": {
                        return this.postRequest(requestInfo.requestBody, requestInfo.requestUrl);
                    }
                    case "UPDATE": {
                        return this.updateRequest(requestInfo.requestBody, requestInfo.requestUrl);
                    }
                    case "DELETE": {
                        return this.deleteRequest(requestInfo.requestUrl);
                    }
                    default:
                        break;
                }
            };


            return RestApiExplorer;
        })();

        var css = "pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }\
                .string { color: green; }\
                .number { color: darkorange; }\
                .boolean { color: blue; }\
                .null { color: magenta; }\
                .key { color: red; }\
                #requestBody { width: 400px; height: 180px; }\
                #requestType { width: 411px;height: 26px; }\
                #requestUrl { width: 400px;height: 22px; }\
                #sendRequest {margin: 0;}\
                #response { display:none;margin-left:10%;background:#eff0f1;margin-right:10%;padding:20px;margin-top:12px;border:3px solid }\
                #requestForm { margin: 0 auto;font-family: sans-serif;font-size: 14px; }\
                #restClientHeader {text-align: center;margin-bottom: 8px;font-weight: bold;font-family: cursive;}\
                #sendRequest { font-size: 14px;font-family: sans-serif; }";

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        head.appendChild(style);

        document.querySelector("#contentRow").innerHTML = "";
        document.querySelector("#s4-ribbonrow").style.display = "none";
        var titleRow = document.querySelector("#s4-titlerow");
        titleRow.outerHTML = "";
        var clientHtml = "<div>\
                              <h1 id='restClientHeader'>SharePoint REST Client</h1>\
                              <table id='requestForm'> \
                                  <tr>\
                                     <td>Url</td>\
                                     <td><input type='text' id='requestUrl'></td>\
                                  </tr>\
                                  <tr>\
                                    <td>Type</td>\
                                    <td>\
                                      <select  id='requestType'>\
                                        <option value='GET'>GET</option>\
                                        <option value='POST'>POST</option>\
                                        <option value='UPDATE'>UPDATE</option>\
                                        <option value='DELETE'>DELETE</option>\
                                      </select>\
                                    </td>\
                                  </tr>\
                                  <tr id='requestBodyTR' style='display:none'>\
                                    <td>Body</td>\
                                    <td><textarea id='requestBody'></textarea></td>\
                                  </tr>\
                                  <tr>\
                                    <td></td>\
                                    <td><input type='button' value='SEND' id='sendRequest'></td>\
                                  </tr>\
                            </table>\
                    </div>\
                    <div id='response'>\
                    </div>";

        var restApiExplorer = new RestApiExplorer();

        document.querySelector("#contentRow").innerHTML = clientHtml;
        document.querySelector("#sendRequest").addEventListener('click', executeRequest);
        document.querySelector("#requestBody").value = "{}";
        document.querySelector("#requestType").addEventListener('change', requestTypeOnchange);

        function requestTypeOnchange() {
            var requestType = document.querySelector("#requestType").value;

            if (requestType == "POST" || requestType == "UPDATE") {
                document.querySelector("#requestBodyTR").style.display = "";
            } else {
                document.querySelector("#requestBodyTR").style.display = "none";
            }
        }

        function executeRequest() {
            try {
                var requestInfo = {
                    requestType: document.querySelector("#requestType").value,
                    requestUrl: document.querySelector("#requestUrl").value,
                    requestBody: JSON.parse(document.querySelector("#requestBody").value)
                };

                if (!requestInfo.requestUrl) {
                    document.querySelector("#response").innerHTML = '<pre>' + 'Request Url can not be empty.' + '</pre>';
                    document.querySelector("#response").style.display = "block";
                }

                restApiExplorer.executeRequest(requestInfo)
                    .then(function (response) {
                        var responseAsString = JSON.stringify(response, undefined, 4);
                        document.querySelector("#response").innerHTML = '<pre>' + displayJson(responseAsString) + '</pre>';
                        document.querySelector("#response").style.display = "block";
                    }, function (error) {
                        var responseAsString = JSON.stringify(error, undefined, 4);
                        document.querySelector("#response").innerHTML = '<pre>' + displayJson(responseAsString) + '</pre>';
                        document.querySelector("#response").style.display = "block";
                    });
            } catch (error) {
                document.querySelector("#response").innerHTML = '<pre>' + displayJson(error.message) + '</pre>';
                document.querySelector("#response").style.display = "block";
            }
        }
    }
    
    function injectCodeToPage(code, args) {
        var script = document.createElement('script');
        script.textContent = '(' + code + ')(' + (args || '') + ');';
        (document.head || document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
    }

    injectCodeToPage(addSpRestClientInPage);
})();