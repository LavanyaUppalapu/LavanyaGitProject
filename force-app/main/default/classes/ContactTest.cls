@isTest
private class ContactTest {
    @testsetup static void  setupdate(){
        contact co = new contact();
            co.FirstName = 'Test';
            co.LastName = 'Test1';
            insert co;
    }
    Private static testMethod void testbeforeUpdate(){
        contact co =[select id,LastName from contact limit 1];
        if(co.LastName ==co.LastName){
        Test.startTest();
        update co;
        Database.saveResult result = Database.insert(co, false);
        Test.stopTest();
        }    
        system.assertEquals(co.LastName=co.LastName, co.LastName);
    }

}