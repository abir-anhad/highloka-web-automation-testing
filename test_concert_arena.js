import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { ArenaPage } from './src/pages/ConcertArenaPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

async function runArenaPageTests() {
    const logger = new Logger('ArenaPageTests');
    const browserManager = new BrowserManager();
    let arenaPage;
    let testPassed = true;

    logger.log('RUN the test_login script first else This TEST SUITE WILL FAIL');

    try {
        await browserManager.buildDriver();
        await browserManager.maximizeWindow();

        arenaPage = new ArenaPage(browserManager, logger);

        // Step 1: Go to home page
        logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
        await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
        await sleep(8000);

        // Step 2: Click on concert tile in My Events
        await arenaPage.clickActiveConcert();


        // Step 3: Run lobby test actions
        const testCases = [
            arenaPage.clickLobbyEnterConcert,
            arenaPage.clickArenaFirstReaction,
            arenaPage.arenaPageChatInputTyping,
            arenaPage.clickArenaChatSubmitButton,
            arenaPage.clickArenaNitroModeToggleButton,
            arenaPage.clickArenaNitroModeToggleButton,
            arenaPage.goBackToLobby,
            arenaPage.goBackToHome
        ];

        for (const testCase of testCases) {
            try {
                await sleep(3000);
                await testCase.call(arenaPage);
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
        await sleep(1000);
        // await browserManager.quitDriver();
        // process.exit(testPassed ? 0 : 1);
    }
}

runArenaPageTests();
