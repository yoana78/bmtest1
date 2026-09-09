from playwright.sync_api import sync_playwright
import os

screenshot_dir = r'C:\Users\petcl\.gemini\antigravity\brain\f731d794-8206-48a1-8cf1-0bfe9666a07d'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    # 1. Option 1 Layout (Classic Corporate)
    page.goto('http://localhost:5173/')
    page.wait_for_load_state('networkidle')
    page.screenshot(path=os.path.join(screenshot_dir, 'layout_1_classic.png'), full_page=True)
    print("Layout 1 captured")
    
    # 2. Option 2 Layout (Split Executive)
    page.select_option('.theme-selector', 'dark-executive')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'layout_2_split.png'), full_page=True)
    print("Layout 2 captured")

    # 3. Option 3 Layout (Grid Showcase)
    page.select_option('.theme-selector', 'warm-studio')
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(screenshot_dir, 'layout_3_grid.png'), full_page=True)
    print("Layout 3 captured")
    
    browser.close()
