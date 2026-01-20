const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const assetsDir = path.join(__dirname, 'src', 'assets');
    if (!fs.existsSync(assetsDir)){
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Launch with new headless mode
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1440, height: 900 });

    try {
        console.log('Navigating to app...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

        // 1. Normal Mode
        console.log('Capturing Normal Mode...');
        await new Promise(r => setTimeout(r, 3000)); // wait for images
        await page.screenshot({ path: path.join(assetsDir, 'normal-mode.png') });

        // 2. Zen Mode
        console.log('Toggling Zen Mode...');
        const toggled = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const zenSpan = spans.find(s => s.textContent.includes('Zen Mode') || s.textContent.includes('Focus ON'));
            if (zenSpan && zenSpan.nextElementSibling) {
                zenSpan.nextElementSibling.click();
                return true;
            }
            return false;
        });

        if (!toggled) console.error("Failed to toggle Zen Mode");
        
        await new Promise(r => setTimeout(r, 2000)); // wait for blur/transition
        await page.screenshot({ path: path.join(assetsDir, 'zen-mode.png') });

        // 3. Focus Wizard
        console.log('Opening Focus Wizard...');
        const wizardOpened = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            // Look for "Start Focus Session" or "Change Filter"
            const btn = buttons.find(b => b.textContent.includes('Start Focus Session') || b.textContent.includes('Change Filter'));
            if (btn) {
                btn.click();
                return true;
            }
            return false;
        });

        if (wizardOpened) {
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(assetsDir, 'focus-wizard.png') });
            // Close with Escape
            await page.keyboard.press('Escape');
            await new Promise(r => setTimeout(r, 1000));
        } else {
             console.error("Failed to open Focus Wizard");
        }

        // 4. Lecture Hall
        console.log('Opening Lecture Hall...');
        // Click the first video card
        await page.click('.group.cursor-pointer');
        await new Promise(r => setTimeout(r, 2000)); // wait for overlay
        await page.screenshot({ path: path.join(assetsDir, 'lecture-hall.png') });

        console.log('Done!');

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
