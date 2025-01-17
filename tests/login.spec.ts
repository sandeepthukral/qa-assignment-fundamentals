import {expect, test} from "../fixtures/test.fixture";
import {secretUserAgent, user} from "../secrets/secrets";

test.use({ userAgent: secretUserAgent });

test('Should be able to login to Funda', async ({homePage, loginPage}) => {
    await homePage.loginButton.click();

    await loginPage.loginAsUser(user.emailAddress, user.password);

    await expect(homePage.accountMenu).toBeVisible();
    await homePage.accountMenu.click();

    await expect(homePage.savedSearchesLink).toBeVisible();
    await expect(homePage.accountMenuItemsContainer).toBeVisible();
    await expect(homePage.accountMenuItemsFirstList).toHaveCount(4);

    // any other validations that are deemed important
})