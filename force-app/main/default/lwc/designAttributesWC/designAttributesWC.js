import { LightningElement ,api} from 'lwc';
import Accholdername from '@salesforce/schema/Account.Name';
export default class DesignAttributesWC extends LightningElement {

@api FirstName;
@api showtitle =false;
@api Title;
}