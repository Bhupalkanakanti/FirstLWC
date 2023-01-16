import { LightningElement, wire ,api} from 'lwc';
import{getListUi} from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Contact';
export default class GetListUiDemo extends LightningElement {
Accresult;
@api recordId;
@api objectApiName;
    @wire(getListUi,{
        objectApiName : ACCOUNT_OBJECT, listViewApiName :'AllContacts'})
    wiredlistview({error, data}){
        if(data){
           console.log(data)
            this.Accresult = data.records.records;
           }
           if(error){
            console.log(error);
        }
     }
 }