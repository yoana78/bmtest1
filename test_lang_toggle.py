from playwright.sync_api import sync_playwright
import os

screenshot_dir = r'C:\Users\petcl\.gemini\antigravity\brain\f731d794-8206-48a1-8cf1-0bfe9666a07d'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    # 1. Product Detail (Korean)
    page.goto('http://localhost:5173/catalog/dayspo-wise-allstage')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_detail_ko.png'), full_page=True)
    
    # 2. Click Language Toggle Button to EN
    page.click('.lang-toggle')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_detail_en.png'), full_page=True)
    print("English toggle test on Product Detail completed")

    # 3. Check Home page in EN
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    page.click('.lang-toggle')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'screenshot_home_en.png'), full_page=True)
    print("English toggle test on Home page completed")
    
    browser.close()
