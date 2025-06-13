import { test, expect, Page } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
    // Wait for page to be ready
    await page.waitForLoadState('domcontentloaded');
  });

  test('has correct title', async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle(/SmashLabs/);
  });

  test('hero section displays correctly', async ({ page }: { page: Page }) => {
    // Check hero title exists
    const heroTitle = page.getByRole('heading', { level: 1 });
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText(/Unleash|SmashLabs/);
  });

  test('navigation is present', async ({ page }: { page: Page }) => {
    // Check that navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for at least one navigation link
    const navLinks = page.locator('nav a, nav button');
    await expect(navLinks.first()).toBeVisible();
  });

  test('page loads without errors', async ({ page }: { page: Page }) => {
    // Check that main content is visible
    const main = page.locator('main, #main-content, [role="main"]');
    await expect(main.first()).toBeVisible();
    
    // Check that no major error messages are displayed
    const errorMessages = page.locator('text=/error|Error|ERROR/');
    await expect(errorMessages).toHaveCount(0);
  });

  test('basic responsive design', async ({ page }: { page: Page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Page should still be functional
    const heroTitle = page.getByRole('heading', { level: 1 });
    await expect(heroTitle).toBeVisible();
    
    // Reset to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(heroTitle).toBeVisible();
  });
}); 