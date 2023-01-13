global class AccountNameUpdate implements Database.Batchable<sobject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
       return Database.getQueryLocator('select id,name from Account');
    }
    global void execute(Database.BatchableContext bc, List<Account> listofAccountrecords){
        for(Account acc:listofAccountrecords){
            acc.name = 'batch updated'+ acc.name;
        }

        update listofAccountrecords;

   } 
   global void finish(Database.BatchableContext bc){
      system.debug('account name is updated');
    }

}