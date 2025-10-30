
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            await page.goto("http://localhost:5173", wait_until="networkidle", timeout=20000)

            language_tests = {
                "uk": "🇺🇦",
                "en": "🇬🇧",
                "ru": "🇷🇺",
                "pl": "🇵🇱",
                "ro": "🇷🇴"
            }

            language_switcher_selector = (
                'button[title="Змінити мову"], '
                'button[title="Change Language"], '
                'button[title="Изменить язык"], '
                'button[title="Zmień język"], '
                'button[title="Schimbă limba"]'
            )

            for lang_code, flag in language_tests.items():
                print(f"--- Capturing screenshot for language: {lang_code.upper()} ---")

                # Open language switcher
                await page.locator(language_switcher_selector).click()

                # Click on the language button identified by its flag
                lang_button = page.locator(f'button:has(span:text-is("{flag}"))')
                await lang_button.click()
                await page.wait_for_timeout(1000)

                # Take screenshot
                await page.screenshot(path=f"jules-scratch/verification/verification_{lang_code}.png")
                print(f"--- Screenshot for {lang_code.upper()} captured ---")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="jules-scratch/verification/error_screenshot.png")
            raise

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
