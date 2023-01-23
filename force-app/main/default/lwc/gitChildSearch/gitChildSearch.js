import { LightningElement,api } from 'lwc';

export default class GitChildSearch extends LightningElement {

    @api fromParentName;

    @api logInConsole(){
       console.log('log in console');
    }

    @api notFromParentName;

    connectedCallback() {
        console.log('child connectedCallback');
    }
    renderedCallback() {
        console.log('child renderedCallback');
    }
}