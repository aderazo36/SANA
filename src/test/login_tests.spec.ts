import { test, expect } from '@playwright/test';
import { SanaLogin } from '../pages/SanaFastenerAddOn';
import { SearchProduct } from '../pages/SearchProducts';
import data1 from '../testdata/testdata.json';

test.describe("Feature: Login ", () => {
    //Arrange
    let loginPage : SanaLogin;
    let searchProduct : SearchProduct; 


    test.beforeEach(async ({ page}) => {
        loginPage = new SanaLogin(page);
        const newPage =page;
        searchProduct = new SearchProduct(newPage);
        //Act
        await loginPage.goto();
    });


    test('CDSCAD Addon Verify', async ({ page },testinfo) => {

        await loginPage.doLogin(data1.username,data1.password);
        await testinfo.attach('login',{
            body: await page.screenshot(),
            contentType:'login/png'
        })

        await loginPage.verifyAddOn();
        await testinfo.attach('CDSCADverify',{
            body: await page.screenshot(),
            contentType:'CDSCADverify/png'
        })        
    });

    test('CDSCAD Addon Configuration', async ({ page },testinfo) => {

        await loginPage.doLogin(data1.username,data1.password);
        await testinfo.attach('login',{
            body: await page.screenshot(),
            contentType:'login/png'
        })

        await loginPage.CDSCADAddOnConfigure();
        await testinfo.attach('CDSCADConfigure',{
            body: await page.screenshot(),
            contentType:'CDSCADConfigure/png'
        })        
    });
 

    test('CAD Generation 1', async ({ page }) => {
        
        await loginPage.doLogin(data1.username,data1.password);
        await loginPage.openWebStoreView();
        //await searchProduct.searchProduct();
        await loginPage.searchProduct();
        await loginPage.CADGeneration();
        await loginPage.validateAndClickHeading();

    });

    test('3D Model CAD Generation', async ({ page }) => {
        await loginPage.doLogin(data1.username, data1.password);
        await loginPage.openWebStoreView();
        await loginPage.searchProduct();
        await loginPage.cadModelGeneration();
        await loginPage.validateAndClickHeading();
    });

    test('View Spec Sheet', async ({ page }) => {
        await loginPage.doLogin(data1.username, data1.password);
        await loginPage.openWebStoreView();
        await loginPage.searchProduct();
        await loginPage.viewSpecSheet();
        await loginPage.validateSpecSheet();
    });

    test('View Family Sheet',async({page})=>{
        await loginPage.doLogin(data1.username, data1.password);
        await loginPage.openWebStoreView();
        await loginPage.searchProduct();
        await loginPage.viewFamilySheet();
        await loginPage.validateFamilySheet();
    
    
    })


    test('Fail login @debug ',async ({ page }) => {
        test.fail();
        await loginPage.doLogin(data1.username, data1.password);
    
        //assert
        await expect(page, "He should see the inventory page").toHaveURL("https://fastenerindustriesbeta.sana-cloud.net/admin/");
        
        // expect( await loginPage.validateLokedMessage()).toContain('Sorry, this user has been locked out.')
    })
})