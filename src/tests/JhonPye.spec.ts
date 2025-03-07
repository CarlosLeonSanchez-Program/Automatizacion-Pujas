import { test, expect } from '@playwright/test';
import { HomeObjects } from './page-object/home';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let homeObjects: HomeObjects;

const user = {
  username: process.env.JP_USERNAME || '',
  password: process.env.JP_PASSWORD || ''
}

test.beforeEach(async ({ page }) => {
  homeObjects = new HomeObjects(page);
});

test('has title', async ({ page }) => {
  await page.goto('https://johnpye.es/');

  await homeObjects.acceptCookies();
  await homeObjects.homeLoads();

  await homeObjects.loginLink.click();
  await homeObjects.acceptCookies();
  await page.waitForTimeout(2000);

  await page.fill('input[name="username"]', user.username || '');
  await page.fill('input[name="password"]', user.password || '');
  await homeObjects.acceptCookies();

  await page.check('input[name="terms"]');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'ZARAGOZA' }).click();
  await page.getByRole('link', { name: 'TECNOLOGÍA Y JUEGOS' }).click();


  const links = page.locator('a:has-text("PORTÁTIL")');
  const count = await links.count();
  for (let i = 0; i < count; i++) {

    if(links[i].textContent().includes("ASUS")){
      await links.nth(i).click();
      await page.waitForTimeout(5000);
    }
    if(links[i].textContent().includes("MSI")){
      await links.nth(i).click();
      await page.waitForTimeout(5000);
    }
    if(links[i].textContent().includes("HP")){
      await links.nth(i).click();
      await page.waitForTimeout(5000);
    }
  }
});

