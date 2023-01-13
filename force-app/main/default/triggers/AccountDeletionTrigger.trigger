trigger AccountDeletionTrigger on Account (before insert) {
if(trigger.IsBefore && trigger.IsDelete){
   AccountDeletionTriggerHandler.deleteAccount(Trigger.old);
}

}