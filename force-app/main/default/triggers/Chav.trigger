trigger ExceptionTrigger on Exception__c (before insert,after update,after delete,after insert,before delete) {
    if(Boolean.valueOf(label.Mark_all_triggers_active)){
    if(Trigger.isAfter){
        if(Trigger.isUpdate){
         ExceptionTriggerHelper.updateExceptionResourceDateTimes(Trigger.oldMap, Trigger.newMap);
            Map<Id,Exception_c> yearlyExceptions = new Map<Id,Exception_c>();
            for(Exception__c excp : Trigger.New){
                if(excp.Recurrence_Frequency_c == 'Yearly' && excp.Yearly_Parent_Exception_c == null){
                    yearlyExceptions.put(excp.Id,excp);
                }
            }
            ExceptionTriggerHelper.updateYearlyChildExceptions(yearlyExceptions);
//PartTimeResourceDefaultScheduleHelper.updatedss(trigger.new,trigger.old);
        }
       /* if(trigger.isDelete)
        {
            PartTimeResourceDefaultScheduleHelper.updatesdsr_time(Trigger.old);
        }  */
    }
      if(Trigger.isAfter){    
       if(Trigger.isInsert){
            List<Exception_c> yearlyExceptions = new List<Exception_c>();
            for(Exception__c excp : Trigger.New){
                if(excp.Recurrence_Frequency_c == 'Yearly' && excp.Yearly_Parent_Exception_c == null){
                    yearlyExceptions.add(excp);
                }
            }
            ExceptionTriggerHelper.createExceptionsPerYear(yearlyExceptions);
        }
     }
       if(Trigger.isBefore){
            if(Trigger.isDelete){
                 for(Exception__c exp: Trigger.old){
                    if(exp.Resource_Exception_Count__c>0){
                        exp.AddError('Cannot delete exception if it is associated with any resources!');
                    }
                }
                  //Delete the BLOCK type Exception for Connected OPEN type Exception
                    Set<Id> parentExceptionID=new Set<Id>();
                    List<Id> delyearlyExceptions = new List<Id>();
                    for(Exception__c excp : Trigger.old){
                        if(excp.Recurrence_Frequency_c == 'Yearly' && excp.Yearly_Parent_Exception_c == null){
                            delyearlyExceptions.add(excp.Id);
                        }
                        if(excp.Block_Type__c=='Open')
                        {
                            parentExceptionID.add(excp.id);
                        }
                    }
                    ExceptionTriggerHelper.deleteChildYearlyExceptions(delyearlyExceptions);
                    if(parentExceptionID!=null && parentExceptionID.size()>0)
                        {
                            ExceptionTriggerHelper.deleteBlockExceptions(parentExceptionID);
                        }
            }
       }
    }
}