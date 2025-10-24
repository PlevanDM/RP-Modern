from playwright.sync_api import sync_playwright

def run(playwright):
    # Desktop
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1920, 'height': 1080})
    page = context.new_page()
    page.goto("http://localhost:3000")
    page.click("text=Я шукаю майстра")
    page.wait_for_timeout(1000)
    page.click("text=Мої Замовлення")
    page.wait_for_timeout(1000)
    page.screenshot(path="jules-scratch/verification/desktop.png")

    # Tablet
    context = browser.new_context(viewport={'width': 768, 'height': 1024})
    page = context.new_page()
    page.goto("http://localhost:3000")
    page.click("text=Я шукаю майстра")
    page.wait_for_timeout(1000)
    page.click("text=Мої Замовлення")
    page.wait_for_timeout(1000)
    page.screenshot(path="jules-scratch/verification/tablet.png")

    # Mobile
    context = browser.new_context(viewport={'width': 375, 'height': 667})
    page = context.new_page()
    page.goto("http://localhost:3000")
    page.click("text=Я шукаю майстра")
    page.wait_for_timeout(1000)
    page.click('button[aria-label="Open menu"]')
    page.wait_for_timeout(1000)
    page.click("text=Мої Замовлення")
    page.wait_for_timeout(1000)
    page.screenshot(path="jules-scratch/verification/mobile.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
