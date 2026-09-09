from playwright.sync_api import sync_playwright
import os

screenshot_dir = r'C:\Users\petcl\.gemini\antigravity\brain\f731d794-8206-48a1-8cf1-0bfe9666a07d'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_corp_home.png'), full_page=True)
    print("Corporate Flagship Home captured")
    
    browser.close()
