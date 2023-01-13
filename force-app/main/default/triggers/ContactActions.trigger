trigger ContactActions on Contact (after insert, after delete) {
  if(trigger.IsAfter && trigger.IsInsert)
  {
      ContactTriggerHandler.calculateNumberOfContactsOnInsert(trigger.new);
  }
  if(trigger.IsAfter && trigger.IsDelete)
  {
      ContactTriggerHandler.calculateNumberOfContactsOnDelete(trigger.old);
  }  

}