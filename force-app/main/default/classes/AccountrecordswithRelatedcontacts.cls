public with sharing class AccountrecordswithRelatedcontacts {
    @auraEnabled(cacheable =true)
    public static List<Account> AccountrecordswithRelatedcontactsMethod() {
        List<Account> Acclist = [Select id, Name from Account where Id='0015g000014PcrrAAC'];
        return Acclist;
    }
    
    @auraEnabled(cacheable =true)
    public static List<contact> ContactrecordsMethod(string AccountIdfromcmp){
        List<Contact> Conlist = [select id, LastName,Name, Phone, Email, AccountId From Contact where Accountid = : AccountIdfromcmp ];
        return Conlist;
    }
}
