import { LightningElement, api, wire, track } from "lwc";
import contactrecords from "@salesforce/apex/AccountrecordswithRelatedcontacts.ContactrecordsMethod";
import { deleteRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";
export default class DynamicDisplayofChildRecords extends LightningElement {
  @api recordId;
  @api objectApiName;
  @track Refreshtheable;
  @track towardsComp = [];
  CheckList = {};
  Templatecond = [];
  @wire(contactrecords, { AccountIdfromcmp: "$recordId" })
  ContactData(result) {
    this.Refreshtheable = result;
    const { data, error } = result;
    if (data) {
      this.towardsComp = data;
      this.CheckList = Object.keys(data).length;
      console.log("length " + this.CheckList);
      this.Templatecond = this.CheckList >= 1 ? true : false;
      console.log(this.Templatecond);
      console.log("Total data" + JSON.stringify(this.towardsComp));
      //refreshApex(this.Refreshtheable);
    }
    if (error) {
      console.log(error);
    }
  }
  handleDelete(event) {
    deleteRecord(event.target.value)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
         refreshApex(this.Refreshtheable);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateRecordView() {

    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      // eslint-disable-next-line no-eval
      eval("$A.get('e.force:refreshView').fire();");
    }, 1000);
    refreshApex(this.Refreshtheable);
  }
}
