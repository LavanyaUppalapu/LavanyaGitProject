global class ApexScheduledClass1 Implements Schedulable
            {
                        global void execute(SchedulableContext sc)
                        {
                                    sendmail();
                        }
 
                        public void sendmail()
                        {
                            
                             List<Account> accs =new List<Account>();
                             accs = [select id,name from Account WHERE created_date__c='Today'];
                             for(Account acc:accs){
                             acc.name = 'created today'+ acc.name;
                             }
                                    Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                                    string [] toaddress= New string[]{'lavanyauppalapu414@gmail.com'};
                                    email.setSubject('Testing Apex Scheduler-Subject');
                                    email.setPlainTextBody('Testing Apex Scheduler-Body');
                                    email.setToAddresses(toaddress);
                                    Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
                        }
            }