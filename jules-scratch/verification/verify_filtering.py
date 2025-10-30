from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173")
    page.evaluate("() => localStorage.setItem('auth-storage', JSON.stringify({ state: { currentUser: { id: 'test-client-1', role: 'client' } } }))")
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Мої замовлення").click()
    page.get_by_placeholder("Пошук замовлень...").click()
    page.get_by_placeholder("Пошук замовлень...").fill("iphone")
    page.screenshot(path="jules-scratch/verification/filtering.png")
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
