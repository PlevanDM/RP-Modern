from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Click the "English" button
        page.get_by_role("button", name="English").click()

        # Click the "Guest" button
        page.get_by_role("button", name="Guest").click()

        # Click the "Каталог" button
        page.get_by_role("button", name="Каталог").click()

        # Click the "Apple" button
        page.get_by_role("button", name="Apple").click()

        # Click the "Смартфон" button
        page.get_by_role("button", name="Смартфон").click()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()
