import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class Component1 extends LightningElement {
    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
    handleSuccess(event) {
        const event1 = new CustomEvent('child', {
            // detail contains only primitives
            detail: {AccountIdVal:event.detail.id}
            });
        this.dispatchEvent(event1);
    }
}