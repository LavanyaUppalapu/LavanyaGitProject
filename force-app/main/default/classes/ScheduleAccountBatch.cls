global class ScheduleAccountBatch implements Database.Batchable<sobject>,Schedulable{
    global Database.QueryLocator start(Database.BatchableContext bc){
       return Database.getQueryLocator('select id,name,Email from Account WHERE CREATEDDATE=Today');
    }
    global void execute(Database.BatchableContext bc, List<Account> listofAccountrecords){
        for(Account acc:listofAccountrecords){
            acc.name = 'createddate'+ acc.name;
        }
        update listofAccountrecords;
   } 
   global void finish(Database.BatchableContext bc){
      List<Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
        string[] toAddresses = new string[]{'lavanyauppalapu414@gmail.com'};
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.SetToAddresses(toAddresses);
        mail.SetSubject('Schedule Apex');
        mail.SetPlainTextBody('schedule job is completed successfully');
        mailList.add(mail);

       if(!mailList.isEmpty()){
        Messaging.SendEmail(mailList);
       }    
    }
       
    global void execute(SchedulableContext sc){
        ScheduleAccountBatch aue = new ScheduleAccountBatch();
        Database.executeBatch(aue);
    }
       
}