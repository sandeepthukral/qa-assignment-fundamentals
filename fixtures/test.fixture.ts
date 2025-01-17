import {test as base} from "@playwright/test";
import {HomePage} from "../pages/homepage.po";
import {SearchResultsPage} from "../pages/search-results.po";
import {ListingPage} from "../pages/listing.po";
import {ContactListingPage} from "../pages/contact-listing.po";
import {LoginPage} from "../pages/login.po";
import {SavedSearchesPage} from "../pages/saved-searches.po";
import {FavoritesPage} from "../pages/favorites.po";
import {SearchFiltersSlide} from "../pages/search-filters.po";

type MyFixtures = {
    contactListingPage: ContactListingPage,
    favoritesPage: FavoritesPage,
    homePage: HomePage;
    listingPage: ListingPage;
    loginPage: LoginPage;
    savedSearchesPage: SavedSearchesPage;
    searchResultsPage: SearchResultsPage;
    searchFiltersSlide: SearchFiltersSlide;
};

export const test = base.extend<MyFixtures>({
    contactListingPage: async ({ page }, use) => {
        await use(new ContactListingPage(page));
    },

    favoritesPage: async ({ page }, use) => {
        await use(new FavoritesPage(page));
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.page.addLocatorHandler(page.getByLabel('Afwijzen en sluiten: Onze'), locator => locator.click());
        await homePage.page.goto('https://www.funda.nl');
        await use(homePage);
    },

    listingPage: async ({ page }, use) => {
        await use(new ListingPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    savedSearchesPage: async ({ page }, use) => {
        await use(new SavedSearchesPage(page));
    },

    searchResultsPage: async ({ page}, use) => {
        await use(new SearchResultsPage(page));
    },

    searchFiltersSlide: async ({ page }, use) => {
        await use(new SearchFiltersSlide(page));
    },
})

export { expect } from "@playwright/test";