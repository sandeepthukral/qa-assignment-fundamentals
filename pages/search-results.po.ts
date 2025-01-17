import {BasePage} from "./base.po";
import {expect, Page} from "@playwright/test";
import {executionAsyncId} from "node:async_hooks";

export class SearchResultsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    headingWithText(text: string) {
        return this.page.getByRole('heading', { name: text , exact: true });
    }

    readonly topPositionWrapper = this.page.getByTestId('top-position-wrapper');
    readonly topPositionListings = this.topPositionWrapper.getByTestId('top-position-listing');
    readonly topPositionListingLinks = this.page.getByTestId('top-position-wrapper').locator('a');
    readonly addressOfFirstTopPositionListing = this.page.getByTestId('top-position-wrapper').locator('a').first().locator('h2 p')

    readonly filtersMenu = this.page.getByRole('button', { name: 'Filters' });
    readonly savedSearchResultsMenu = this.page.getByRole('button', { name: 'Bewaar zoekopdracht' });
    readonly relevantMenu = this.page.getByRole('button', { name: 'Relevantie' });
}