import {BasePage} from "./base.po";
import {Page} from "@playwright/test";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly searchBox = this.page.getByTestId('search-box');
    readonly searchBoxSuggestions = this.page.getByTestId('SearchBox-location-suggestion');

    readonly loginButton = this.page.getByRole('button', { name: 'Inloggen' });
    readonly searchOnMap = this.page.getByLabel('Zoek op kaart');

    readonly accountMenu = this.page.locator('button#headlessui-menu-button-v-0-24');
    readonly accountMenuItemsContainer = this.page.locator('[data-testid="menu-accordion-content-container"][data-headlessui-state="open"]')
    readonly accountMenuItemsFirstList = this.accountMenuItemsContainer.locator('ul').first().locator('li');

    readonly savedSearchesLink = this.page.getByRole('link', { name: 'Bewaarde zoekopdrachten' });
    readonly favoritesLink = this.page.locator('a').filter({ hasText: /^Favorieten$/ });

    async searchPropertyAndSelectFirstSuggestion(searchTerm: string) {
        await this.searchBox.click();
        await this.searchBox.pressSequentially(searchTerm, {delay: 20});
        await this.searchBoxSuggestions.first().click();
    }
}