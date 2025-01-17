import { Page } from '@playwright/test';
import {ContactListingRequest} from "../models/requests.model";
import {BasePage} from "./base.po";

export class ContactListingPage extends BasePage{
    readonly pageHeading = this.page.getByRole('heading', { name: 'Neem contact op met de makelaar'});
    readonly successHeading = this.page.getByRole('heading', { name: 'Gelukt, je aanvraag is binnen' })
    readonly sendMessageButton = this.page.getByRole('button', { name: 'Verstuur bericht' });
    readonly inputQuestion = this.page.locator('#questionInput');
    readonly phoneNumber = this.page.locator('#phoneNumber');
    readonly emailAddress = this.page.locator('#emailAddress');
    readonly firstName = this.page.locator('#firstName');
    readonly lastName = this.page.locator('#lastName');

    constructor(page: Page) {
        super(page)
    }

    async fillForm(input: ContactListingRequest) {
        await this.inputQuestion.fill(input.message);
        await this.emailAddress.fill(input.emailAddress);
        await this.firstName.fill(input.firstName);
        await this.lastName.fill(input.lastName);
        await this.phoneNumber.fill(input.phoneNumber);
    }
}