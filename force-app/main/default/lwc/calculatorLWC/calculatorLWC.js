import { LightningElement, track } from 'lwc'

export default class CalculatorLWC extends LightningElement {
  @track first
  @track Second
  @track result
  FirstNumber (event) {
    this.first = event.target.value
  }
  SecondNumber (event) {
    this.Second = event.target.value
  }
  SumofNumbers () {
    this.result = Number(this.first) + Number(this.Second)
  }
}
