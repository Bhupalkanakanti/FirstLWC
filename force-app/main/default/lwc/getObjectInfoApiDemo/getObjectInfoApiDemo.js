import { LightningElement ,wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import AccountObject from '@salesforce/schema/Account';
export default class GetObjectInfoApiDemo extends LightningElement {
AccountInfoDefaultRecordtypeid;
@wire(getObjectInfo,{objectApiName:AccountObject})
ObjectInfo({error, data}){
if(data){
this.AccountInfoDefaultRecordtypeid = data.defaultRecordTypeId;
}
if(error){
}
}
}