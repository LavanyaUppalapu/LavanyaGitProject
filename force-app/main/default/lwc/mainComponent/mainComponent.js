import { LightningElement, api, track} from 'lwc';
export default class MainComponent extends LightningElement {
    @api accId;
    @track checkBoolean = true;
    handleChild(event){
        this.accId = event.detail.AccountIdVal;
        this.checkBoolean = false;
    }
}