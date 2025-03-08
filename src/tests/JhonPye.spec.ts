import { test } from '@playwright/test';
import { HomeObjects } from './page-object/home';




let homeObjects: HomeObjects;


test.beforeEach(async ({ page }) => {
  homeObjects = new HomeObjects(page);
});

test('has title', async ({ page }) => {
  await page.goto('https://johnpye.es/');

  await homeObjects.acceptCookies();
  await homeObjects.homeLoads();

  //Llegamos a la página de login
  await homeObjects.loginLink.click();
  await homeObjects.acceptCookies();
  await page.waitForTimeout(2000);

  //Introducimos los datos del usuario
  await homeObjects.inputUserData();
  await homeObjects.acceptCookies();
  //Aceptar terminos y condiciones
  await homeObjects.acceptTerms();
  //Iniciar sesión
  await homeObjects.clickLogin();
  await homeObjects.goToLaptops();

  /*-----------------------------------------------------------*/

  // Select elements with class 'gallery_shortTitle'
  const elements = page.locator('.gallery_shortTitle');
  const prices = page.locator('.NumberPart');


  // Get the count of elements
  const elementsCount = await elements.count();
  const pricesCount = await prices.count();

  console.log(`Number of elements with class 'gallery_shortTitle':`, elementsCount);
  console.log(`Number of elements with class 'NumberPart':`, pricesCount);

  // Loop through each element and log its text

  for (let i = 0, j = 0; i < elementsCount; i++, j += 2) {

    const text = await elements.nth(i).textContent();
    const price = await prices.nth(j).textContent();

    if ((text?.includes("ASUS") || text?.includes("MSI") || text?.includes("HP")) && /PORT[ÁA]TIL/.test(text || '')) {

      await elements.nth(i).click();

      const specifications = await page.locator('.detail__title').textContent();

      if (!specifications?.includes("NO FUNCIONA")) {
        console.log(`🥦 PUJA! ${i + 1}:`, text?.trim());
        console.log(`💰 PRECIO: ${i + 1}:`, price?.trim());
      }

      await page.goBack();

    }
  }

});
