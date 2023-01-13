public class TriggerConHelper {
    public static void beforeInsert(List<Contact> colist){
        contact c = new Contact();
        List<Contact> conlist1 = colist;
        c.lastname = c.lastname + 'vamritech';
    }
    public static void beforeUpdate(Map<Id,Contact> conMap,List<Contact> colist){
        system.debug(conMap);
    for(Contact co:coList){
        Contact oldcon = new Contact();
        oldCon = conMap.get(co.id);
        if(oldCon.lastname !=co.lastname){
            co.lastname.addError('contact lastname cannot be modified');
        }
    }
  }       
    
}