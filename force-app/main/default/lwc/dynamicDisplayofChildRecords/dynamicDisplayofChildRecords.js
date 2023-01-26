import { LightningElement, api, wire } from 'lwc';
import contactrecords from '@salesforce/apex/AccountrecordswithRelatedcontacts.ContactrecordsMethod';
export default class DynamicDisplayofChildRecords extends LightningElement {
    @api recordId;
    @api objectApiName;
    towardsComp;
    @wire(contactrecords, { AccountIdfromcmp: '$recordId' ,ObjectApiNamefromCmp : '$objectApiName' })
    ContactData({ error, data }) {
        if (data) {
            console.log(data);
            this.towardsComp = data;
        }
        if (error) {
            console.log(error);
        }
    }
}