import {Locator, Page} from "@playwright/test";


export class Home {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly loginButton : Locator;
    readonly searchOnMap: Locator;
    readonly accountMenu : Locator;
    readonly savedSearchesLink : Locator
    readonly favoritesLink : Locator

    constructor(page: Page) {
        this.page = page;
        this.searchBox = this.page.locator('[data-testid="search-box"]');
        this.loginButton = this.page.getByRole('button', { name: 'Inloggen' });
        this.searchOnMap = this.page.getByLabel('Zoek op kaart');
        this.accountMenu = this.page.locator('button#headlessui-menu-button-v-0-24');
        this.savedSearchesLink = this.page.getByRole('link', { name: 'Bewaarde zoekopdrachten' });
        this.favoritesLink = page.locator('a').filter({ hasText: /^Favorieten$/ });
    }
}