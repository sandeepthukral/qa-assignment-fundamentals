import {BasePage} from "./base.po";
import {Page} from "@playwright/test";

export class SavedSearchesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly header = this.page.getByRole('heading', { name: 'Bewaarde zoekopdrachten' });
    readonly firstSavedSearchName = this.page.locator('main.flex-1').getByRole('listitem').first().locator('h4')

}