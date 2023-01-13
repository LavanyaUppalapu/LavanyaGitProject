trigger AccountTrigger on Account (before insert,before update) {
  if(trigger.IsBefore && trigger.IsInsert)
  {
      TriggerAccHelper.beforeInsert(trigger.new);
  }  
  if(trigger.IsBefore && trigger.IsUpdate)
  {
      TriggerAccHelper.beforeUpdate(trigger.oldmap, trigger.new);
  }
      
}