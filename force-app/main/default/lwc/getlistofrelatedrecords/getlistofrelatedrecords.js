import { LightningElement, wire, api } from "lwc";
import { getRelatedListRecordsBatch } from "lightning/uiRelatedListApi";
import { getRelatedListsinfo } from "lightning/uiRelatedListApi";
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class getlistofrelatedrecords extends LightningElement {
  /*@api recordId;
  @api objectApiName; 
  error;
  results;
  ListofrelatedObject ;
  /*@wire(getObjectInfo, { objectApiName: '$objectApiName' })
    ObjectInfo({ error, data }) {
        if (data) {
            console.log('data value ===>', JSON.stringify(data.childRelationships));
            data.childRelationships.forEach(val => {
               console.log('val answer', val); 
            });
            this.AccountInfoDefaultRecordtypeid = data.childRelationships ;
        }
        if (error) {
            console.log(error)
        }
    }*/
  /*@wire(getRelatedListsinfo, { 
    parentObjectApiName: '$objectApiName' })
  const({ error, data }) {
    if (data) {
      console.log(data);
      this.ListofrelatedObject = data.relatedLists;
    } if (error) {
      this.error = error;
    }
  }
   @wire(getRelatedListRecordsBatch, {
    parentRecordId: "$recordId",
    relatedListParameters: [
    {
      relatedListId: "Contacts",
      fields: ["Contact.Name", "Contact.Id"],
      sortBy: ["Contact.Name"]
    },
    {
      relatedListId: "Opportunities",
      fields: ["Opportunity.Name", "Opportunity.Amount"],
      sortBy: ["Opportunity.Amount"]
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