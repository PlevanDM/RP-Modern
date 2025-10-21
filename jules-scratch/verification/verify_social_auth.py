from playwright.sync_api import sync_playwright, Page, expect

def verify_social_auth_buttons(page: Page):
    """
    This test verifies that the social and phone authentication buttons
    are visible in both the login and register modals.
    """
    # 1. Arrange: Go to the application's landing page.
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")


    # 2. Act: Open the Login Modal and verify buttons.
    # Use a more specific CSS selector to target the login button.
    login_button = page.locator("nav button:has-text('Вхід')")
    login_button.click()

    # 3. Assert: Check for the presence of social login buttons in the Login Modal.
    # Wait for the modal to be visible before proceeding.
    expect(page.get_by_text("Вход в аккаунт")).to_be_visible()

    # Verify each social button is present.
    expect(page.get_by_role("button", name="Sign in with Google")).to_be_visible()
    expect(page.get_by_role("button", name="Sign in with Telegram")).to_be_visible()
    expect(page.get_by_role("button", name="Sign in with phone")).to_be_visible()

    # 4. Screenshot: Capture the state of the Login Modal.
    page.screenshot(path="jules-scratch/verification/login_modal_with_social_buttons.png")

    # 5. Act: Close the Login Modal and open the Register Modal.
    # For simplicity, we can reload the page to reset the state.
    page.reload()

    register_button = page.locator("nav button:has-text('Реєстрація')")
    register_button.click()

    # 6. Assert: Check for social login buttons in the Register Modal.
    expect(page.get_by_text("Регистрация")).to_be_visible()
    expect(page.get_by_role("button", name="Sign up with Google")).to_be_visible()
    expect(page.get_by_role("button", name="Sign up with Telegram")).to_be_visible()
    expect(page.get_by_role("button", name="Sign up with phone")).to_be_visible()

    # 7. Screenshot: Capture the state of the Register Modal.
    page.screenshot(path="jules-scratch/verification/register_modal_with_social_buttons.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_social_auth_buttons(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()
