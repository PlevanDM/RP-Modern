# jules-scratch/verification/verify_proposal_refactor.py
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Log in as a master
    page.goto("http://localhost:3000")
    page.get_by_role("button", name="Get Started").click()
    page.get_by_placeholder("Enter your email").fill("master@example.com")
    page.get_by_placeholder("Enter your password").fill("master123")
    page.get_by_role("button", name="Login").click()

    # Navigate to the orders board
    page.get_by_role("link", name="Orders").click()

    # Click on the first order to open the details
    page.locator(".order-item").first.click()

    # Click on the "Submit Proposal" button
    page.get_by_role("button", name="Submit Proposal").click()

    # Fill out and submit the proposal form
    page.get_by_placeholder("Enter your price").fill("150")
    page.get_by_placeholder("Enter a description").fill("This is a test proposal from the verification script.")
    page.get_by_role("button", name="Submit").click()

    # Take a screenshot to verify the proposal was submitted
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
