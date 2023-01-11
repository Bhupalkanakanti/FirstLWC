import { LightningElement ,wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import AccountName from '@salesforce/schema/Account';
import IndustryField from '@salesforce/schema/Account.Industry';
export default class Picklistforsecificrecordtype extends LightningElement {
Picklistvalues
@wire(getObjectInfo,{objectApiName:AccountName})
recordTypeId1;

    @wire(getPicklistValues,{recordTypeId:'$recordTypeId1.data.defaultRecordTypeId', fieldApiName :IndustryField})
    Picklist;

    handleevent(event){
        this.Picklistvalues = event.target.value;
    }
}