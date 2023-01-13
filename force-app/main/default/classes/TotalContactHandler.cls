public class TotalContactHandler {
    Public static void countContacts(list<Contact> newList,list<Contact> oldList)
    {
      Set<id> accountIds=new Set<id>();
        if(newList!=null)
        {    
        for(contact c:newList)
        {
            if(c.accountId!=null)
            {
                accountIds.add(c.accountId);
            }    
        }
        }    
        if(oldList!=null)
        {    
        for(contact c:oldList)
        {
            if(c.accountId!=null)
            {
                accountIds.add(c.accountId);
            }    
        }
        }    
        List<Account> accounts = [select Id,no_of_contacts__c,(select Id from Contacts) from Account where Id in: accountIds];
        if(!accounts.isEmpty())
        {
            for(Account acc:accounts)
            {
               acc.no_of_contacts__c=acc.contacts.size(); 
            }
        }    
        update accounts;    

    }
}