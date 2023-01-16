public with sharing class ClassforRelatedContactsofAccount {
    @AuraEnabled (cacheable = true)
    public static List<Contact> ClassforRelatedContactsofAccountMethod(string AccountIdParent) {
 List<Contact> COnlist =[Select Id, LastName, FirstName , AccountId from Contact where AccountId =: AccountIdParent Limit 5 ];
    return COnlist;
    }
}
