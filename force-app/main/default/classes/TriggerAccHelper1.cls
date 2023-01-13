public class TriggerAccHelper1 {
public static void beforeUpdate(Map<Id, Account> accMap,list<Account> aclist){
System.debug(accMap);
for(Account ac:aclist){
Account oldAcc= new Account();
oldAcc = accmap.get(ac.id);
if(oldAcc.Name!=ac.Name){
ac.Name.addError('Account Name cannot be modified');
}
}
}
}