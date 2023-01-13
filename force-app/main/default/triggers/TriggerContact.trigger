trigger TriggerContact on Contact (after insert, after delete) {
	set<ID> accSet = new Set<Id>();
    if(trigger.isinsert){
        for(Contact Con : Trigger.new){
            accSet.add(con.AccountId);
        }
    }
        if(trigger.isDelete){
        for(Contact Con : Trigger.old){
            accSet.add(con.AccountId);
        }
    }
    List<Account> acclist = [SELECT Id from Account WHERE ID IN :accSet];
    List<Contact> conlist = [SELECT AccountId FROM Contact WHERE AccountId IN :accSet];
    list<Contact> listCon = new List<Contact>();
    list<Account> listacc = new List<Account>();
    map<String, Integer> conMap = new Map<String, Integer>();
    for(Account acnt : acclist){
        listCon.clear();
        for(contact cont : conlist){
            if(cont.AccountId == acnt.Id){
                listcon.add(cont);
            ConMap.put(cont.AccountId, listCon.size());
            }
        }
    }
    if(acclist.size()>0){
        for(account a : acclist){
            if(conMap.get(a.Id)==NULL){
                a.no_of_contacts__c	= 0;
            }
            else{ 
                a.no_of_contacts__c	= ConMap.get(a.Id);
                listacc.add(a);
            }
        }
        if(listacc.size()>0){
            update Listacc;
        }
    }
}