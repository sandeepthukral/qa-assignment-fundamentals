import {BasePage} from "./base.po";
import {Page} from "@playwright/test";
import {user} from "../secrets/secrets";

export class LoginPage extends BasePage{
    constructor(page: Page) {
        super(page);
    }

    readonly email = this.page.getByLabel('E-mailadres');
    readonly password = this.page.getByLabel('Wachtwoord');
    readonly submitButton = this.page.getByRole('button', { name: 'Log in' });

    async loginAsUser(emailAddress, password) {
        await this.email.fill(emailAddress);
        await this.password.fill(password);
        await this.submitButton.click();
    }
}