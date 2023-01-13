@isTest
private class ContactActionsTest{
    Private static testMethod void calculateNumberOfContactsOnInsert() 
    {
        Account actObj = new Account();
        actObj.name = 'Test';
        insert actObj;
        
        list<contact> contactlist = new list<Contact>();
        
        Contact contactObj = new Contact();
        contactObj.Accountid = actObj.id ;
        contactlist.add(contactObj);
        
        Contact contactObj2 = new Contact();
        contactObj2.Accountid = actObj.id ;
        contactlist.add(contactObj2);
        
        Test.startTest();
         insert contactlist;
         Delete contactObj;        
        Test.stopTest();
            }
}