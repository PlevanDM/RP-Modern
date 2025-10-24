from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the landing page
    page.goto("http://localhost:3000/")

    # Wait for the "Начать зарабатывать" button and click it to log in as a master
    master_login_button = page.get_by_role("button", name="Начать зарабатывать").first
    expect(master_login_button).to_be_visible()
    master_login_button.click()

    # Wait for the dashboard to load for the master user
    expect(page.get_by_role("heading", name="👋 Привіт, Олександр Петренко!")).to_be_visible()

    # Change the user's role to admin in local storage
    page.evaluate("""
        const user = JSON.parse(localStorage.getItem('auth-storage'));
        user.state.currentUser.role = 'admin';
        localStorage.setItem('auth-storage', JSON.stringify(user));
    """)

    # Reload the page to apply the new role
    page.reload()

    # Wait for the admin dashboard to load
    dashboard_header = page.get_by_role("heading", name="Admin Dashboard")
    expect(dashboard_header).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/admin_dashboard.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
