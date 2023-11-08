import { LightningElement } from 'lwc'
export default class TwoButtonfind extends LightningElement {
  buttonclickontemp
  ButtonClick (event) {
    this.buttonclickontemp = event.currentTarget.name
    console.log('buttonName  ===>' + this.buttonclickontemp)
    window.alert('this is clicked  ===>' + this.buttonclickontemp)
  }
}
