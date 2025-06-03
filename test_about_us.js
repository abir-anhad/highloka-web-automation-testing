import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { AboutUsPage } from './src/pages/AboutUsPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

const ABOUT_NAV_BUTTON_XPATH = '/html/body/div/div/div/nav/div[2]/div/a[2]';

async function runAboutUsPageTests() {
  const logger = new Logger('AboutUsPageTests');
  const browserManager = new BrowserManager();
  let aboutUsPage;
  let testPassed = true;

  try {
    await browserManager.buildDriver();
    await browserManager.maximizeWindow();

    aboutUsPage = new AboutUsPage(browserManager, logger);

    logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(15000);

    logger.log('Clicking "About Us" from nav...');
    const aboutButton = await browserManager.driver.findElement({ xpath: ABOUT_NAV_BUTTON_XPATH });
    await aboutButton.click();
    await sleep(5000); // Allow about page to load

    const testCases = [
      aboutUsPage.checkWelcomeHeader,
      aboutUsPage.checkHeroSection,
      aboutUsPage.scrollDownAndUp,
    ];

    for (const testCase of testCases) {
      try {
        await testCase.call(aboutUsPage);
        logger.log(`${testCase.name} passed`);
      } catch (err) {
        logger.error(`${testCase.name} failed`, err);
        testPassed = false;
      }
    }
  } catch (error) {
    logger.error("Critical error during AboutUsPage test execution:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await sleep(1000);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runAboutUsPageTests();
