@RestResource(urlMapping = '/ContactDetails/*')
global with sharing class ContactService {
 @HttpGet
global static void getContacts(){
string jsonString;
List<Contact> conList = new List<Contact>();
conList = [select id,firstname,lastname from Contact where lastname = 'parasa'];
jsonString = JSON.serialize(conList);
Restcontext.response.addHeader('Content-Type' , 'application/json');
Restcontext.response.responseBody = Blob.valueOf(jsonString);
}

}