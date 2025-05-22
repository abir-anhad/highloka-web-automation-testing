import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { PostLoginHomePage } from './src/pages/PostLoginHomePage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';


//RUN the test_login script first else This TEST SUITE WILL FAIL
async function runHomeProfileEditTests() {
  const logger = new Logger('HomeProfileEditTests');
  const browserManager = new BrowserManager();
  let homePage;
  let testPassed = true;
  logger.log(' RUN the test_login script first else This TEST SUITE WILL FAIL');

  try {
    await browserManager.buildDriver();
    await browserManager.maximizeWindow();

    homePage = new PostLoginHomePage(browserManager, logger);

    logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(10000); // wait for homepage to load

    const testCases = [
      // homePage.openUserMenu,
      // homePage.clickEditFirstNameButton,
      // homePage.editFirstName,
      // homePage.clickEditLasttNameButton,
      // homePage.editLastName,
      // homePage.clickSave,
      // homePage.clickHomeButton,
      // homePage.reopenUserMenuAndVerifyName,
      // homePage.scrollDownAndUp,
      // homePage.clickEnterConcertAndCheckRedirect,
      // homePage.returnToHomePage,
      // homePage.verifyMyEventsLoaded,
      // homePage.openTopRightMenuAndVerifyOptions,
      // homePage.testMenuRedirections,
      homePage.logoutAndVerify
    ];

    for (const testCase of testCases) {
      try {
        await testCase.call(homePage);
        logger.log(`${testCase.name} passed`);
      } catch (err) {
        logger.error(`${testCase.name} failed`, err);
        testPassed = false;
      }
    }
  } catch (error) {
    logger.error("Critical error during Home Profile Edit test execution:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await sleep(1000);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runHomeProfileEditTests();
