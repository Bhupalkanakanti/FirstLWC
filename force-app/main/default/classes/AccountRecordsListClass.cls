public with sharing class AccountRecordsListClass {
    @AuraEnabled (cacheable=true)
  
    public Static List<Account> AccountRecordsListClassMethod() {
        List<Account> Acclist = [ Select Id, Name,Phone,AnnualRevenue from Account ] ;
    return Acclist;
    }
}
