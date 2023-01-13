import { LightningElement, track, wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ID_FIELD from '@salesforce/schema/Account.Id';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [NAME_FIELD, PHONE_FIELD];
export default class QuickAccountUpdate_uiapi extends LightningElement {
    @api recordId;
    Account;
    name;
    phone;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }){
        if (data) { 
            this.account = data;
            this.name = this.account.fields.Name.value;
            this.phone = this.account.fields.Phone.value;
        }
    }
    updateAccount() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accountt updated',
                    variant: 'success'
                })
            );
            eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    handlenameChange(event){
        this.name = event.target.value;
    }
    handlephoneChange(event){
        this.phone = event.target.value;
    }

}