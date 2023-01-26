import { LightningElement, wire, api } from "lwc";
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class bhupalRelatedList extends LightningElement {
    error;
    relatedLists;
    @api objectApiName;
    @wire(getRelatedListsInfo, {
        parentObjectApiName: '$objectApiName',
        //recordTypeId: '012000000000000AAA' //optional
    })listInfo({ error, data }) {
        if (data) {
            console.log(data);
            this.relatedLists = data.relatedLists;
            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.relatedLists = undefined;
        }
    }
}