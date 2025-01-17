import {Page} from "@playwright/test";

export abstract class BasePage {
    protected constructor(
        readonly page: Page,
    ) {}
}