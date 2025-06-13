import { test, expect, Page } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
  });

  test('has correct title and meta description', async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle(/SmashLabs - Unleash Your Inner Beast/);
    
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Experience the ultimate stress relief/);
  });

  test('navigation works correctly', async ({ page }: { page: Page }) => {
    // Test navigation links
    await page.getByRole('button', { name: /about/i }).click();
    await expect(page.locator('#about')).toBeInViewport();
    
    await page.getByRole('button', { name: /experience/i }).click();
    await expect(page.locator('#experience')).toBeInViewport();
    
    await page.getByRole('button', { name: /packages/i }).click();
    await expect(page.locator('#packages')).toBeInViewport();
  });

  test('hero section displays correctly', async ({ page }: { page: Page }) => {
    // Check hero title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Unleash Your Inner Beast');
    
    // Check CTA button
    const ctaButton = page.getByRole('button', { name: /book your rage session/i });
    await expect(ctaButton).toBeVisible();
    
    // Test CTA button click
    await ctaButton.click();
    await expect(page.locator('#booknow')).toBeInViewport();
  });

  test('booking form submission', async ({ page }: { page: Page }) => {
    // Navigate to booking section
    await page.getByRole('button', { name: /book now/i }).click();
    
    // Fill out the form
    await page.getByLabel(/full name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/phone/i).fill('+1234567890');
    await page.getByLabel(/package/i).selectOption('group');
    await page.getByLabel(/preferred date/i).fill('2024-12-31');
    await page.getByLabel(/special requests/i).fill('Birthday celebration');
    
    // Submit form
    await page.getByRole('button', { name: /book now/i }).click();
    
    // Check for success message or loading state
    await expect(page.getByText(/booking request/i)).toBeVisible({ timeout: 10000 });
  });

  test('contact form submission', async ({ page }: { page: Page }) => {
    // Navigate to contact section
    await page.getByRole('button', { name: /contact/i }).click();
    
    // Fill out contact form
    await page.getByLabel(/name/i).fill('Jane Smith');
    await page.getByLabel(/email/i).fill('jane@example.com');
    await page.getByLabel(/subject/i).fill('General Inquiry');
    await page.getByLabel(/message/i).fill('I would like to know more about your services.');
    
    // Submit form
    await page.getByRole('button', { name: /send message/i }).click();
    
    // Check for success response
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 10000 });
  });

  test('mobile responsive design', async ({ page }: { page: Page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu toggle
    const menuButton = page.getByRole('button', { name: /open mobile menu/i });
    await expect(menuButton).toBeVisible();
    
    // Open mobile menu
    await menuButton.click();
    await expect(page.getByRole('menu')).toBeVisible();
    
    // Test navigation in mobile menu
    await page.getByRole('menuitem', { name: /about/i }).click();
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('accessibility compliance', async ({ page }: { page: Page }) => {
    // Test skip link functionality
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to main content');
    await expect(skipLink).toBeFocused();
    
    await skipLink.click();
    await expect(page.locator('#main-content')).toBeFocused();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Check for proper focus management
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('performance metrics', async ({ page }: { page: Page }) => {
    // Start timing
    const startTime = Date.now();
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check for critical images
    const heroImage = page.locator('img[alt*="SmashLabs"]').first();
    await expect(heroImage).toBeVisible();
  });

  test('smash animation interaction', async ({ page }: { page: Page }) => {
    // Find an element that triggers the smash animation
    const triggerElement = page.getByRole('button', { name: /book your rage session/i });
    
    // Click to trigger animation
    await triggerElement.click();
    
    // Wait for animation effects (particles, etc.)
    await page.waitForTimeout(1000);
    
    // Animation should not interfere with functionality
    await expect(page.locator('#booknow')).toBeInViewport();
  });

  test('social media links', async ({ page }: { page: Page }) => {
    // Check if social media links exist and are functional
    const socialLinks = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"]');
    const count = await socialLinks.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
      }
    }
  });
}); 