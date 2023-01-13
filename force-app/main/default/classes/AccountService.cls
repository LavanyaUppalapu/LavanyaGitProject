@RestResource(urlMapping = '/AccountDetails/*')
global with sharing class AccountService {
 @HttpGet
global static void getAccounts(){
string jsonString;
List<Account> accList = new List<Account>();
accList = [select id,name,type from Account];
jsonString = JSON.serialize(accList);
Restcontext.response.addHeader('Content-Type' , 'application/json');
Restcontext.response.responseBody = Blob.valueOf(jsonString);
}
}