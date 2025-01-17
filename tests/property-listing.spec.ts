import { expect, test } from "../fixtures/test.fixture";
import { secretUserAgent } from "../secrets/secrets";
import { ContactListingRequest } from "../models/requests.model";

const cityName = 'Den Haag';

test.use({ userAgent: secretUserAgent});

test.describe('Property listing and contact options', async () => {

    test('Should list a single property and verify its listing details', async ({ homePage, searchResultsPage }) => {
        await homePage.searchPropertyAndSelectFirstSuggestion(cityName);

        const fullAddress = await searchResultsPage.addressOfFirstTopPositionListing.innerText()
        const cityAndPrice = await searchResultsPage.addressOfFirstTopPositionListing.locator('span').textContent();
        const onlyAddress = fullAddress.split(cityAndPrice)[0];

        await searchResultsPage.topPositionListingLinks.first().click();
        // assert that the correct property is loaded
        await expect(searchResultsPage.headingWithText(onlyAddress)).toBeVisible();

        // assert any other property details that are important to be verified.
    })

    test('Should be able to contact the property agent', async ({contactListingPage, homePage, listingPage, searchResultsPage, page}) => {
        await homePage.searchPropertyAndSelectFirstSuggestion(cityName);

        // select a random listing to display. I chose the first of the top position listings
        await searchResultsPage.topPositionListingLinks.first().click();
        await expect(listingPage.contactButton).toBeVisible();

        // extract the listing number and verify it later on the next page
        const listingUrl = listingPage.page.url();
        const listingNumberInListingUrl = listingUrl.split('/')[listingUrl.split('/').length - 2];

        // click the 'make contact' button
        await listingPage.contactButton.click();
        await expect(contactListingPage.pageHeading).toBeVisible();
        await expect(contactListingPage.successHeading).toBeHidden();

        // verify it is the correct listing
        // another way to do that would be to check the address on the two pages
        // but due to missing data-testids and no other reliable way to get the address
        // I chose this way to ensure I land on the page for the correct listing.
        const contactListingUrl = contactListingPage.page.url();
        const listingNumberInContactUrl = contactListingUrl.split('=').pop();
        expect(listingNumberInContactUrl).toEqual(listingNumberInListingUrl);

        // I observed that the form is not completely ready and have to wait.
        // If I do not wait, I can enter the question / message but not the other details of the form.
        await page.waitForTimeout(2000);

        const inputForContactForm: ContactListingRequest = {
            phoneNumber: '0611111111',
            message: 'brief',
            emailAddress: 'someone@gmail.com',
            firstName: 'first name',
            lastName: 'last name',
        }

        await contactListingPage.fillForm(inputForContactForm);

        // below we assert that the outgoing request has the correct payload
        // also, since this is production data, I am intercepting and fulfilling this request, so the makelaar does not get notified.
        // if we set up a test listing, we might skip this and just replace this with a page.waitForRequest() method instead.
        await page.route(/contact\/listings\/.*\/contact-request/, (route, request) => {
            const requestPayload = request.postDataJSON();
            expect(Object.keys(inputForContactForm).every(key => requestPayload[key] === inputForContactForm[key])).toBeTruthy();
            route.fulfill({ status: 204});
        })
        await contactListingPage.sendMessageButton.click();

        // assert that the success page is correctly displayed once the backend returns a 204 response.
        await expect(contactListingPage.successHeading).toBeVisible();
        await expect(page.getByText(inputForContactForm.emailAddress)).toBeVisible();
        await expect(page.getByText(inputForContactForm.phoneNumber)).toBeVisible();
    })
})