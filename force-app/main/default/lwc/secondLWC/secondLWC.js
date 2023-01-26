import { LightningElement } from "lwc";
import Name from '@salesforce/schema/Credentials__c.name';
export default class SecondLWC extends LightningElement {
  displayName = Name; 
}