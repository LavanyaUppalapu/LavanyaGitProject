import { LightningElement,track,api} from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
export default class ChildContactList extends LightningElement {

    @api recordId
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

   
    createContactRecord(event){
      //  alert('Hi');
        this.contactRecord[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
       //  event.preventDefault();

         /* Creates the event with the contact ID data.
         const selectedEvent = new CustomEvent('selected', { detail: this.recordId });
         this.dispatchEvent(selectedEvent); */

        console.log('contactRecord:::');
        //console.log('contactRecord:::'+this.contactRecord);
        //console.log('contactRecord:::'+JSON.stringify(this.contactRecord));
        createContact({contactRec:this.contactRecord})
           
        .then(result=>{

           // alert('Hello');     
           // console.log('am working:::');
           // this.contactRecord = {};
           // this.dispatchEvent(new CloseActionScreenEvent());
            this.dispatchEvent(
                new ShowToastEvent({
                title: 'Success!',
                message: 'Contact Created Successfully!!',
                variant: 'success'
                
            })
            );
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    objectApiName: 'Account',
                    actionName: 'view'
                    
                },
               }); 
                
           eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error=>{
           // console.log('am  not working:::'+error);
            this.error = error.message;
            
        });

    }
}