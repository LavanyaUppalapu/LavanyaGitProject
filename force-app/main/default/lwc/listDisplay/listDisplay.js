import { LightningElement,wire,api,track} from 'lwc';
// Import message service features required for subscribing and the message channel
import {subscribe,unsubscribe,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import SearchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';

const QUERY_USER_ENDPOINT_URL = 'https://api.github.com/search/users?q=';

export default class ListDisplay extends LightningElement {

    @api personName;

    retrievedUsers = [];

    @api exposeToParentMethod(){
       console.log('called from parent');
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
        this.personName = message.searchTerm;
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

}