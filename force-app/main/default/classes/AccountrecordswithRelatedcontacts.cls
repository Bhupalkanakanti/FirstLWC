public with sharing class AccountrecordswithRelatedcontacts {
@auraEnabled(cacheable =true)
public static List<Account> AccountrecordswithRelatedcontactsMethod() {
List<Account> Acclist = [Select id, Name from Account where Id='0015g000014PcrrAAC'];
return Acclist;
}
@auraEnabled(cacheable =true)
public static List<contact> ContactrecordsMethod(){
List<Contact> Conlist = [select id, LastName, Phone, Email, AccountId From Contact where Accountid = '0015g000014PcrrAAC' ];
return Conlist;
}
}
