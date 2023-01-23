import { LightningElement, wire,api,track} from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import SearchMessage from '@salesforce/messageChannel/gitSearchMessagingChannel__c';

export default class GitSearchBox extends LightningElement {
    searchText = 'lavanya';
   /* searchText;*/
    connectedCallback() {

      //  this.template.querySelector('c-git-child-search').logInConsole;

        console.log('parent connectedCallback');
    }
    renderedCallback() {
        console.log('parent renderedCallback');
    }
    //initialize the messaging context
    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    handleClick(event) {

        let inputValue = this.template.querySelectorAll("lightning-input")[0].value;
        console.log('gameengine time',inputValue);

        this.searchText = inputValue.toUpperCase();

        const payload = { isTermValid: true,SearchTerm: inputValue};

        publish(this.messageContext, SearchMessage, payload);
    }
}