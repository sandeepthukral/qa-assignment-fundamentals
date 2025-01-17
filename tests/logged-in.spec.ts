import {expect, test} from "../fixtures/test.fixture";
import {secretUserAgent, user} from "../secrets/secrets";
import {SavedSearchResponse} from "../models/responses.model";

test.use({ userAgent: secretUserAgent });

test.describe('Tests for a logged in user', async () => {
    test('Should show saved searches for the logged-in user', async ({ homePage, loginPage, savedSearchesPage }) => {
        await homePage.loginButton.click();
        await loginPage.loginAsUser(user.emailAddress, user.password);
        await homePage.accountMenu.click();

        // read the response from the saved searches endpoint
        const savedSearchResponsePromise = homePage.page.waitForResponse(/api\/.*\/savedsearches\//);
        await homePage.savedSearchesLink.click();
        const savedSearchResponse = await ((await savedSearchResponsePromise).json()) as SavedSearchResponse;
        expect((savedSearchResponse).savedSearches.length).toBe(2);

        // assert that the saved searches page is loaded and displayed correctly
        await expect(savedSearchesPage.header).toBeVisible();
        await savedSearchesPage.header.click();

        // this assertion is better saved for an integration test at a lower level
        await expect(savedSearchesPage.firstSavedSearchName).toHaveText(savedSearchResponse.savedSearches[0].name);

        // assert any other details that are important to be verified.
    })
})
