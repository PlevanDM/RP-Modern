import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3002/")

        # Login as master
        page.get_by_role("button", name="Я майстер ремонту").first.click()

        # Wait for navigation to complete and dashboard to load
        page.wait_for_url("http://localhost:3002/")
        expect(page.get_by_text("Панель управления мастера")).to_be_visible()

        # Navigate to the proposals page
        proposals_button = page.get_by_role("button", name="Мої Пропозиції")
        expect(proposals_button).to_be_visible()
        proposals_button.click()

        # Open the proposal submission modal
        page.get_by_role("button", name="Розмістити пропозицію").click()

        # Wait for the modal to appear
        expect(page.get_by_role("heading", name="Розмістити пропозицію")).to_be_visible()

        # Select the order by its value
        page.get_by_role("combobox").select_option("order1")

        # Fill out the proposal form
        page.get_by_placeholder("Поясніть як ви виконаєте роботу...").fill("New proposal description")
        page.get_by_placeholder("300").fill("150")

        # Submit the proposal using an exact match to avoid ambiguity
        page.get_by_role("button", name="Розмістити", exact=True).click()

        # Logout
        page.get_by_title("Вихід").click()

        # Wait for the landing page to be visible again, targeting the first button
        expect(page.get_by_role("button", name="Я шукаю майстра").first).to_be_visible()

        # Login as client
        page.get_by_role("button", name="Я шукаю майстра").first.click()

        # Wait for navigation to proposals page
        page.wait_for_url("http://localhost:3002/")
        client_proposals_button = page.get_by_role("button", name="Пропозиції")
        expect(client_proposals_button).to_be_visible()
        client_proposals_button.click()

        # Accept the proposal
        page.get_by_role("button", name="Прийняти").first.click()

        print("Playwright script executed successfully!")
        page.screenshot(path="success.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
