import { test, expect } from '../fixtures/test.fixture';
import {secretUserAgent} from "../secrets/secrets";

test.use({ userAgent: secretUserAgent});

const cityName = 'Den Haag';

test.describe('Searching for houses tests', async () => {

    test('Should search for properties in a city and filter on type of property', async ({ homePage, page, searchFiltersSlide, searchResultsPage}) => {
        await homePage.searchBox.click();
        await homePage.searchBox.pressSequentially(cityName, {delay: 20});

        await expect(homePage.searchBoxSuggestions).toHaveCount(10);
        await expect(homePage.searchBoxSuggestions.first()).toHaveText("Den Haag Plaats in Zuid-Holland");
        await homePage.searchBoxSuggestions.first().click();

        // this URL below is not reproducible.
        // Sometimes it (eventually) navigates to URL with query string selected_area=["den-haag"],
        // sometimes it remains at the URL with query string selected_area=%5B%22den-haag%22%5D
        // and sometimes selected_area=%5B"den-haag"%5D
        await page.waitForURL(/selected_area=.*den-haag.*$/);
        console.log(decodeURI(page.url()));

        // this next locator is visible when the URL has query string selected_area=["den-haag"]
        // but when the URL has query string selected_area=%5B%22den-haag%22%5D then this data-testID is missing
        await expect(searchResultsPage.headingWithText(`Koopwoningen in ${cityName}`)).toBeVisible();

        // assert that the top positions wrapper is correctly displayed
        await expect(searchResultsPage.topPositionWrapper).toBeVisible();
        await expect(searchResultsPage.topPositionListings).toHaveCount(3);

        await expect(searchResultsPage.filtersMenu).toBeVisible();
        await expect(searchResultsPage.savedSearchResultsMenu).toBeVisible();
        await expect(searchResultsPage.relevantMenu).toBeVisible();

        // filter for type 'woonhuis'
        // this can also be a separate test
        await searchResultsPage.filtersMenu.click();
        await expect(searchFiltersSlide.slideHeader).toBeVisible();

        const housesText = await searchFiltersSlide.typeWoonhuis.innerText();
        const countOfHouses = housesText.split(/\s+/).pop();

        await searchFiltersSlide.typeWoonhuis.click();
        await searchFiltersSlide.selectedFilterObjectType.isVisible();

        await expect(searchFiltersSlide.selectedFilterObjectType).toHaveText('Woonhuis');

        // this code will fail for count > 1000, due to the use of comma decimal.
        // One can make a helper / util function to transform the number in comma decimal format
        await expect(searchFiltersSlide.filterSearchButton).toHaveText(`Toon ${countOfHouses} resultaten`);
        await searchFiltersSlide.filterSearchButton.click();

        await expect(searchFiltersSlide.slideHeader).toBeHidden();
        expect(decodeURI(page.url()).endsWith('&object_type=["house"]')).toBe(true);

        // assert that the filter seems to have worked correctly
        const pageHeaderText = await page.getByTestId('pageHeader').innerText();
        expect(pageHeaderText.split(/\s+/)[0]).toEqual(countOfHouses);
    })
})



