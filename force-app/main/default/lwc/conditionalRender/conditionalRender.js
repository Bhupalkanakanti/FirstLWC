import { LightningElement } from 'lwc';

export default class ConditionalRender extends LightningElement {
showtext =false;
hidetext = false;
Toggletext = true;
CLickedOnbutton(){
this.showtext = true;
}
CLickedOnbutton1(){
    this.hidetext = true;
}
CLickedOnbutton2(){
 this.Toggletext= !this.Toggletext
}
}