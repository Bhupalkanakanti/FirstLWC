import { LightningElement ,wire} from 'lwc';
import getvalues from '@salesforce/apex/JsonClass.getJSONValue';
export default class APexValuesdisplay extends LightningElement {
    IntoHtml;

@wire (getvalues)
Display({data,error}){
if(data){
    console.log(data);
this.IntoHtml = data.value;
}else{
this.error= error;
}
}
}