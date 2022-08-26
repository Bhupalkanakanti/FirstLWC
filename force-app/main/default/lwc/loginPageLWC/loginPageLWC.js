import { LightningElement } from 'lwc';

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
CreatePassword(){
    this.CaptureCreatePassword = Event.target.value;
}
CHeckingthevalue(event){
alert(this.UserName);
alert(this.MobileNumber);
alert(this.Email);
alert(this.Password);
alert(this.CaptureCreatePassword);
}              
}