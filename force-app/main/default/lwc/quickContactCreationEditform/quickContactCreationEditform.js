import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { CloseActionScreenEvent } from 'lightning/actions';
export default class QuickContactCreationEditform extends LightningElement {
    @api recordId;
    @api Contacts;
    handleSuccess(event) {
        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(
            new ShowToastEvent({
            title: "Contact Creation",
            message: "Contact is created successfully",
            variant: "success"
        })
        ); 
        eval("$A.get('e.force:refreshView').fire();"); 
      /* this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            }, 
        }); */
    } 
        handleReset(event){
            const inputFields = this.template.querySelectorAll('lightning-input-field');
            if (inputFields) {
                inputFields.forEach(field => {
                     field.reset();
                });
            }    
        }
        
        
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}