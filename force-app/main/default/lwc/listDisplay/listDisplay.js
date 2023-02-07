import { LightningElement,wire,api,track} from 'lwc';
// Import message service features required for subscribing and the message channel
import {subscribe,unsubscribe,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import SearchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';
import insertContact from '@salesforce/apex/GitComponentController.insertContact';


import insertContact1 from '@salesforce/apex/GitComponentController.insertContact1';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Account from '@salesforce/schema/Account.Name';

const QUERY_USER_ENDPOINT_URL = 'https://api.github.com/search/users?q=';

export default class ListDisplay extends LightningElement {

    @api personName;

    selectedUser = '';
    selectedUserArray=[];

    retrievedUsers = [];

    retrivedUserName='';


    @api exposeToParentMethod(){
       console.log('called from parent');
    }


    @wire(getRecord, { recordId: '0012w00001HqTIvAAN', fields: 'Account.Name' })
    wiredRecord({ error, data }) {
    if(error){
      console.log(error) ;
    }else if(data){
      console.log(data);
      this.retriveduserName=data.fields.Name.value;
    }
    }


   subscription = null;

    @wire(MessageContext)
    messageContext;

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }


    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SearchMessage,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    async handleMessage(message){
        console.log('handleMessage',message);
        this.personName = message.SearchTerm;
        let queryEndpoint = QUERY_USER_ENDPOINT_URL+this.personName ;

        try{
        
            const RESPONSE = await fetch(queryEndpoint);
            const USER_LIST = await RESPONSE.json();
            console.log(USER_LIST.items);

            this.retrievedUsers= USER_LIST.items;
            
        }
        catch(error){
            console.log(error);
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleOnUserClicked(event){
        Console.log(event.detail);
        this.selectedUser = event.detail;
        alert(this.selectedUser);
    }

    get showUser(){
        return this.selectedUser.length !=0 ? true : false;
    }

   /* async handleSaveUserClick(){
        console.log('save user to SF database');

        try{
            const issuccess=await insertContact({contactName:this.selectedUser});
            console.log('created creation'+issuccess);
        }catch(error){
            console.log(error);
        }
        
    } */
      
       
    async handleSaveUserClick(){
        console.log('save user in SF');

                try{
        const issuccess=await insertContact1({accNameList:this.selectedUserArray});

        const evt = new ShowToastEvent({
            title: 'Records Saved',
            message: 'Records Saved',
            variant: 'info',
        });
        this.dispatchEvent(evt);
        
        console.log('created creation'+issuccess);
        }catch(error){
        console.log(error);
        }
    }
}  

