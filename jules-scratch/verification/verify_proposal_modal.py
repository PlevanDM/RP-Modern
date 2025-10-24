from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1920, 'height': 1080})
    page = context.new_page()
    page.goto("http://localhost:3000")

    # Login as a master
    page.click("text=Я майстер ремонту")
    page.wait_for_timeout(2000) # 2 second delay

    page.click("text=Доска Замовлень")
    page.wait_for_timeout(1000)

    # Click on the first order
    page.wait_for_selector(".space-y-3 > div:first-child")
    page.click(".space-y-3 > div:first-child")
    page.wait_for_timeout(1000)

    # Click on the "Розмістити пропозицію" button
    page.click("text=Розмістити пропозицію")
    page.wait_for_timeout(1000)

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
