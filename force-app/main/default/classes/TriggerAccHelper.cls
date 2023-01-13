public class TriggerAccHelper {
    public static void beforeInsert(List<Account> aclist){
        account a = new Account();
        List<account> acclist1 = aclist;
        a.name = a.name + 'vamritech';
    }
    public static void beforeUpdate(Map<Id,Account> accMap,List<Account> aclist){
        system.debug(accMap);
    for(Account ac:acList){
        Account oldAcc = new Account();
        oldAcc = accMap.get(ac.id);
        if(oldAcc.Name !=ac.Name){
            ac.Name.addError('account name cannot be modified');
        }
    }
  }       
    
}