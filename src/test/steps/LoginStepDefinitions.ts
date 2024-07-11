import { Given, When, Then } from "@cucumber/cucumber";
import { SwagLabsLogin } from '../../pages/LoginPage';
// import { test, expect } from '@playwright/test';
import { chromium, Page, Browser, expect} from '@playwright/test';
import { fixture } from "../../hooks/pageFixture";


// let browser : Browser;
// let page: Page;
let loginPage: SwagLabsLogin;


Given('The user is on login page', async function () {
   
    loginPage = new SwagLabsLogin(fixture.page);
    await loginPage.goto();
  });

When('he do the login with user {string} and password {string}', async function (userName, pass) {
    await loginPage.doLogin(userName,pass);
  });

Then('he should see the Webstore page', async function () {
    await expect(fixture.page).toHaveURL("https://fastenerindustriesbeta.sana-cloud.net/admin/");
    // browser.close()
  });

