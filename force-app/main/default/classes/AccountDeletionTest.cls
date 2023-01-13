@isTest
private class AccountDeletionTest {
   Private static testMethod void beforedelete(){
   Account accObj = new Account();
   accObj.Name ='testName';
   accObj.Rating ='Hot';
   insert accObj;
 Test.startTest();
    Opportunity oppObj = [select id,stageName from Opportunity where AccountId = :accObj.Id];
    oppObj.StageName ='Closed Won';
 Test.stopTest();
       try{
               delete accObj;
       }
       catch(exception e){
         system.assert(e.getMessage().contains('Account cannot be deleted when opportunityStage is closed Won'));
       }
           
       }
}