import json
from playwright.sync_api import sync_playwright, Page, expect

def set_mock_user(page: Page):
    """Injects a mock master user into localStorage to simulate login."""
    master_user = {
        "id": "master-123",
        "name": "Тестовий Майстер",
        "role": "master",
        "email": "master@test.com",
        "phone": "+380991234567",
        "city": "Київ",
        "avatar": "https://i.pravatar.cc/150?img=15",
        "bio": "Досвідчений майстер з ремонту Apple техніки.",
        "skills": ["Apple", "Ремонт екрану", "Заміна батареї"],
        "verified": True,
        "experience": [
            {
                "id": "exp-1",
                "company": "iFixit",
                "role": "Головний технік",
                "startDate": "2018",
                "endDate": "2022",
                "description": "Ремонтував сотні пристроїв, від iPhone до MacBook."
            }
        ]
    }
    page.evaluate(f"localStorage.setItem('currentUser', JSON.stringify({json.dumps(master_user)}));")

def verify_work_experience_feature(page: Page):
    """
    Verifies the functionality of adding and displaying work experience
    on the master's profile page.
    """
    # 1. Arrange: Set mock user and go to the profile page.
    # The profile page is the root component in this app setup for simplicity.
    page.goto("http://localhost:3000") # Go to a blank page first
    set_mock_user(page)
    page.goto("http://localhost:3000/") # Navigate to the root to trigger profile rendering
    page.wait_for_load_state("networkidle")

    # 2. Act: Click the main "Edit" button on the profile.
    edit_profile_button = page.get_by_role("button", name="Редагувати")
    expect(edit_profile_button).to_be_visible()
    edit_profile_button.click()

    # 3. Assert: Verify the initial work experience is displayed.
    expect(page.get_by_text("iFixit")).to_be_visible()

    # 4. Act: Click the "Add" button in the work experience section.
    add_experience_button = page.get_by_role("button", name="Додати")
    expect(add_experience_button).to_be_visible()
    add_experience_button.click()

    # 5. Act: Fill out the form in the modal.
    modal_title = page.get_by_text("Додати досвід роботи")
    expect(modal_title).to_be_visible()

    page.get_by_placeholder("Посада").fill("Старший інженер")
    page.get_by_placeholder("Компанія").fill("Apple Inc.")
    page.get_by_placeholder("Дата початку (напр., 2020)").fill("2022")
    page.get_by_placeholder("Дата закінчення (або пусто)").fill("Теперішній час")
    page.get_by_placeholder("Опис").fill("Працюю над ремонтом та діагностикою нових пристроїв.")

    # 6. Screenshot: Capture the filled-out modal.
    page.screenshot(path="jules-scratch/verification/work_experience_modal.png")

    # 7. Act: Save the new experience entry.
    save_button = page.get_by_role("button", name="Зберегти")
    save_button.click()

    # 8. Assert: Verify the new entry is now visible on the profile.
    expect(page.get_by_text("Apple Inc.")).to_be_visible()
    expect(page.get_by_text("Старший інженер")).to_be_visible()

    # 9. Screenshot: Capture the updated profile view.
    page.screenshot(path="jules-scratch/verification/profile_with_new_experience.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            verify_work_experience_feature(page)
            print("Verification script for work experience ran successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()
