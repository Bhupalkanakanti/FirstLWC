import { LightningElement } from 'lwc';
import CallApex from '@salesforce/apex/Credentials_Class.NewUserDatamethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LoginPageLWC extends LightningElement {
SHowtheSignup = false;
UserName;
MobileNumber;
CaptureCreatePassword
Email;
Password;
DoSignup(Event){
this.SHowtheSignup = true;
};
DoLogin(event){
this.SHowtheSignup = false;
}
CaptureUserName(event){
this.UserName = event.target.value;
}
CaptureMobileNumber(event){
this.MobileNumber = event.target.value;
} 
CaptureEmail(event){
this.Email = event.target.value;
} 
CapturePassword(event){
this.Password = event.target.value;
}  
NewCreatePassword(){
this.CaptureCreatePassword = Event.target.value;
}
CHeckingthevalue(event){
alert(this.UserName +'UserName');
alert(this.MobileNumber +'Mobile');
alert(this.Email +'Email');
alert(this.Password +'Password');
alert(this.CaptureCreatePassword +'NewPassword');
} 
DoLogin(){
CallApex({UName:this.UserName, NewPasscred:this.Password})
.then()
.catch(); 
}
DoNewCreation(){
alert('This is fired');
CallApex({ UName:this.UserName, Mob:this.MobileNumber, EmailID:this.Email})
.then(result => {
const event = new ShowToastEvent({
title: 'Get Help',
message:
'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
});
this.dispatchEvent(event);
})
.catch(error => {});
}           
}

