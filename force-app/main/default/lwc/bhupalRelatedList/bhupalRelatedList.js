import { LightningElement, wire, api } from "lwc";
import { getRelatedListsInfo } from 'lightning/uiRelatedListApi';
import { getRelatedListRecordsBatch } from 'lightning/uiRelatedListApi';
export default class bhupalRelatedList extends LightningElement {
    error;
    relatedLists = [] ;
    @api objectApiName;
    @wire(getRelatedListsInfo, {
        parentObjectApiName: '$objectApiName',
        //recordTypeId: '012000000000000AAA' //optional
    }) listInfo({ error, data }) {
        if (data) {
            console.log( 'Data from Bhupal' + JSON.stringify(data.relatedLists));
            this.relatedLists = data.relatedLists;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.relatedLists = undefined;
        }
    }
    /*@wire(getRelatedListRecordsBatch, {
        parentRecordId: "$recordId",
        relatedListParameters: [
            {
                relatedListId: this.relatedLists.relatedListId[0],
                fields: ["Contact.Name", "Contact.Id"],
                //sortBy: ["Contact.Name"]
            },
            {
                relatedListId: this.relatedLists.relatedListId[1],
                fields: ["Opportunity.Name", "Opportunity.Amount"],
               // sortBy: ["Opportunity.Amount"]
            }
        ]
    })
    const({ error, data }) {
        if (data) {
            this.results = data.results;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.results = undefined;
        }
    }*/
}