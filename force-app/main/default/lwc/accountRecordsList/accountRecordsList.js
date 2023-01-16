import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountRecordsListClass.AccountRecordsListClassMethod';
export default class AccountRecordsList extends LightningElement {
   Recordslist = [];
@wire(getAccounts)
 Accounts({data,error}){
    if(data){
       console.log(`Data Values =====> ${data}`);
       this.Recordslist=data;
       }
       if(error){
        console.log(error);
       }
    }
accountidfromparent;
handleclick(event){
   event.preventDefault();
    this.accountidfromparent = event.target.dataset.accountid;
}
}