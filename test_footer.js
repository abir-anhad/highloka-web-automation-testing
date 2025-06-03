import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { FooterPage } from './src/pages/Footer.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

async function runFooterTests() {
  const logger = new Logger('FooterPageTests');
  const browserManager = new BrowserManager();
  let footerPage;
  let testPassed = true;

  try {
    await browserManager.buildDriver();
    await browserManager.maximizeWindow();

    footerPage = new FooterPage(browserManager, logger);

    logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(10000); // wait for home page

    const testCases = [
        footerPage.scrollToFooter,
        footerPage.checkFooterVisible,
        footerPage.testTermsAndConditionsLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testPrivacyPolicyLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testRefundsPolicyLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testHomeLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testAboutUsLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testBlogsLink,
        footerPage.returnToHomeAndScrollFooter,
        footerPage.testContactUsLink,
];

    for (const testCase of testCases) {
      try {
        await testCase.call(footerPage);
        logger.log(`${testCase.name} passed`);
      } catch (err) {
        logger.error(`${testCase.name} failed`, err);
        testPassed = false;
      }
    }
  } catch (error) {
    logger.error("Critical error during Footer test execution:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await sleep(1000);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runFooterTests();
