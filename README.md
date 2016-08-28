 SharePoint REST Client is a Chrome Extension for testing/exploring REST API of SharePoint. It can be very useful for testing HTTP requests like GET, POST, UPDATE or DELETE. It works on SharePoint 2010, 2013, 2016 and Online.
Download it from [Chrome WebStore](https://chrome.google.com/webstore/detail/sp-rest-client/ojnaikgchcnginnmkmkonmdglhjikokd)

#Problem with existing REST Clients

There are many free REST Clients available on the internet like Fiddler, Advanced REST Client, Postman and so on. 
These REST Clients have very user friendly UI for making complex request and analyzing response but they do not work seamlessly with SharePoint. 
Some of the issues from Advanced REST Client are mentioned below:

* It asks for credential though you are logged in. This happens at on-premise site
![alt tag](http://i.imgur.com/vD57pHN.png)
* It does not ask for credential at SharePoint Online. It gives following error
![alt tag](http://i.imgur.com/nejKYhT.png)
* It is mandatory to pass FormDigestValue for testing POST, UPDATE and DELETE request.
* It is also needed to other headers like “Accept” : “application/json;odata=verbose”, “content-Type” : “application/json;odata=verbose”,  “X-Http-Method” : “PATCH”, “If-Match” : “*” and so on

#SharePoint REST Client
Any HTTP requests like GET, POST, UPDATE or DELETE can be made very easily using this REST Client. Some tips are given below for using this tool.

* Download and install SharePoint REST Client from store.
* Navigate or login on your SharePoint Site
* Click on the extension icon
* Your SharePoint page will be hidden and you will get following UI for testing REST API
![alt tag](http://i.imgur.com/gntSIAl.png)

To make GET or DELETE request, you just have to pass the URL. There is no need to include host web URL in the request URL (start from /_api/).

For POST and UPDATE request, specify the request body as stringify JSON. For example

```javascript
{
    "__metadata": { "type" : "SP.Data.EmployeeListItem" },
    "FirstName" : "Atish",
    "LastName" : "Dipongkor"
}
```
For UPDATE and DELETE, you will not get any response but in case of error this tool will show you the whole error. For GET and POST, you will get nicely formatted JSON like following.
![alt tag](http://i.imgur.com/Z825Tlv.png)

You are always welcome for contribution and feedback!
