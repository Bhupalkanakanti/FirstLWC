import { LightningElement, track } from 'lwc';

export default class RenderedCallbackInLWC extends LightningElement {
    @track properties;
      Int=0;
      hasRendered =true;
    renderedCallback() {
        if (this.hasRendered) {
            this.properties = 'set by renderedCallback';
            console.log('properties ' + this.properties);
            this.hasRendered = false;
        }
    }

    handleButtonClick() {
        this.properties = 'set by buttonClick';
        console.log('properties ' + this.properties);
    }
}