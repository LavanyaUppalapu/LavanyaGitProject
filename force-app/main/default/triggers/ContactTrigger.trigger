trigger ContactTrigger on Contact (before insert, before update) {
  if(trigger.IsBefore && trigger.IsInsert)
  {
      TriggerConHelper.beforeInsert(trigger.new);
  }  
  if(trigger.IsBefore && trigger.IsUpdate)
  {
      TriggerConHelper.beforeUpdate(trigger.oldmap, trigger.new);
  }
      
}