import { expect, type Locator, type Page } from '@playwright/test';

export class SanaLogin {
    readonly page: Page;
    newPage: Page | null;
    anotherPage: Page | null;

    //Login Locators
    readonly userField: Locator;
    readonly passField: Locator;
    readonly loginButton: Locator;
    readonly WebStoreView: Locator;
    
    // Admin Locators
    readonly products: Locator;
    readonly product_pages: Locator;
    readonly pdp_20041: Locator;
    readonly pdp_desktop_tab: Locator;
    readonly pdp_desktop_mousehover: Locator;
    readonly add_content: Locator;
    readonly CDSCAD: Locator;
    
    //
    readonly appCenter: Locator;
    readonly apps: Locator;
    readonly customApps: Locator;
    readonly addOnVerify: Locator;
    
    // Elementos de newPage
     catalog: Locator;
     searchbox: Locator;
     searchbutton: Locator;
     productdetails: Locator;
     chooseCAD: Locator;
     downloadCAD:Locator;
     clickOnProduct:Locator;
     click3dgen:Locator;
     specSheet:Locator;
     family:Locator;

    

    constructor(page: Page){
        this.page = page;
        this.newPage = null; // Inicialmente null, se asignará después del login
        this.anotherPage= null;
        
        //Login Elements
        this.userField = page.locator('#email');
        this.passField = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.WebStoreView = page.getByRole('link', { name: 'open_in_new View webstore' });

        // Admin Elements Configure Addon
        this.products = page.getByRole('button', { name: 'qr_code Products' });
        this.product_pages = page.getByRole('link', { name: 'Product pages', exact: true });
        this.pdp_20041 = page.getByRole('cell', { name: '2004-1', exact: true });
        this.pdp_desktop_tab = page.getByRole('button', { name: 'Desktop' });
        this.pdp_desktop_mousehover= page.frameLocator('iframe[title="contentPageEditor"]').getByText('1/4-20 SQUARE WELD NUT - SHORT PILOTopen_witheditdelete_outline‍‍‍‌‍‍ Item No.');
        this.add_content = page.frameLocator('iframe[title="contentPageEditor"]').locator('#c3z96cly1 > .Containers_wrapper > .Grid_container > .Grid_row > div:nth-child(2) > .Containers_content-box > .ColumnToolbar_panel > button');
        this.CDSCAD = page.getByText('CDSCAD').nth(1);

        //Admin Elements verify Addon
        this.appCenter = page.getByRole('button', { name: 'widgets App Center' });
        this.apps = page.getByRole('link', { name: 'Apps', exact: true });
        this.customApps = page.getByRole('link', { name: 'Custom apps' });
        this.addOnVerify= page.getByRole('row', { name: 'CDS CAD 1.0.5 Enabled delete' }).locator('label');




        // Inicializar los elementos de newPage con valores por defecto
        this.catalog = page.locator(''); // Selector vacío
        this.searchbox = page.locator(''); // Selector vacío
        this.searchbutton = page.locator(''); // Selector vacío
        this.clickOnProduct =page.locator('');
        this.chooseCAD =page.locator('');
        this.downloadCAD=page.locator('');
        this.click3dgen=page.locator('');
        this.specSheet=page.locator('');
        this.family=page.locator('');
    }
    async goto(){
        await this.page.goto('https://fastenerindustriesbeta.sana-cloud.net/admin/');
    }

    async doLogin(user: string, pass: string) {
        await this.userField.fill(user);
        await this.passField.fill(pass);
        await this.loginButton.click();
        await this.page.waitForTimeout(3000);
    }

    async verifyAddOn(){
        await this.appCenter.click();
        await this.apps.click();
        await this.customApps.click();
        await expect(this.addOnVerify).toBeVisible();
    }

    async CDSCADAddOnConfigure(){

        await this.products.click();
        await this.product_pages.click();
        await this.pdp_20041.click();
        await this.pdp_desktop_tab.click();
        //await this.page.waitForTimeout(10000);
        await this.pdp_desktop_mousehover.hover();
        await this.add_content.click();
        await this.CDSCAD.click();

        //Localizadores sin referencia aun 
        
        await this.page.locator('div').filter({ hasText: /^Download CADDefault:#FFFFFF$/ }).locator('div').nth(2).click();
        await this.page.locator('.saturation-black').click();
        await this.page.locator('div:nth-child(2) > .ColorPicker_body > .ColorPicker_swatch > .ColorPicker_color').click();
        await this.page.locator('.hue-horizontal').click();
        await this.page.locator('.saturation-black').click();
        await this.page.getByRole('button', { name: 'Advanced' }).click();
        await this.page.locator('#extras').getByRole('button', { name: 'Save changes' }).click();
        await this.page.getByRole('button', { name: 'Save changes' }).click();


    }

    async openWebStoreView() {
        // Este método se encarga de abrir la nueva pestaña (newPage)
        [this.newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            await this.WebStoreView.click()
        ]);

        // Esperar a que la nueva pestaña cargue
        await this.newPage.waitForLoadState();

        // Inicializar los elementos de newPage
        if (this.newPage) {
            this.catalog = this.newPage.getByRole('link', { name: 'Catalog' });
            this.searchbox = this.newPage.getByPlaceholder('Product name or item number...');
            this.searchbutton = this.newPage.getByLabel('Search products');
            this.clickOnProduct = this.newPage.locator('#searchPage_fykjy3jnn').getByRole('list').locator('div').filter({ hasText: '110-24 X 9/32" SPOTWELD T NUT' }).getByRole('link');
            this.chooseCAD = this.newPage.locator('#cds-cad-download-formats');
            this.downloadCAD = this.newPage.getByRole('button', { name: 'DOWNLOAD CAD' });
            this.click3dgen = this.newPage.locator('#cds-cad-view-3D-button');
            this.specSheet = this.newPage.getByRole('button', { name: 'VIEW SPEC SHEET' });
            this.family = this.newPage.getByRole('button', { name: 'VIEW FAMILY' });
        }
    }

    async searchProduct(){
        if(this.newPage){
            await this.catalog.click();
            await this.searchbox.click();
            await this.newPage.waitForTimeout(2000);
            await this.searchbox.fill('BFS 10244');
            await this.searchbutton.click();
            await this.clickOnProduct.click();

        }
    }

    // Métodos para interactuar con los elementos de newPage
    async CADGeneration() {
        if (this.newPage) {
            await this.chooseCAD.selectOption('41-prt');
            await this.downloadCAD.click();
        }
    }
    // Método para validar y hacer clic en el heading "Generation complete!"

    async validateAndClickHeading() {
        if (this.newPage) {
            const heading = this.newPage.getByRole('heading', { name: 'Generation complete!' });
            await expect(heading).toBeVisible({ timeout: 20000 });
            await heading.click();
        }
    }
   // Métodos para interactuar con los elementos de newPage 
    async cadModelGeneration(){
        if (this.newPage) {
            await this.click3dgen.click();
        }
    }

    // Métodos para interactuar con los elementos de newPage 

    async viewSpecSheet() {
        if (this.newPage) {
            // Esperar a que el botón de specSheet sea visible y clicable
            await expect(this.specSheet).toBeVisible({ timeout: 10000 });

            // Click en specSheet y esperar a que la nueva página se abra
            [this.anotherPage] = await Promise.all([
                this.newPage.waitForEvent('popup'),
                this.specSheet.click(),
                
            ]);

            // Verificar que anotherPage se ha abierto y ha cargado
            await this.anotherPage.waitForLoadState();
        }
    }

    async validateSpecSheet() {
        if (this.anotherPage) {
            await expect(this.anotherPage).toHaveURL(/.*specsheet.pdf/);
        }
    }
    async viewFamilySheet() {

        if (this.newPage) {
            // Verificar que el botón family es visible y clicable
            await expect(this.family).toBeVisible({ timeout: 10000 });
            await expect(this.family).toBeEnabled();

            console.log("Intentando hacer clic en 'family'");

            [this.anotherPage] = await Promise.all([
                this.newPage.waitForEvent('popup'),
                this.family.click()
            ]);

            console.log("Clic realizado en 'family'");

            // Verificar que anotherPage se ha abierto y ha cargado
            await this.anotherPage.waitForLoadState();
        }
       
    }

    async validateFamilySheet() {
        
        if (this.anotherPage) {
            await expect(this.anotherPage).toHaveURL(/.*spotweld-t-nut-slab-base.pdf/);
        }
    }
}
