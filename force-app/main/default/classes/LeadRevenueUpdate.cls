global class LeadRevenueUpdate implements database.Batchable <sobject>{
    global database.querylocator start(database.BatchableContext bc){
     return database.getquerylocator([select id,AnnualRevenue from lead]);    
    }
    global void execute(Database.BatchableContext bc,list<lead> listofleadrec){
        for(lead lea: listofleadrec){
            if(lea.AnnualRevenue !=null){
               lea.AnnualRevenue = 200000; 
            }
        }
        update listofleadrec;
    }
    global void finish(Database.BatchableContext bc){
        
    }
    
        
    

}