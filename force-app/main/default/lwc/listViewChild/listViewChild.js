import { LightningElement,api } from 'lwc';

export default class ListViewChild extends LightningElement {
    @api retrievedUser;

    handleButtonClick(){
        alert('button clicked');

        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('userclicked', { detail: this.retrievedUser.login });

       // Dispatches the event.
        this.dispatchEvent(selectedEvent);

    }

}