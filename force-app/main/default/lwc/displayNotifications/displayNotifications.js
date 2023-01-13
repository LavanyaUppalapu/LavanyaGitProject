import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DisplayNotifications extends LightningElement {
    handleAlertClick(){
        LightningAlert.open({
        message: 'This is for showing Alert Message',
        theme:'success',
        variant: 'headerless',
        }).then((result) => {
        console.log('alert is closed');
        });
        }
        handleConfirmClick(){
        LightningConfirm.open({
            message: 'this is the confirm message',
            label: 'Please Confirm',
            theme: 'warning',
        }).then((result) => {
            console.log('confirm result', result);
        });
        }
        handlePromptClick(){
        // prompt
        LightningPrompt.open({
            message: 'this is the prompt message',
            defaultValue: 'test',
            label: 'Please Respond',
            // use default theme
        }).then((result) => {
            console.log('prompt result', result);
        });
        }
        showNotification(){
        const evt = new ShowToastEvent({
        title: 'Toast Message',
        message: 'showing toast message succesfully',
        variant: 'success',
        });
        this.dispatchEvent(evt);
        }
}