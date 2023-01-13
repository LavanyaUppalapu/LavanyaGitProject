@isTest
public class AccountDeletionTriggerTest {
  Private static testMethod void deleteAccount(){
   Account accObj = new Account();
   accObj.Name ='testName';
   accObj.Rating ='Hot';
   insert accObj;
 Test.startTest();
    Opportunity oppObj = new Opportunity();
    oppObj.AccountId = accObj.Id;
    oppObj.Name ='TestOpp';
    oppObj.StageName ='Closed Won';
    oppObj.CloseDate = system.Today();
    insert oppObj;
  Test.stopTest();
       try{
           delete accObj;
       }
       catch(exception e){
         system.assert(e.getMessage().contains('Account cannot be deleted when opportunityStage is closed Won'));
       }
           
       }
}