import { LightningElement, api, wire } from 'lwc';
import contactrecords from '@salesforce/apex/AccountrecordswithRelatedcontacts.ContactrecordsMethod';
export default class DynamicDisplayofChildRecords extends LightningElement {
    @api recordId;
    towardsComp;
    @wire(contactrecords, { AccountIdfromcmp: '$recordId' })
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