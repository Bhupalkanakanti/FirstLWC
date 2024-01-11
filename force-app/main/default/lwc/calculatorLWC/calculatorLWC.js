import { LightningElement, track } from 'lwc'

export default class CalculatorLWC extends LightningElement {
    //Track is withdrawn from the salesforce for bi directional data binding.
    @track first
    @track Second
    @track result
    FirstNumber(event) {
        this.first = event.target.value
    }
    SecondNumber(event) {
        this.Second = event.target.value
    }
    SumofNumbers() {
        this.result = Number(this.first) + Number(this.Second)
    }
}