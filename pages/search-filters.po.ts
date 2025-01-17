import {BasePage} from "./base.po";

export class SearchFiltersSlide extends BasePage {
    constructor(page) {
        super(page);
    }

    readonly slideHeader = this.page.locator('#FilterPanel-header');
    readonly typeWoonhuis = this.page.locator('label[for="checkbox-house"]');
    readonly selectedFilterObjectType = this.page.getByTestId('SelectedFilterobject_type');
    readonly filterSearchButton = this.page.getByTestId('FilterPanelFooterButton');


}