import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { ContactPage } from './src/pages/ContactPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

const CONTACT_BUTTON_XPATH = '/html/body/div/div/div/nav/div[2]/div/a[4]/span';




async function runContactFormTests() {
    const logger = new Logger('ContactUsPageTests');
    const browserManager = new BrowserManager();
    let contactPage;
    let testPassed = true;

    try {
        await browserManager.buildDriver();
        await browserManager.maximizeWindow();

        contactPage = new ContactPage(browserManager, logger);

        logger.log(`Navigating to URL: ${APP_CONFIG.INITIAL_APP_URL}`);
        await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
        await sleep(1000);

        await contactPage.navigateToContactPage();

        const testCases = [
            contactPage.testBlankSubmission,
            contactPage.testInvalidEmail,
            contactPage.testInvalidMobile,
            contactPage.testUnusualFullName,
            contactPage.testMissingRequestType,
            contactPage.testExcessiveInput,
            contactPage.testRapidSubmissions
            
        ];

        for (const testCase of testCases) {
            try {
                await testCase.call(contactPage);
                logger.log(`${testCase.name} passed`);
            } catch (err) {
                logger.error(`${testCase.name} failed`, err);
                testPassed = false;
            }
        }
    } catch (error) {
        logger.error("Critical error during test execution:", error);
        testPassed = false;
    } finally {
        logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
        await sleep(1000);
        await browserManager.quitDriver();
        process.exit(testPassed ? 0 : 1);
    }
}

runContactFormTests();
