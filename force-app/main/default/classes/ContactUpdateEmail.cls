global class ContactUpdateEmail implements Database.Batchable<sobject>{
    global Database.QueryLocator start(Database.BatchableContext bc){
       return Database.getQueryLocator('select id,lastname,email from Contact');
    }
    global void execute(Database.BatchableContext bc, List<Contact> ContactList){
        for(Contact con:ContactList){
            con.lastname = 'contactname is updated'+ con.lastname;
        }
        List<Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
        string[] toAddresses = new string[]{'lavanyauppalapu414@gmail.com'};
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.SetToAddresses(toAddresses);
        mail.SetSubject('Test Email');
        mail.SetPlainTextBody('Welcome to batch apex');
        mailList.add(mail);

       if(!mailList.isEmpty()){
        Messaging.SendEmail(mailList);
       }
   }
   global void finish(Database.BatchableContext bc){
   }

}