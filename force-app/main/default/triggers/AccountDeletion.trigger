trigger AccountDeletion on Account (before delete) {
  
  if(trigger.IsBefore && trigger.IsDelete)
  {
      for(account accObj:trigger.old)
      {
         Opportunity oppObj=new Opportunity();

         if(accObj.id==oppObj.account.id)
        {

           if(oppObj.StageName=='Closed Won')
           {
             accObj.addError('Account cannot be deleted when opportunityStage is closed Won');
           }

        }

      }
   }   
}