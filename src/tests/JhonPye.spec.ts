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

  await page.goto('https://johnpyesubastas.es/Browse/R100054339-C183360492-C217168966/ZARAGOZA-TECNOLOG%C3%8DA-Y-JUEGOS-PORT%C3%81TILES-MACBOOKS');
  // await page.getByRole('link', { name: 'ZARAGOZA' }).click();
  // await page.getByRole('link', { name: 'TECNOLOGÍA Y JUEGOS' }).click();

  // Select elements with class 'gallery_shortTitle'
  const elements = page.locator('.gallery_shortTitle');
  const prices = page.locator('.NumberPart');

  // Get the count of elements
  const elementsCount = await elements.count();
  const pricesCount = await prices.count();
  console.log(`Number of elements with class 'gallery_shortTitle':`, elementsCount);
  console.log(`Number of elements with class 'NumberPart':`, pricesCount);

  // Loop through each element and log its text
  for (let i = 0 , j = 0; i < elementsCount; i++ , j += 2) {
    const text = await elements.nth(i).textContent();
    const price = await prices.nth(j).textContent();
    if (text?.includes("ASUS") || text?.includes("MSI") || text?.includes("HP")) {
      console.log(`🥦 PUJA! ${i + 1}:`, text?.trim());
      console.log(`Precio:`, price?.trim());

    }
    // console.log(`Element ${i + 1}:`, text?.trim());
  }
});
