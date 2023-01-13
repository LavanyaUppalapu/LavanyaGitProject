public class CreateContactCls1 {
 @AuraEnabled
    public static string createContact(contact contObj){
       system.debug('contact::' +contObj.firstName);
        insert contObj;
        return contObj.Id;
    }    
@AuraEnabled
    public static List<contact> retrieveContacts(){
     return[select id,FirstName,LastName,Email from contact order by createDate__c desc limit 5];
    }
}