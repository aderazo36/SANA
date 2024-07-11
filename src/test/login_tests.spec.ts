import { test, expect } from '@playwright/test';
import { SwagLabsLogin } from '../pages/LoginPage';
import { AddToCartFastenerInd } from '../pages/AddToCart';
import data1 from '../testdata/testdata.json';

test.describe("Feature: Login ", () => {
    //Arrange
    let loginPage : SwagLabsLogin;
    let AddToCart : AddToCartFastenerInd; 

    test.beforeEach(async ({ page }) => {

        loginPage = new SwagLabsLogin(page);
        //Act
        await loginPage.goto();
    });

    test('CAD Generation 1', async ({ page }) => {
        await loginPage.doLogin(data1.username,data1.password);
        await loginPage.searchProduct();
        await loginPage.CADGeneration();
        await loginPage.validateAndClickHeading();

    });

    test('3D Model CAD Generation', async ({ page }) => {
        await loginPage.doLogin(data1.username, data1.password);
        await loginPage.searchProduct();
        await loginPage.cadModelGeneration();
        await loginPage.validateAndClickHeading();
    });

    test('View Spec Sheet', async ({ page }) => {
        await loginPage.doLogin(data1.username, data1.password);;
        await loginPage.searchProduct();
        await loginPage.viewSpecSheet();
        await loginPage.validateSpecSheet();
    });

    test('View Family Sheet',async({page})=>{
        await loginPage.doLogin(data1.username, data1.password);
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