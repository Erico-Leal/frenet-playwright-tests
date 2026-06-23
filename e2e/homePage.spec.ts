import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Frenet: frete barato e descomplicado para a sua loja virtual');
});
