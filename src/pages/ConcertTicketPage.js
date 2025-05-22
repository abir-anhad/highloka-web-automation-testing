import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { ConcertTicketPage } from './src/pages/ConcertTicketPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

async function runConcertTicketTests() {
  const logger = new Logger('ConcertTicketTests');
  const browserManager = new BrowserManager();
  let ticketPage;
  let testPassed = true;

  logger.log('RUN the test_login script first else This TEST SUITE WILL FAIL');

  try {
    await browserManager.buildDriver();
    await browserManager.maximizeWindow();

    ticketPage = new ConcertTicketPage(browserManager, logger);

    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(8000); // wait for homepage

    logger.log('Navigating to concert page...');
    const enterConcertBtn = await browserManager.driver.findElement({
      xpath: '/html/body/div/div/main/div[2]/div/div[2]/div[2]/div/div[2]',
    });
    await enterConcertBtn.click();
    await sleep(5000);

    const testCases = [
      ticketPage.clickGetTicketAndVerifyRedirect,
      ticketPage.clickFirstGetTicketButton,
      ticketPage.clickSecondGetTicketButton,
      ticketPage.clickGetConcertTicketButton
    ];

    for (const testCase of testCases) {
      try {
        await testCase.call(ticketPage);
        logger.log(`${testCase.name} passed`);
      } catch (err) {
        logger.error(`${testCase.name} failed`, err);
        testPassed = false;
      }
    }
  } catch (error) {
    logger.error("Critical error during Concert Ticket test execution:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await sleep(1000);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runConcertTicketTests();
