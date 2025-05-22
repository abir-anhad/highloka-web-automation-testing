import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

const JOIN_THE_CULT_XPATH = '/html/body/div/div/div/nav/div[3]/div';
const GOOGLE_BUTTON_XPATH = '/html/body/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[3]/div';
const EMAIL_INPUT_XPATH = '//*[@id="name"]';
const SUBMIT_EMAIL_BUTTON_XPATH = '/html/body/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/form/div/button';
const VERIFY_OTP_BUTTON_XPATH = '/html/body/div/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/form/button';

async function runLoginAndProfileSaveTest() {
  const logger = new Logger('LoginProfileTest');
  const browserManager = new BrowserManager();
  let testPassed = true;

  try {
    await browserManager.buildDriver(); // This will use the profile if set in BrowserManager
    await browserManager.maximizeWindow();

    logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(10000);

    logger.log('Clicking "Join the Cult" button...');
    const joinButton = await browserManager.driver.findElement({ xpath: JOIN_THE_CULT_XPATH });
    await joinButton.click();
    await sleep(3000);

    logger.log('Verifying login popup appeared...');
    const googleButton = await browserManager.driver.findElement({ xpath: GOOGLE_BUTTON_XPATH });
    if (googleButton) {
      logger.log('Login popup is visible.');
    } else {
      throw new Error('Login popup did not appear.');
    }

    logger.log('Filling in email...');
    const emailInput = await browserManager.driver.findElement({ xpath: EMAIL_INPUT_XPATH });
    await emailInput.sendKeys(APP_CONFIG.TEST_EMAIL);

    logger.log('Clicking submit button...');
    const submitButton = await browserManager.driver.findElement({ xpath: SUBMIT_EMAIL_BUTTON_XPATH });
    await submitButton.click();

    logger.log('Waiting for manual OTP entry...');
    await sleep(30000); // Wait for manual OTP entry

    logger.log('Clicking "Verify OTP" button...');
    const verifyButton = await browserManager.driver.findElement({ xpath: VERIFY_OTP_BUTTON_XPATH });
    await verifyButton.click();

    logger.log('Waiting for post-login redirect...');
    await sleep(10000);

    logger.log('Login and profile save test completed.');
  } catch (error) {
    logger.error("Error during login and profile saving test:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runLoginAndProfileSaveTest();
