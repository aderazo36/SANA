import { expect, type Locator, type Page } from '@playwright/test';
import { spec } from 'node:test/reporters';

export class AddToCartFastenerInd
{
    readonly page:Page;
    readonly catalog:Locator;

    constructor(page: Page) {

        this.catalog = this.page.locator('//*[@id="Nav_3mkpytrog"]/ul/li[2]/a');
    }

    async addToCart(){

        await this.catalog.click();
    }

}