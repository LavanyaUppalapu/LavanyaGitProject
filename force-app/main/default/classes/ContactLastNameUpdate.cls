global class ContactLastNameUpdate implements Database.Batchable<sobject> {
       global Database.QueryLocator start(Database.BatchableContext bc){
       return Database.getQueryLocator('select id,lastname from Contact');
    }
    global void execute(Database.BatchableContext bc, List<Contact> listofContactrecords){
        for(Contact con:listofContactrecords){
            con.lastname = 'contactname updated'+ con.lastname;
        }

        update listofContactrecords;

   } 
   global void finish(Database.BatchableContext bc){
      system.debug('Contact lastname is updated');
    }
}