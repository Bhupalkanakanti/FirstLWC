import { LightningElement, api, wire, track } from 'lwc';
import contactrecords from '@salesforce/apex/AccountrecordswithRelatedcontacts.ContactrecordsMethod';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
export default class DynamicDisplayofChildRecords extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track Refreshtheable;
    @track towardsComp = [];

    @wire(contactrecords, { AccountIdfromcmp: '$recordId'})
    ContactData(result) {
        this.Refreshtheable = result;
        const { data, error } = result;
        if (data) {
            //this.wiredContactResult = data;
            this.towardsComp = data;
            // this.checklength = data.length;
            //   console.log('length' + checklength);
            console.log('Total data' + towardsComp);
            //this.updateRecordView();
           // return refreshApex(this.Refreshtheable);
        }
        if (error) {
            console.log(error);
        }
    }
    //checklength = Recordlength >= 1 ? true : false;
    handleDelete(event) {
        const deletedrecords = event.detail.id;
        console.log('Delete record');
        deleteRecord(event.target.value)
            .then(result => {
                //window.alert('Record Deleted Successfully');
                //this.updateRecordView();
                 refreshApex(this.Refreshtheable);
                // window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
        const notifythechangeids = deletedrecords.map((row) => {
            return { recordid: row.id }
        });
        getRecordNotifyChange(notifythechangeids);
    }
    updateRecordView() {
        setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
        }, 1000);
    }
}