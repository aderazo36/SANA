import { expect, type Locator, type Page } from '@playwright/test';
import { SanaLogin } from './SanaFastenerAddOn';

import { spec } from 'node:test/reporters';

export class SearchProduct
{
    readonly page:Page;
    readonly catalog:Locator;
    searchbox: Locator;
     searchbutton: Locator;
     productdetails: Locator;
     chooseCAD: Locator;
     downloadCAD:Locator;
     clickOnProduct:Locator;
     click3dgen:Locator;
     specSheet:Locator;
     family:Locator;

    constructor(newPage: Page) {

        this.page=newPage;

            this.catalog = this.page.getByRole('link', { name: 'Catalog' });
            this.searchbox = this.page.getByPlaceholder('Product name or item number...');
            this.searchbutton = this.page.getByLabel('Search products')
            this.clickOnProduct=this.page.locator('#searchPage_fykjy3jnn').getByRole('list').locator('div').filter({ hasText: '110-24 X 9/32" SPOTWELD T NUT' }).getByRole('link');
            this.chooseCAD = this.page.locator('#cds-cad-download-formats');
            this.downloadCAD=this.page.getByRole('button', { name: 'DOWNLOAD CAD' });
            this.click3dgen=this.page.locator('#cds-cad-view-3D-button');
            this.specSheet=this.page.getByRole('button', { name: 'VIEW SPEC SHEET' });
            this.family=this.page.getByRole('button', { name: 'VIEW FAMILY' });
    }

    async searchProduct(){
        await this.catalog.click({ force: true });
        await this.searchbox.click();
        await this.page.waitForTimeout(2000);
        await this.searchbox.fill('BFS 10244');
        await this.searchbutton.click();
        await this.clickOnProduct.click();



    }

}