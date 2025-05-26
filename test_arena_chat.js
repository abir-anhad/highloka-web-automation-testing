import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { ArenaPage } from './src/pages/ConcertArenaPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

async function runArenaPageTestsForInstance(instanceConfig) {
    const logger = new Logger(`ArenaPageTests_Instance_${instanceConfig.id}`);
    const browserManager = new BrowserManager(instanceConfig.profilePath);
    let arenaPage;
    let testPassed = true;

    logger.log('Login Lagbei!!! MUST!!!!!');

    try {
        await browserManager.buildDriver();
        await browserManager.maximizeWindow();

        arenaPage = new ArenaPage(browserManager, logger);

        logger.log(`I am navigating to the home page: ${APP_CONFIG.INITIAL_APP_URL}`);
        await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
        await sleep(8000); 

        await arenaPage.clickActiveConcert();
        
        await arenaPage.clickLobbyEnterConcert();
        logger.log('Entered the concert arena.');
        await sleep(5000); 


        for (const testCase of instanceConfig.testCasesToRun) {
            try {
                await sleep(1000); 
                await testCase.call(arenaPage);
                logger.log(`Action ${testCase.name || 'anonymous action'} passed for instance ${instanceConfig.id}`);
            } catch (err) {
                logger.error(`Action ${testCase.name || 'anonymous action'} failed for instance ${instanceConfig.id}, err`);
                testPassed = false;
            }
        }

    } catch (error) {
        logger.error(`A critical error occurred during the test execution for instance ${instanceConfig.id}:, error`);
        testPassed = false;
    } finally {
        logger.log(`Instance ${instanceConfig.id} - Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
        
        logger.log(`Instance ${instanceConfig.id} browser will remain open for a while.`);
    }
    return testPassed; 
}

async function runAllInstances() {
    const overallLogger = new Logger('MultiInstanceRunner');
    // duto separare entity
    // will do separate things - this is where the magic happens. 
    const instanceConfigs = [        
        {
            id: "ChatSenderInstance",
            profilePath: `${APP_CONFIG.USER_PROFILE_DIR}_ChatSender`,
            testCasesToRun: [
                ArenaPage.prototype.arenaPageChatInputTyping,
                ArenaPage.prototype.clickArenaChatSubmitButton
            ]
        },
        {
            id: "ChatObserverInstance",
            profilePath:  `${APP_CONFIG.USER_PROFILE_DIR}_ChatObserver` ,
            testCasesToRun: [
                ArenaPage.prototype.testObserveChat 
            ]
        }
    ];

    if (APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length < 2 && APP_CONFIG.USER_PROFILE_DIR) {
        overallLogger.warn("For distinct profiles based on emails, ensure at least two emails are in APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.");
        if (!instanceConfigs[0].profilePath && APP_CONFIG.USER_PROFILE_DIR) {
             instanceConfigs[0].profilePath = $`{APP_CONFIG.USER_PROFILE_DIR}_instance_1`;
        }
        if (!instanceConfigs[1].profilePath && APP_CONFIG.USER_PROFILE_DIR) {
             instanceConfigs[1].profilePath = `${APP_CONFIG.USER_PROFILE_DIR}_instance_2`;
        }
    }


    overallLogger.log(`I am starting ${instanceConfigs.length} instance(s) with specific tasks...`);

    const results = await Promise.all(instanceConfigs.map(config => runArenaPageTestsForInstance(config)));

    const allPassed = results.every(result => result === true);
    overallLogger.log(`All instances have finished. Overall status: ${allPassed ? 'ALL PASSED' : 'SOME FAILED'}`);

}

runAllInstances().catch(error => {
    const overallLogger = new Logger('MultiInstanceRunner_ERROR');
    overallLogger.error("A critical error occurred in my main execution flow:", error);
});