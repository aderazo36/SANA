import { expect, type Locator, type Page } from '@playwright/test';

export class SwagLabsLogin {
    readonly page: Page;
    newPage: Page | null;
    anotherPage: Page | null;


    readonly userField: Locator;
    readonly passField: Locator;
    readonly loginButton: Locator;
    readonly WebStoreView: Locator;

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

        this.userField = page.locator('#email');
        this.passField = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.WebStoreView = page.getByRole('link', { name: 'open_in_new View webstore' });

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

    async doLogin(user: string, pass: string){
        await this.userField.fill(user);
        await this.passField.fill(pass);
        await this.loginButton.click();
        
        // Click on the link and wait for the new tab to be triggered

        [this.newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.WebStoreView.click()
        ]);

        // Wait for the new tab to load
        await this.newPage.waitForLoadState();

        // Inicializar los elementos de newPage
        if (this.newPage) {
            this.catalog = this.newPage.getByRole('link', { name: 'Catalog' });
            this.searchbox = this.newPage.getByPlaceholder('Product name or item number...');
            this.searchbutton = this.newPage.getByLabel('Search products')
            this.clickOnProduct=this.newPage.locator('#searchPage_fykjy3jnn').getByRole('list').locator('div').filter({ hasText: '110-24 X 9/32" SPOTWELD T NUT' }).getByRole('link');
            this.chooseCAD = this.newPage.locator('#cds-cad-download-formats');
            this.downloadCAD=this.newPage.getByRole('button', { name: 'DOWNLOAD CAD' });
            this.click3dgen=this.newPage.locator('#cds-cad-view-3D-button');
            this.specSheet=this.newPage.getByRole('button', { name: 'VIEW SPEC SHEET' });
            this.family=this.newPage.getByRole('button', { name: 'VIEW FAMILY' });

            
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
