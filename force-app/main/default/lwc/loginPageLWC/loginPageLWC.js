import { LightningElement } from 'lwc';
import CallApex from '@salesforce/apex/Credentials_Class.NewUserDatamethod';
import Validatecred from '@salesforce/apex/Credentials_Class.Validateuers';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LoginPageLWC extends NavigationMixin (LightningElement) {
SHowtheSignup = false;
UserName;
UserName1;
CaptureCreatePassword;
Email;
Password;
DoSignup(Event){
this.SHowtheSignup = true;
};
DoLoginFirst(event){
this.SHowtheSignup = false;
};
CaptureUserName(event){
this.UserName = event.detail.value;
};
CaptureUserName1(event){
this.UserName1 = event.detail.value;
} ;
CaptureEmail(event){
this.Email = event.detail.value;
} ;
CapturePassword(event){
this.Password = event.detail.value;
};  
NewCreatePassword(event){
this.CaptureCreatePassword = event.detail.value;
};
DoNewCreation(event){
CallApex({ UName:this.UserName, PWD:this.CaptureCreatePassword, EmailID:this.Email})
.then(result => {
const event = new ShowToastEvent({
title: 'Success',
message:
'This credential details are created successfully.',
variant:'Success',
});
this.dispatchEvent(event);
})
var CompoDefinition = {
    componentDef : "c:navigationLwc",
    attributes : {
        FullName : this.UserName,
    }
    };
    var encodedComDef = btoa (JSON.stringify(CompoDefinition));
    this[NavigationMixin.Navigate]({
    type:"standard__webPage",
    attributes : {
    url : '/one/one.app#' + encodedComDef
    }
    })
.catch(error => {});
}
DoLogin(event){
Validatecred({UserNameLog :this.UserName1, PasswordLog :this.Password})
.then(result => {
    if(result && result.length>0){
const event = new ShowToastEvent({
title: 'Success',
message:
'This credential details are Matched successfully.',
variant:'Success',
});
this.dispatchEvent(event);

    var CompoDefinition = {
        componentDef : "c:navigationLwc",
        attributes : {
            FullName : this.UserName1,
        }
        };
        var encodedComDef = btoa (JSON.stringify(CompoDefinition));
        this[NavigationMixin.Navigate]({
        type:"standard__webPage",
        attributes : {
        url : '/one/one.app#' + encodedComDef
        }
        });
        /*
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            },
        });*/
}else{
    const event = new ShowToastEvent({
        title: 'Failed',
        message:
        'This credential details are not Matched!!.',
        variant:'Error',
        });
        this.dispatchEvent(event);
}
})
.catch();
}        
}