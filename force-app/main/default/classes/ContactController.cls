public with sharing class ContactController {
    public ContactController() {

    }
    @AuraEnabled(cacheable=true)  
    public static List<Contact> getContactList() {
        return [
            SELECT Id, FirstName,LastName,Name,Title, Phone, Email,LeadSource 
            FROM Contact      
            LIMIT 10
        ];
    }
    
    @AuraEnabled
    public static List<Contact> getContactRecords(){
        return [
            SELECT Id, FirstName,LastName,Name,Title, Phone, Email,LeadSource 
            FROM Contact   where Email!=null   order by createdDate Desc      
            LIMIT 10
        ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactByAccountId(String accountid){
        return [select id,FirstName,LastName,Email from Contact where accountId=:accountid];
    }

    @AuraEnabled
    public static string deleteSelectedContacts(List<String> contactIdList){      
        List<Contact> contactList = new List<Contact>();
        contactList = [select id from Contact where id in:contactIdList];
        if(contactList!=null && contactList.size()>0){
            try{
                delete contactList;
                return 'Contacts deleted successfully';
            }
            catch(Exception e){
                return e.getMessage();
            }  
        }
        else{
                return 'No Contacts Found';
        }        
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactRecords(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, LastName 
            FROM Contact 
            WHERE LastName LIKE :key 

            LIMIT 10];
    }

    @AuraEnabled
    public static Contact createContact(Contact contactRec){
        try{
            insert contactRec;
            return contactRec;
         /* return [
          SELECT Id, FirstName, LastName, Email
          FROM Contact 
          WHERE AccountId=:accountId

          LIMIT 10]; */
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> createContactL(List<Contact> contactList){
        insert contactList;
        return contactList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> createContactByAccountId(String accountid){
        try{
            
            insert [select id,FirstName,LastName,Email from Contact where accountId=:accountid];
            return [select id,FirstName,LastName,Email from Contact where accountId=:accountid];
         
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }    

    @AuraEnabled
    public static void insertContact(String accountId, String firstName, String lastName){
        try{
             
            Contact con = new Contact();
            con.AccountId=accountId;
            con.FirstName=firstName;
            con.LastName=lastName;
            insert con;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static list<Contact> getRelatedList(Id recordId)
    {
        List<Contact> Conlist = [Select id, name,firstname,lastname from Contact where AccountId=: recordId ];
        return Conlist;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Phone, Email
            FROM Contact
            WHERE AccountId = :accountId
           // WITH SECURITY_ENFORCED
        ];
    }

    @AuraEnabled
    public static void updateContacts(List<Contact> contactsForUpdate) {
        // Make sure we can update the database before trying to update
        if (!Schema.sObjectType.Contact.isUpdateable()) {
            throw new SecurityException(
                'Insufficient permissions to update contacts'
            );
        }
        update contactsForUpdate;
    }

        // Create a lightning-datatable and display modal on rowaction
        @AuraEnabled(cacheable=true)
        public static List<Contact> getDataFromContact(){
          List<Contact> conList = [Select Id, FirstName, LastName, Email, Phone From Contact limit 10];
          try{
             return conList;
          }
          catch(Exception e){
             throw new AuraHandledException(e.getMessage());
          }
        }
        @AuraEnabled(Cacheable = true)
        public static List<Contact> getContact(){
            return [SELECT Id, FirstName,LastName, Phone, Email FROM Contact limit 10];
        }

        @AuraEnabled
    public static void deleteContacts(list<Id> lstConIds){
        try {
            list<Contact> lstConsToDelete = new list<Contact>();
            System.debug('lstConIds ====> '+lstConIds);
            for(Id idCon : lstConIds) {
                lstConsToDelete.add(new Contact(Id = idCon));
            }
            if(!lstConsToDelete.isEmpty()) {
                delete lstConsToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    

}