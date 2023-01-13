import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
export default class Component22 extends NavigationMixin(LightningElement) {
    @api accountIdV;
    fields = [FNAME_FIELD, LNAME_FIELD, EMAIL_FIELD];
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.AccountId = this.accountIdV; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountIdV,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
     }
}