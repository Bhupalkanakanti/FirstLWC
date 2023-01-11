import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import USER_NAME from '@salesforce/schema/User.Username';
import FIRST_NAME from '@salesforce/schema/User.FirstName';
import LAST_NAME from '@salesforce/schema/User.LastName';

import USER_ID from '@salesforce/user/Id';
export default class UserInfo extends LightningElement {
    userId = USER_ID;
    
    @wire(getRecord, { recordId : "$userId", fields: [USER_NAME, FIRST_NAME, LAST_NAME]})
    user;

    get userName(){
        return getFieldValue(this.user.data, USER_NAME);
    }

    get firstName(){
        return getFieldValue(this.user.data, FIRST_NAME);
    }

    get lastName(){
        return getFieldValue(this.user.data, LAST_NAME);
    }
}