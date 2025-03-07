import { expect, type Locator, type Page } from '@playwright/test';

export class HomeObjects {
    readonly page: Page;

    // Declaro los elementos de la página que voy a utilizar
    readonly acceptCookiesButton: Locator
    readonly loginLink: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    
    constructor(page: Page) {
        this.page = page;

        this.acceptCookiesButton = page.locator('button:has-text("Accept all cookies")');
        this.loginLink = page.locator('a[class="fusion-button button-flat fusion-button-default-size button-custom fusion-button-default button-2 fusion-button-default-span fusion-has-button-gradient"] span[class="fusion-button-text"]');
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button:has-text("Iniciar sesión")');
    }
    
    async acceptCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
        await this.acceptCookiesButton.click();
        console.log("✅ Cookies aceptadas");
        }
    }

    async homeLoads() {
        await expect(this.page).toHaveTitle(/John Pye Subastas/);
    }
    
    async login(username: string, password: string) {
        await this.page.getByRole('link', { name: 'Iniciar sesión' }).click();
        await this.acceptCookies();
        await this.page.waitForTimeout(2000);
    
        await this.page.fill('input[name="username"]', username || '');
        await this.page.fill('input[name="password"]', password || '');
        await this.acceptCookies();
    
        await this.page.check('input[name="terms"]');
        await this.page.getByRole('button', { name: 'Iniciar sesión' }).click();
    }
    
    async goToAuction() {
        await this.page.getByRole('link', { name: 'ZARAGOZA' }).click();
        await this.page.getByRole('link', { name: 'TECNOLOGÍA Y JUEGOS' }).click();
    }
    
    async selectProduct(product: string) {
        const links = this.page.locator('a:has-text("' + product + '")');
        const count = await links.count();
        for (let i = 0; i < count; i++) {
    
        if (links[i].textContent().includes("ASUS")) {
            await links.nth(i).click();
            await this.page.waitForTimeout(5000);
        }
        if (links[i].textContent().includes("MSI")) {
            await links.nth(i).click();
            await this.page.waitForTimeout(5000);
        }
        if (links[i].textContent().includes("HP")) {
            await links.nth(i).click();
            await this.page.waitForTimeout(5000);
        }
        }
    }
}