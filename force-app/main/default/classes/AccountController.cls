public with sharing class AccountController {
    public String accountId{get;set;}
    public Account actObj{get;set;}
    public AccountController() {
        actobj= new Account();
    }
    public pagereference retrieveAccountDetail(){
        system.debug('accountId::'+accountId);
        if(accountId!=null){
            actObj = [select id,name,type,industry from Account where id=:accountId];
        }
        return null;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [select id,name,type from Account limit 10];
    }
    @AuraEnabled
    public static Account createAccount(Account accountRec){
        try{
            insert accountRec;
            return accountRec;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> createAccounts(List<Account> accountList){
        insert accountList;
        return accountList;
    }


    @AuraEnabled(cacheable=true)
    public static List<String> getAccountFields(){
        List<String> fieldList = new List<String>();
        fieldList.add('Name');
        fieldList.add('Type');
        fieldList.add('Industry');
        return fieldList;
    }

     
      
        @AuraEnabled( cacheable = true )  
        public static List< Account > fetchAccounts( String searchKey ) {  
            
            String strKey = '%' + searchKey + '%';  
            return [ 
                SELECT Id, Name, Industry 
                FROM Account 
                WHERE Name LIKE: strKey LIMIT 10 
            ];  
                
        } 
        
        
        @AuraEnabled(cacheable = true)
    public Static  List<ContentVersion> cvRecords2(String recId){
        set<Id> SetIds = new Set<id>();
        list<Account> lstAccount = [Select Id,(Select Id From Contacts),(Select Id From Opportunities) from Account where Id = :recId];
        for(Account Acc : lstAccount){
            SetIds.add(Acc.Id);
            for(Contact con : Acc.Contacts){
            SetIds.add(con.Id);
        	}
            for(Opportunity opp : Acc.Opportunities){
            SetIds.add(opp.Id);
        	}
        }
           List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :SetIds];
            List<ID> fileIDs = new List<ID>();
            for (ContentDocumentLink docLink : files) {
                fileIDs.add(docLink.ContentDocumentId);
            }
            List<ContentVersion> docs = [SELECT Id,ContentDocumentId, FileExtension, Title 
                						 FROM ContentVersion WHERE ContentDocumentId IN :fileIDs];
          
            return docs;
    }



    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccount()
    {
        List<Account> accList=[SELECT Id,Name FROM Account LIMIT 10000];
        return accList;
    }
    @auraEnabled
    public static List<Contact> getContacts(String accountId)
    {
        List<Contact> conList=[SELECT Id,LastName,AccountId FROM Contact WHERE AccountId=:accountId LIMIT 10000];
        return conList;
    }
    @auraEnabled
    public static List<Opportunity> fetchOpportunity(String accountId)
    {
        List<Opportunity> oppList=[SELECT Id,Name,AccountId FROM Opportunity WHERE AccountId=:accountId LIMIT 10000];
        return oppList;
    }  

//accordion
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDatas() {
        return [SELECT Id, Name ,(Select Id ,Name from Contacts) from Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData1() {
        return [SELECT Id, Name ,(Select Id ,Name from Opportunities) from Account];
    }



    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactData(String accountId) {
        return [SELECT Id, Name ,(Select Id ,Subject from Cases) from Contact WHERE AccountId=:accountId limit 10];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityData(String accountId) {
        return [SELECT Amount, Account.Name, Account.AccountNumber, Name, 
        (SELECT Quantity, UnitPrice, ProductCode, Name FROM OpportunityLineItems)
        FROM Opportunity WHERE AccountId=:accountId limit 10];
    }

            
    
}