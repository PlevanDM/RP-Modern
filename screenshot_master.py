from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:3002/")
    page.get_by_role("button", name="Начать зарабатывать").first.click()
    page.screenshot(path="master_onboarding_step1.png")
    page.get_by_role("button", name="Далее").click()
    page.screenshot(path="master_onboarding_step2.png")
    page.get_by_role("button", name="Далее").click()
    page.screenshot(path="master_onboarding_step3.png")
    page.get_by_role("button", name="Далее").click()
    page.screenshot(path="master_onboarding_step4.png")
    page.get_by_role("button", name="Далее").click()
    page.screenshot(path="master_onboarding_step5.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
