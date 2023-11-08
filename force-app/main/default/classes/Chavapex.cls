public with sharing class ExceptionTriggerHelper {
    public static void deleteBlockExceptions(Set<Id> parentExceptionId) {
        try{
            if (Schema.sObjectType.Exception__c.isDeletable()) {
                delete([select id from Exception_c where Block_Typec='Block' and  ParentException_c in :parentExceptionId limit:Limits.getLimitDMLRows()]);
            }
        }
        catch(Exception e)
        {
            system.debug(e.getMessage());
        }
    }
      public static void updateExceptionResourceDateTimes(Map<Id, Exception_c> oldMap, Map<Id,Exception_c> newMap){
        Schema.DescribeSObjectResult d = Schema.SObjectType.Exception__c; 
        Map<String,Schema.RecordTypeInfo> rtMapByName = d.getRecordTypeInfosByName();
        Schema.RecordTypeInfo rtByName =  rtMapByName.get('Resource');
        List<Resource_Exception_c> resourceExceptions = new List<Resource_Exception_c>();
        List<Id> dateTimeUpdatedExceptions = new List<Id>();
        for(Exception__c exp : newMap.values()){
            //check new and old value of start and end times 
            // add to list only if there is change in date or time
            if(exp.RecordTypeId == rtByName.getRecordTypeId()){
                if(oldMap.get(exp.Id).Start_Time_c != exp.Start_Timec || oldMap.get(exp.Id).End_Timec != exp.End_Time_c || 
                   oldMap.get(exp.Id).Start_Date_c != exp.Start_Datec || oldMap.get(exp.Id).End_Datec != exp.End_Date_c){
                       dateTimeUpdatedExceptions.add(exp.Id);
                   }
            }
        }//end for
        if(Schema.sObjectType.Resource_Exception__c.IsAccessible())
        {
             resourceExceptions = [SELECT Id, Name, Cross_TZ_Start_Date_c, Cross_TZ_End_Date_c,
                                                          Cross_TZ_Start_Time_c, Cross_TZ_End_Timec,Resourcer.Time_Zone_c,
                                                          Exception_c,Resourcec FROM Resource_Exception_c 
                                                          WHERE Exception_c IN:dateTimeUpdatedExceptions  and Resourcer.is_active_c=true];
        }
        for(Resource_Exception__c re :resourceExceptions){
            String timezone = re.Resource_r.Time_Zone_c;
            if(timezone!=null){
                //get the exception record from map
                Exception_c except = newMap.get(re.Exception_c);
                Date startDate = except.Start_Date__c;
                Date endDate = except.End_Date__c;
                if(except.Start_Time_c != null && except.End_Time_c != null){
                    Time startTime = except.Start_Time__c;
                    Time endTime = except.End_Time__c;
                    String convertedStartDate = DateTime.newInstance(startDate,startTime).format('yyyy-MM-dd HH:mm:ss',timezone);
                    String convertedEndDate = DateTime.newInstance(endDate,endTime).format('yyyy-MM-dd HH:mm:ss',timezone);
                    //system.debug(convertedStartDate + ' -- ' + convertedEndDate);
                    String convertedStartTime = convertedStartDate.split(' ')[1];
                    String[] convertedStartTimeArray = convertedStartTime.split(':');
                    String convertedEndTime = convertedEndDate.split(' ')[1];
                    String[] convertedEndTimeArray = convertedEndTime.split(':');
                    Date crossTZstartDate = Date.valueOf(convertedStartDate);
                    Time crossTZstartTime = Time.newInstance(Integer.valueOf(convertedStartTimeArray[0]),Integer.valueOf(convertedStartTimeArray[1]),0,0);
                    Date crossTZendDate = Date.valueOf(convertedEndDate);
                    Time crossTZendTime = Time.newInstance(Integer.valueOf(convertedEndTimeArray[0]),Integer.valueOf(convertedEndTimeArray[1]),0,0);
                    re.Cross_TZ_Start_Date__c = crossTZstartDate;
                    re.Cross_TZ_Start_Time__c = crossTZstartTime;
                    re.Cross_TZ_End_Date__c = crossTZendDate;
                    re.Cross_TZ_End_Time__c = crossTZendTime;
                }
            }
        }// end for
        try{
            if(Schema.sObjectType.Resource_Exception__c.IsUpdateable())
            {
                 update resourceExceptions;
            }
        }
        catch(DMLException de){
            system.debug('error!' + de.getMessage());
        }
    }
    public static void createExceptionsPerYear(List<Exception__c> exceptions){
        Exception_c newException = new Exception_c();
        List<Exception_c> insertExceptionsList = new List<Exception_c>();
        for(Exception__c excep : exceptions){
            for(integer i=1 ; i<excep.Number_of_Years__c ;i++){
                newException = new Exception__c();
                newException = excep.clone(false);
                Date exceptionStartDate = excep.Start_Date__c;
                Date exceptionEndDate = excep.End_Date__c;
                newException.Name = excep.Name + ' : ' + exceptionStartDate.addYears(i).year();
                newException.Start_Date__c = exceptionStartDate.addYears(i);
                newException.End_Date__c = exceptionEndDate.addYears(i);
                newException.Yearly_Parent_Exception__c = excep.id;
                insertExceptionsList.add(newException);
            }
        }
        //system.debug(insertExceptionsList.size());
         if(Schema.sObjectType.Exception__c.IsCreateable()){
             try{
                 insert insertExceptionsList;
             }
             catch(DMLException de){
                 system.debug('Error : ' + de.getMessage());
             }
         }
    }
     public static void deleteChildYearlyExceptions(List<Id> exceptionIds){
        List<Exception_c> childExceptions = new List<Exception_c>();
          if(Schema.sObjectType.Exception__c.IsAccessible())
          {
              childExceptions = [SELECT Id FROM Exception_c WHERE Yearly_Parent_Exception_c IN :exceptionIds];
          }
         if(Schema.sObjectType.Exception__c.IsDeletable()){
             try{
                 delete childExceptions;
             }
             catch(DMLException de){
                 system.debug('Error : ' + de.getMessage());
             }
         }
     }
    public static void updateYearlyChildExceptions(Map<Id,Exception__c> exceptionsMap){
        List<Exception_c> childExceptions = new List<Exception_c>();
        if(Schema.sObjectType.Exception__c.IsAccessible())
        {
            childExceptions = [SELECT Id,All_Day_Appointment_c,Block_Typec,Business_Closurec,Cross_Time_Zonec,End_Datec,End_Time_c,
                               Name,Exception_Type_c,Recurrencec,Recurrence_Frequencyc,Start_Datec,Start_Timec,Weekly_Recurrence_Days_c,
                               Yearly_Parent_Exception_c FROM Exceptionc WHERE Yearly_Parent_Exception_c IN :exceptionsMap.keySet()];
        }
        for(Exception__c childException : childExceptions){
            if(exceptionsMap.containsKey(childException.Yearly_Parent_Exception__c)){
                Exception_c parent = new Exception_c();
                parent = exceptionsMap.get(childException.Yearly_Parent_Exception__c);
                childException.All_Day_Appointment_c = parent.All_Day_Appointment_c;
                childException.Block_Type_c = parent.Block_Type_c;
                childException.Business_Closure_c = parent.Business_Closure_c;
                childException.Cross_Time_Zone_c = parent.Cross_Time_Zone_c;
                if(parent.End_Date_c != null && parent.Start_Datec!=null && childException.Start_Datec != null &&  childException.End_Date_c!=null){
                    Date endDate = Date.newInstance(childException.End_Date_c.year(), parent.End_Date_c.month(), parent.End_Date__c.day());
                    Date startDate = Date.newInstance(childException.Start_Date_c.year(), parent.Start_Date_c.month(), parent.Start_Date__c.day());
                    childException.Start_Date__c = startDate;
                    childException.End_Date__c =endDate;
                    //system.debug('startDate' + startDate);
                }
                childException.End_Time_c = parent.End_Time_c;
                childException.Name = parent.Name + ' : ' + childException.Start_Date__c.year();
                childException.Exception_Type_c = parent.Exception_Type_c;
                childException.Recurrence_c = parent.Recurrence_c;
                childException.Recurrence_Frequency_c = parent.Recurrence_Frequency_c;
                childException.Start_Time_c = parent.Start_Time_c;
                childException.Weekly_Recurrence_Days_c = parent.Weekly_Recurrence_Days_c;
                // childException.Yearly_Parent_Exception_c = parent.Yearly_Parent_Exception_c;
            }
        }
         if(Schema.sObjectType.Exception__c.isUpdateable()){
             try{
                 update childExceptions;
             }
             catch(DMLException de){
                 system.debug('Error : ' + de.getMessage());
             }
         }
    }//function end    
}//class end