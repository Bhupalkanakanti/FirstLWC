import { LightningElement, wire, track } from 'lwc';

import Apexclass from '@salesforce/apex/AccountrecordswithRelatedcontacts.AccountrecordswithRelatedcontactsMethod';
import Contactmethod from '@salesforce/apex/AccountrecordswithRelatedcontacts.ContactrecordsMethod'
const columns = [

    { label: 'Name', fieldName: 'LastName', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'text' }
];

export default class NewAccountandRelatedRecords extends LightningElement {

    Columns = columns;

    Accrecords = [];
    @track ContactsRecords = [];

    @wire(Apexclass)
    AccountRecord({ data, error }) {
        if (data) {
            console.log(data);
            this.Accrecords = data;
        }
        if (error) {
            console.log(error);
        }
    }

    @wire(Contactmethod)
    Cont({ data, error }) {
        if (data) {
            console.log();
            this.ContactsRecords = data;
        }
        if (error) {
            console.log();
        }
    }
}