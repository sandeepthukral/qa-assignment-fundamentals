import {BasePage} from "./base.po";
import {Page} from "@playwright/test";

export class FavoritesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly listOfFavorites = this.page.locator('main.flex-1').locator('li[global-id]');
    readonly firstFavoriteDeleteButton = this.listOfFavorites.first().locator('button[title="Verwijder uit favorieten"]');
}