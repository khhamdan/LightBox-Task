const { test, expect } = require('@playwright/test');

test.describe('LightBoxContainer', () => {
	test('should render buttons correctly', async ({ page }) => {
		await page.goto('http://localhost:3000');
		const nextButton = await page.locator('text=Next');
		const prevButton = await page.locator('text=Previous');

		await expect(nextButton).toBeVisible();
		await expect(prevButton).toBeVisible();
		await expect(prevButton).toBeDisabled();
	});
});

test('should generate new colors when Next is clicked', async ({ page }) => {
	await page.goto('http://localhost:3000');
	const nextButton = await page.locator('text=Next');
	const boxesBefore = await page.locator('[style*="background-color"]').all();

	const colorsBefore = await Promise.all(
		boxesBefore.map((box) =>
			box.evaluate((node) => node.style.backgroundColor)
		)
	);

	// Click the "Next" button
	await nextButton.click();

	// Allow time for the colors to change
	await page.waitForTimeout(100); // Small delay to ensure DOM updates

	const boxesAfter = await page.locator('[style*="background-color"]').all();
	const colorsAfter = await Promise.all(
		boxesAfter.map((box) =>
			box.evaluate((node) => node.style.backgroundColor)
		)
	);

	expect(boxesBefore.length).toBe(3);
	expect(boxesAfter.length).toBe(3);

	// Adding a loop to retry up to 3 times if the colors are the same
	let retryCount = 0;
	while (
		colorsBefore.toString() === colorsAfter.toString() &&
		retryCount < 3
	) {
		await nextButton.click();
		await page.waitForTimeout(100);
		const newBoxesAfter = await page
			.locator('[style*="background-color"]')
			.all();
		colorsAfter = await Promise.all(
			newBoxesAfter.map((box) =>
				box.evaluate((node) => node.style.backgroundColor)
			)
		);
		retryCount++;
	}

	// Check that the new colors are not the same as the previous ones
	expect(colorsBefore).not.toEqual(colorsAfter);
});
