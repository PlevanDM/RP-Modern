import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Create a directory for screenshots if it doesn't exist
        os.makedirs("jules-scratch/verification", exist_ok=True)

        languages = ["uk", "en", "pl", "ro"]
        for lang in languages:
            await page.goto("http://localhost:5173")

            # Set language in localStorage
            await page.evaluate(f"localStorage.setItem('i18nextLng', '{lang}')")

            await page.reload()

            # Wait for the page to load
            await page.wait_for_load_state('networkidle')

            await page.screenshot(path=f"jules-scratch/verification/landing_page_{lang}.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
