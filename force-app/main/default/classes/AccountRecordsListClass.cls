public with sharing class AccountRecordsListClass {
    @AuraEnabled (cacheable=true)
  
    public Static List<Account> AccountRecordsListClassMethod() {
        List<Account> Acclist = [ Select Id, Name from Account  Limit 10] ;
    return Acclist;
    }
}
