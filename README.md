# SharePoint REST Client
It's a REST Client for SharePoint 2013, 2016 and Online. 
SharePoint end-points can be tested very easily by making GET, POST, UPDATE or DELETE request.
Download it from [Chrome WebStore](https://chrome.google.com/webstore/detail/sp-rest-client/ojnaikgchcnginnmkmkonmdglhjikokd)

#Problem with existing REST Client

There are many free REST Clients available on the internet like Fiddler, Advanced REST Client, Postman and so on. 
These REST Clients have very user friendly UI for making complex request and analyzing response but they do not work seamlessly with SharePoint. 
Some of the issues from Advanced REST Client are mentioned below:

* It asks for credential though you are logged in. This happens at on-premise site
![alt tag](http://i.imgur.com/vD57pHN.png)
* It does not ask for credential at SharePoint Online. It shows following error
![alt tag](http://i.imgur.com/nejKYhT.png)
* It is mandatory to pass `<addr>` FormDigestValue for testing POST, UPDATE and DELETE request.

![alt tag](http://i.imgur.com/gntSIAl.png)
