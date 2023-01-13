public class ContactTriggerHandler{
  public static void calculateNumberOfContactsOnInsert(List<contact> contactList){
  Set<Id> accountIdSet=new Set<Id>();
  Map<Id, Account> accountMap = new Map<Id,Account>();  //for updating no. of contacts
  for(contact contactObj:contactList){                 //whenever contact is inserted if it has account then prepare idset addmethod
     if(contactObj.AccountId!= null){
       accountIdSet.add(contactObj.AccountId);         //we have accountid set now
     }
  }
  if(accountIdSet!= null && accountIdSet.size()>0){
       for(AggregateResult agrResultObj:[select count(id) contCount,AccountId from contact where AccountId in:accountIdSet Group By AccountId]){  //if we have 10 accounts it will count 10 rows
          Account actObj = new Account();
          actObj.Id= (Id)agrResultObj.get('AccountId');
          actObj.no_of_contacts__c = (integer)agrResultObj.get('contCount');    //typecasting
          accountMap.put(actObj.Id,actObj);
       }
       if(accountMap!= null && accountMap.size()>0){
         update accountMap.values();
       }
  }

      
}
  public static void calculateNumberOfContactsOnDelete(List<contact> contactList){
  Set<Id> accountIdSet=new Set<Id>();
  Map<Id, Account> accountMap = new Map<Id,Account>();  //for updating no. of contacts
  for(contact contactObj:contactList){                 //whenever contact is inserted if it has account then prepare idset addmethod
     if(contactObj.AccountId!= null){
       accountIdSet.add(contactObj.AccountId);         //we have accountid set now
     }
  }
  if(accountIdSet!= null && accountIdSet.size()>0){
       for(AggregateResult agrResultObj:[select count(id) contCount,AccountId from contact where AccountId in:accountIdSet and id not in:contactList Group By AccountId]){  //if we have 10 accounts it will count 10 rows
          Account actObj = new Account();
          actObj.Id= (Id)agrResultObj.get('AccountId');
          actObj.no_of_contacts__c = (integer)agrResultObj.get('contCount');    //typecasting
          accountMap.put(actObj.Id,actObj);
       }
       if(accountMap!= null && accountMap.size()>0){
         update accountMap.values();
       }
  }
}

}