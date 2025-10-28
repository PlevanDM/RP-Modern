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

    # Print page content for debugging
    print(page.content())

    # Navigate to portfolio page
    page.get_by_role("button", name="Портфоліо").click()

    # Take screenshot of empty portfolio
    page.screenshot(path="jules-scratch/verification/portfolio-empty.png")

    # Add a new portfolio item
    page.get_by_role("button", name="Add New Item").click()
    page.get_by_label("Title").fill("Test Portfolio Item")
    page.get_by_label("Description").fill("This is a test portfolio item.")
    page.get_by_role("button", name="Create").click()

    # Take screenshot of portfolio with new item
    page.screenshot(path="jules-scratch/verification/portfolio-with-item.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
