import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import acclist from '@salesforce/apex/AccountRecordsListClass.AccountRecordsListClassMethod';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

const Columns = [
    { label: 'Name', fieldName: 'Name', type: 'Text', value: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber', type: 'Text', value: 'AccountNumber' },
    { label: 'Industry', fieldName: 'Industry', type: 'Picklist', value: 'Industry' },
    { label: 'Type', fieldName: 'Type', type: 'Picklist', value: 'Type' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', value: 'Phone' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'Currency', value: 'AnnualRevenue' }
];
export default class MultFilter extends LightningElement {
    @api objectApiName;
    @api Columns = Columns;
    Arraytotal = [{}];
    Operatorvalue;
    Accreclist;
    operator = [];
    Valuesssss;
    labelname = [];
    labelDatatype = [];
    Filtereddata;
    deepObject;
    modalpopping = false;
    modalvar(event) {
        this.modalpopping = true;
    }
    Handleclose(event) {
        this.modalpopping = false;
    }
    CaptureValue(event) {
        this.Valuesssss = event.detail.value;
    }
    @wire(acclist)
    accrec({ data, error }) {
        if (data) {
            console.log(data);
            this.Accreclist = data;
        }
        else if (error) {
            console.log(error);
        }
    }
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    ObjInfo({ data, error }) {
        if (data) {
            console.log('This is data' + JSON.stringify(data));
            let accountData = data;
            for (const [key, value] of Object.entries(accountData.fields)) {
                this.labelname.push(value.apiName);
                this.labelDatatype.push(value.dataType);
            }
            console.log('labelname' + this.labelname);
            console.log('labelDatatype' + this.labelDatatype);
            for (var i = 0; i < this.labelname.length; i++) {
                this.Arraytotal[this.labelname[i]] = this.labelDatatype[i];
            }
            //console.log('Array Total =>' + JSON.stringify(this.Arraytotal));
        }
        if (error) {
            console.error(error);
        }
    }
    Objectfieldschange(event) {
        this.deepObject = event.detail.value;  // apiname
        console.log('Column detail value : ' + this.deepObject);
        for (var key of Object.keys(this.Arraytotal)) {
            console.log(key + " => " + JSON.stringify(this.Arraytotal[key]));
            console.log('True or false  is ' + (this.deepObject === key));
            //let t =  key;
            if (this.deepObject === key) {
                switch (this.Arraytotal[key]) {
                    case 'String':
                        this.operator = [
                            { label: 'Equals', value: 'equal' },
                            { label: 'Not Equal', value: 'not equal' },
                            { label: 'Contains', value: 'LIKE' }
                        ];
                        break;
                    case 'Phone':
                    case 'Picklist':
                        this.operator = [
                            { label: 'Equals', value: 'equals' },
                            { label: 'Not Equal', value: 'not equal' }
                        ];
                        break;
                    case 'Currency':
                        this.operator = [
                            { label: 'Equals', value: 'equal' },
                            { label: 'Not Equal', value: 'not equal' },
                            { label: 'Less Than', value: 'less than ' },
                            { label: 'Less or Equal', value: 'less or equal' },
                            { label: 'Greater Than', value: 'greater' },
                            { label: 'Greater or Equal', value: 'greater or equal' }
                        ];
                        break;
                }
            }
        }
    }
    Operatorvaluescapture(event) {
        this.Operatorvalue = event.target.value;
    }
    Addfilteraction(event) {
        this.Filtereddata = event.target.value;
    }
}