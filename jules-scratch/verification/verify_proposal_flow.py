from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Login as master
    page.goto("http://localhost:3002/")
    page.get_by_text("Я майстер ремонту").first.click()

    # Create a proposal
    page.get_by_role("button", name="Пропозиції").click()
    page.get_by_role("button", name="Розмістити пропозицію").click()
    page.get_by_label("Замовлення").select_option("order-1")
    page.get_by_label("Ціна ($)").fill("100")
    page.get_by_label("Опис роботи").fill("Test proposal")
    page.get_by_role("button", name="Розмістити").click()

    # Logout
    page.get_by_title("Вихід").click()

    # Login as client
    page.get_by_text("Я шукаю майстра").first.click()
    page.get_by_role("button", name="Пропозиції").click()

    # Accept the proposal
    page.get_by_role("button", name="Прийняти").first.click()

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
