import { LightningElement, wire, api,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import AccountObject from '@salesforce/schema/Account';
export default class GetObjectInfoApiDemo extends LightningElement {
    @track AccountInfoDefaultRecordtypeid =[];
    @api objectApiName;
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    ObjectInfo({ error, data }) {
        if (data) {
            console.log('data value ===>', JSON.stringify(data.childRelationships));
            data.childRelationships.forEach(val => {
               console.log('val answer v2', val.relationshipName); 
            });
            this.AccountInfoDefaultRecordtypeid = data.childRelationships;
        }
        if (error) {
            console.log(error)
        }
    }
}