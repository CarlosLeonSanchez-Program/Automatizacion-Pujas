import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

test('has title', async ({ page }) => {
  await page.goto('https://johnpye.es/');

  const aceptarCookies = async () => {
    const acceptCookiesButton = page.locator('button:has-text("Accept all cookies")');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
      console.log("✅ Cookies aceptadas");
    }
  };

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/John Pye Subastas/);

  await page.getByRole('link', { name: 'Iniciar sesión' }).click();
  aceptarCookies();
  await page.waitForTimeout(2000);

  await page.fill('input[name="username"]', process.env.USERNAME || '');
  await page.fill('input[name="password"]', process.env.PASSWORD || '');
  aceptarCookies();

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

