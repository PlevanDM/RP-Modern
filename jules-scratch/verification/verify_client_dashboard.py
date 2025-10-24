from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the landing page
    page.goto("http://localhost:3000/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(5000) # Add a 5 second wait

    # Wait for the "Найти мастера" button and click it to log in as a client
    client_login_button = page.get_by_role("button", name="Найти мастера").first
    expect(client_login_button).to_be_visible()
    client_login_button.click()

    # Wait for the dashboard to load for the client user
    expect(page.get_by_role("heading", name="👋 Привіт, Володимир Петров!")).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/client_dashboard.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
