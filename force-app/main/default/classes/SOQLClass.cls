public class SOQLClass {
    public static void accountRecords(){
        list<account> accList = new list<account>();
        accList = [select id, name from account];
        for(account acc:acclist){
            system.debug(acc.name);
        }
        for(integer i=0; i<acclist.size(); i++){
            system.debug(acclist[i].name);
        }    
    }

}