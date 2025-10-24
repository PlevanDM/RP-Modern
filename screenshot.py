from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:3002/")
    page.screenshot(path="landing_page_screenshot.png", full_page=True)
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
