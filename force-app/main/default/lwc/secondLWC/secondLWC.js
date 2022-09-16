import { LightningElement, api } from 'lwc';
import Name from '@salesforce/schema/Credentials__c.name';

export default class SecondLWC extends LightningElement {
 @api FullName;
      displayName = Name;
}