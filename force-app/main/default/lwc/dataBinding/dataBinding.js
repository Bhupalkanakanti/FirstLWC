import { LightningElement } from 'lwc';
export default class DataBinding extends LightningElement {
FullName ="Bhupal Reddy"
title ="Salesforce Developer"
Handlechange(event){
this.title = event.target.value

}
}