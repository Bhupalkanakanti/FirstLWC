import { LightningElement, api, wire} from 'lwc';
import findContactRecords from '@salesforce/apex/ClassforRelatedContactsofAccount.ClassforRelatedContactsofAccountMethod';

export default class ContactRecords extends LightningElement {

Columns =  [
    {label : 'FirstName' , fieldname : 'FirstName'},
    {label : 'LastName' , fieldname : 'LastName'},
    {label : 'Email' , fieldname : 'Email', type : 'Email'}
];
@api accountId;
 ConResult;
 Conarray=[];
@wire(findContactRecords,{accountid:'$accountid'})
contacts({data,error}){
    if(data){
       console.log(data)
this.Conarray = data;
       }
       if(error){
        console.log(error);
       }
    }
}