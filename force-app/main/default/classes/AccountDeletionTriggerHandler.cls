public class AccountDeletionTriggerHandler {
  public static void deleteAccount(list<account> accountList){
      
      for(account accObj:accountList)
      {
         Opportunity oppObj=new Opportunity();

         if(accObj.id==oppObj.account.id)
        {
          List<opportunity> oppofRelatedAccount =[select id,Name,CloseDate,StageName from Opportunity WHERE AccountId =:accObj.id];
          

           if(oppObj.StageName=='Closed Won')
           {
             accObj.addError('Account cannot be deleted when opportunityStage is closed Won');
           }

        }

      }
}

}