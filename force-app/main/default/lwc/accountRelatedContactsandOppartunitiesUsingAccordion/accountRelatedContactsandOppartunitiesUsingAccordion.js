import { LightningElement, track, wire, api } from 'lwc';
import getContactData from '@salesforce/apex/AccountController.getContactData';
import getOpportunityData from '@salesforce/apex/AccountController.getOpportunityData';
    
    export default class AccountRelatedContactsandOppartunitiesUsingAccordion extends LightningElement {
        @track multiple = true;
        @track accounts ;
        @track contacts;
        @track opportunities ;
        @api recordId;
        
        @wire(getContactData, {accountId: '$recordId'})   
    wiredAccountss({
        error,
        data
    }) {
        if (data) {
            this.Contacts = data;
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
            
            data.forEach(function (item, key) {
                console.log(key); 
                console.log(item); 
            });
            
        } 
        else if (error) {
            this.error = error;
        }
    }
    
    @wire(getOpportunityData, {accountId: '$recordId'}) 
    wiredOpp({
        error,
        data
    }) {
        if (data) {
            this.opportunities = data;
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
            
            data.forEach(function (item, key) {
                console.log(key); 
                console.log(item); 
            });
            
        } else if (error) {
            this.error = error;
        }
    }
    }