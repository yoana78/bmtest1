from playwright.sync_api import sync_playwright
import os

screenshot_dir = r'C:\Users\petcl\.gemini\antigravity\brain\f731d794-8206-48a1-8cf1-0bfe9666a07d'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    # 1. About Page
    page.goto('http://localhost:5173/about')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_sub_about.png'), full_page=True)
    print("About subpage captured")
    
    # 2. Trust Page
    page.goto('http://localhost:5173/trust')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_sub_trust.png'), full_page=True)
    print("Trust subpage captured")

    browser.close()
