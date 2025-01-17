import {BasePage} from "./base.po";
import {Page} from "@playwright/test";

export class ListingPage extends BasePage{
    constructor(page: Page) {
        super(page);
    }

    readonly contactButton = this.page.getByRole('link', { name: 'Neem contact op' }).first();
}