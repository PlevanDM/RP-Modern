from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in as master
    page.goto("http://localhost:3000")
    page.evaluate("() => localStorage.setItem('auth-storage', JSON.stringify({ state: { currentUser: { id: 'test-master-1', name: 'Test Master', email: 'master@test.com', role: 'master' }, isOnboardingCompleted: true } }))")
    page.goto("http://localhost:3000")

    # Wait for dashboard to load
    page.wait_for_selector('text=/Привіт, Test Master!/i')

    # Navigate to parts inventory page
    page.get_by_role("link", name="Запчастини").click()

    # Take screenshot of empty inventory
    page.screenshot(path="jules-scratch/verification/parts-inventory-empty.png")

    # Add a new part
    page.get_by_role("button", name="Add Part").click()
    page.get_by_label("Name").fill("Test Part")
    page.get_by_label("Description").fill("This is a test part.")
    page.get_by_label("Price").fill("100")
    page.get_by_label("Quantity").fill("10")
    page.get_by_role("button", name="Create").click()

    # Take screenshot of inventory with new part
    page.screenshot(path="jules-scratch/verification/parts-inventory-with-item.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
