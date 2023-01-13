import { api, LightningElement, wire} from 'lwc';
import retrivewrapperRec from '@salesforce/apex/RetriveAccountDetails.getWrapperRecord';
export default class ExampleWrapper extends LightningElement {
    @api recordId;
wrapperRecord;
@wire(retrivewrapperRec,{actRecordId:'$recordId'}) wrapperRec({error,data}){
    this.wrapperRecord=data;
}
}