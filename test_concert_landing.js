import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { ConcertLandingPage } from './src/pages/ConcertLanding.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

async function runConcertLandingTests() {
    const logger = new Logger('ConcertLandingTests');
    const browserManager = new BrowserManager();
    let concertLandingPage;
    let testPassed = true;

    logger.log('RUN the test_login script first else This TEST SUITE WILL FAIL');

    try {
        await browserManager.buildDriver();
        await browserManager.maximizeWindow();

        concertLandingPage = new ConcertLandingPage(browserManager, logger);

        // Step 1: Go to home page
        logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
        await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
        await sleep(8000);

        // Step 2: Click on concert tile in My Events
        await concertLandingPage.clickActiveConcert();


        // Step 3: Run lobby test actions
        const testCases = [
            concertLandingPage.clickLobbyEnterConcert,
            concertLandingPage.clickConcertLandingEnterConcert,
            concertLandingPage.goBackToConcertLanding,
            concertLandingPage.hereGlimpseSectionScrollDown,
            concertLandingPage.clickConcertLandingOnDemandVideo,
            concertLandingPage.clickConcertLandingOnDemandVideo,
            concertLandingPage.bottomSectionScrollDown,
            concertLandingPage.clickConcertLandingBottomEnterConcert,
            concertLandingPage.goBackToConcertLanding
        ];

        for (const testCase of testCases) {
            try {
                await sleep(3000);
                await testCase.call(concertLandingPage);
                logger.log(`${testCase.name} passed`);
            } catch (err) {
                logger.error(`${testCase.name} failed`, err);
                testPassed = false;
            }
        }

    } catch (error) {
        logger.error("Critical error during Lobby Page test execution:", error);
        testPassed = false;
    } finally {
        logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
        await sleep(5000);
        await browserManager.quitDriver();
        process.exit(testPassed ? 0 : 1);
    }
}

runConcertLandingTests();
