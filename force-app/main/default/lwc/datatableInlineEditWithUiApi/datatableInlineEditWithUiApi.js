import { LightningElement, wire, api,track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ID_FIELD from '@salesforce/schema/Contact.Id';

const COLS = [
    {
        label: 'First Name',
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        editable: true
    },
    {
        label: 'Last Name',
        fieldName: LASTNAME_FIELD.fieldApiName,
        editable: true
    },
   /* { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, editable: true },*/
    {
        label: 'Phone',
        fieldName: PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: true
    },
    {
        label: 'Email',
        fieldName: EMAIL_FIELD.fieldApiName,
        type: 'email',
        editable: true
    }
];
export default class DatatableInlineEditWithUiApi extends LightningElement {
    @api recordId;
    columns = COLS;
    draftValues = [];

   /* wiredTask({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
         //console.log('this.contacts'+JSON.stringify(this.contacts));
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }*/

    @wire(getContacts, { accountId: '$recordId' })
    contacts;
    //console.log('contacts:::');
    //console.log('contactRecord:::'+this.contactRecord);
    //console.log('contacts:::'+JSON.stringify(this.contacts));
   // console.log('this.con'+JSON.stringify(contacts));
  // console.log(">>> contacts... "+contacts);

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const records = event.detail.draftValues.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>
                updateRecord(record)
            );
            await Promise.all(recordUpdatePromises);

            // Report success with a toast
            this.dispatchEvent(new CloseActionScreenEvent());
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts updated',
                    variant: 'success'
                })
            );
            eval("$A.get('e.force:refreshView').fire();");

            // Display fresh data in the datatable
            await refreshApex(this.contacts);
        } 
        catch (error) {
            this.dispatchEvent(new CloseActionScreenEvent());
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading contacts',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}