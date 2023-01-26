import { LightningElement, wire ,api} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import AccountObject from '@salesforce/schema/Account';
export default class GetPicklistInfoDemo extends LightningElement {
    AccountInfoDefaultRecordtypeid
@api objectApiName;
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    ObjInfo({ data, error }) {
        if (data) {
            console.log(data);
            this.AccountInfoDefaultRecordtypeid = data.defaultRecordTypeId;
        }
        if (error) {
            console.error(error);
        }
    }
}