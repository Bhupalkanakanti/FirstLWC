import { LightningElement, api } from 'lwc';
import firsttemplate from './lifeCycleDemo.html';
import secondtemplate from './lifeCycleDemo2.html';
export default class LifeCycleDemo extends LightningElement {
    @api tempNo = 'temp1';
    constructor() {
        super();
        console.log('This is in the Constructor');
    }
    connectedCallback() {
        console.log('Inside the Connected Callback');
    }
    disconnectedCallback() {
        console.log('This is inside the DisconnectedCallback');
    }
    handletemplate1() {
        console.log('This is in the Handle Change method');
        if(this.tempNo == 'temp1') {
            this.tempNo = 'temp2';
        }
        else {
            this.tempNo = 'temp1';
        }
    }
    render() {
        console.log('Inside the Rendering Phase');
        if (this.tempNo === 'temp1') 
            return firsttemplate;
        
        else return secondtemplate;
    }
}