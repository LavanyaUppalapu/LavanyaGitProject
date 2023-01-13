import { LightningElement,track,api} from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';
import insertContact from '@salesforce/apex/ContactController.insertContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent} from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';

import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
export default class QuickContactUnderAccountUsingApex extends LightningElement {
    @api recordId
  /*  @api invoke(){
        console.log("invoked",this.recordId) }*/
    @track error; 
    @track contactRecord = {
        [CONTACT_FIRSTNAME.fieldApiName]:'',
        [CONTACT_LASTNAME.fieldApiName]:'',
        [CONTACT_EMAIL.fieldApiName]:'',
        [ACCOUNTID_FIELD.fieldApiName] : this.AccountId
       // fields[accountFieldId.fieldApiName] = this.selectedAccountId;

    };
    handleFirstNameChange(event){       
        this.contactRecord[CONTACT_FIRSTNAME.fieldApiName] = event.target.value;
        //console.log('firstname change:::'+this.contactRecord.[CONTACT_FIRSTNAME.fieldApiName]);
        
    }
    handleLastNameChange(event){       
        this.contactRecord[CONTACT_LASTNAME.fieldApiName] = event.target.value;
        console.log('lastname change:::'+this.contactRecord[CONTACT_LASTNAME.fieldApiName]);

    }
    handleEmailChange(event){
        this.contactRecord[CONTACT_EMAIL.fieldApiName] = event.target.value;
        //console.log('Email change:::'+event.target.value);
    }

   
    createContactRecord(){
      //  alert('Hi');
        this.contactRecord[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
       /*  event.preventDefault();
          [CONTACT_FIRSTNAME.fieldApiName] = this.firstName;
            [CONTACT_LASTNAME.fieldApiName] = this.lastName;
            [CONTACT_EMAIL.fieldApiName] = this.Email;
            [ACCOUNTID_FIELD.fieldApiName] = this.AccountId;

        fields[accountFieldId.fieldApiName] = this.AccountId;
         fields[ACCOUNTID_FIELD.fieldApiName] = this.Contact.AccountId; 
        const Record = event.detail.Record;
        Record.AccountId = this.recordId;*/
        console.log('contactRecord:::');
        //console.log('contactRecord:::'+this.contactRecord);
        //console.log('contactRecord:::'+JSON.stringify(this.contactRecord));
        createContact({contactRec:this.contactRecord})
           
        .then(result=>{
           // alert('Hello');
            
           // console.log('am working:::');
           // this.contactRecord = {};
           //this.selectedAccountId = event.detail;
            this.dispatchEvent(new CloseActionScreenEvent());
            this.dispatchEvent(
                new ShowToastEvent({
                title: 'Success!',
                message: 'Contact Created Successfully!!',
                variant: 'success'
                
            })
            );
          /*  this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    objectApiName: 'Account',
                    actionName: 'view'
                    
                },
               }); */
                
           eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error=>{
           // console.log('am  not working:::'+error);
            this.error = error.message;
            
        });

    }
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}