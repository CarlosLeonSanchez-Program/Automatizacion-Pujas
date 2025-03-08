import { expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Declaro los datos de usuario
const user = {
    username: process.env.JP_USERNAME,
    password: process.env.JP_PASSWORD,
  
}

export class HomeObjects {
    readonly page: Page;

    // Declaro los elementos de la página que voy a utilizar
    readonly acceptCookiesButton: Locator
    readonly loginLink: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    // Declaro los datos de usuario
    
    constructor(page: Page) {
        this.page = page;

        this.acceptCookiesButton = page.locator('button:has-text("Accept all cookies")');
        this.loginLink = page.locator('a[class="fusion-button button-flat fusion-button-default-size button-custom fusion-button-default button-2 fusion-button-default-span fusion-has-button-gradient"] span[class="fusion-button-text"]');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Iniciar sesión"]');
    }

    async inputUserData() {

        await this.usernameInput.fill(user.username || 'pepe');
        await this.passwordInput.fill(user.password || 'pepe');

    }
    
    async acceptCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
        await this.acceptCookiesButton.click();
        console.log("✅ Cookies aceptadas");
        }
    }

    async acceptTerms() {
        if (await this.page.isVisible('input[name="terms"]')) {
        await this.page.check('input[name="terms"]');
        console.log("✅ Términos aceptados");
        }
    }

    async clickLogin() {
        await this.loginButton.click();
        console.log("✅ Iniciando sesión");
    }

    async goToLaptops(){

       let url = 'https://johnpyesubastas.es/Browse/R100054339-C183360492-C217168966/ZARAGOZA-TECNOLOG%C3%8DA-Y-JUEGOS-PORT%C3%81TILES-MACBOOKS';

        await this.page.goto(url);
    }

    async homeLoads() {
        await expect(this.page).toHaveTitle(/John Pye Subastas/);
    }
    
    
    async goToAuction() {
        await this.page.getByRole('link', { name: 'ZARAGOZA' }).click();
        await this.page.getByRole('link', { name: 'TECNOLOGÍA Y JUEGOS' }).click();
    }
    
}