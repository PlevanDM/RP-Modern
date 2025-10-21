import json
from playwright.sync_api import sync_playwright, Page, expect

def set_mock_admin_user(page: Page):
    """Injects a mock admin user into localStorage to simulate login."""
    admin_user = {
        "id": "admin-1",
        "name": "Адміністратор",
        "role": "admin",
        "email": "admin@repairhub.pro",
        "avatar": "https://i.pravatar.cc/150?img=1",
    }
    page.evaluate(f"localStorage.setItem('currentUser', JSON.stringify({json.dumps(admin_user)}));")

def verify_admin_settings_panel(page: Page):
    """
    Verifies that the Admin Settings Panel is accessible and visible
    for an admin user.
    """
    # 1. Arrange: Set mock admin user and go to the root page.
    page.goto("http://localhost:3000") # Go to a blank page first
    set_mock_admin_user(page)
    page.goto("http://localhost:3000/") # Navigate to the root to trigger app rendering
    page.wait_for_load_state("networkidle")

    # 2. Act: Navigate to the "Settings" page.
    settings_button = page.get_by_role("button", name="Налаштування")
    expect(settings_button).to_be_visible()
    settings_button.click()

    # 3. Assert: Verify the settings panel is displayed.
    expect(page.get_by_text("Адмін-панель: Налаштування")).to_be_visible()
    expect(page.get_by_label("Провайдер курсів валют:")).to_be_visible()
    expect(page.get_by_label("Комісія платформи (%):")).to_be_visible()

    # 4. Screenshot: Capture the Admin Settings Panel.
    page.screenshot(path="jules-scratch/verification/admin_settings_panel.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_admin_settings_panel(page)
            print("Verification script for Admin Settings Panel ran successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()
