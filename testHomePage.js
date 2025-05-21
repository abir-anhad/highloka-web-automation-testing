// testHomePage.js
import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { HomePage } from './src/pages/HomePage.js';
import { LoginPage } from './src/pages/LoginPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';
import { HomeMenuClicking } from './src/utils/menu.js';

async function testJoinConcertShowsLoginPopup() {
    const logger = new Logger('JoinConcertLoginPopupTest');

    // Browser driver instant is created here
    const browserManager = new BrowserManager();
    let loginPage;
    let homePage;
    let testPassed = false;

    logger.log("Starting Test: Click 'Join Concert' and verify Login Popup uses main login elements...");

    try {
        await browserManager.buildDriver();
        await browserManager.maximizeWindow();


        loginPage = new LoginPage(browserManager, logger);

        // Home page test object is created here
        // we are passing browser manager object into that
        homePage = new HomePage(browserManager, logger);

        logger.log(`Navigating to initial application URL: ${APP_CONFIG.INITIAL_APP_URL}`);
        await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
        await sleep(1000);

        logger.log("Attempting to handle initial sandbox login prompt (if any)...");
        await loginPage.attemptSandboxLogin();
        logger.log("Initial sandbox login prompt handling attempt complete.");
        await sleep(2000);

        // logger.log("Verifying that the main home page content is accessible...");
        // try {
        //     // Use a known element from HomePage to ensure page is loaded
        //     await homePage.verifyAllElementsVisibleSectionWise();
        //     logger.log("All Main home page content is visible.");
        // } catch (error) {
        //     logger.error("Main home page content was not found after sandbox prompt.", error);
        //     throw new Error("Failed to access main home page content after sandbox prompt.");
        // }


        logger.log("Clicking the Header Home button...");
        await homePage.clickHeaderHomeButtonInHeroContext();
        await sleep(2000);


        logger.log("Clicking the Join the concert button...");
        await homePage.clickHeroJoinConcertsButtonInHeroContext();
        await sleep(2000);

        logger.log("Verifying if main login popup (with shared email input & submit) is visible...");
        if (await loginPage.isMainLoginPopupVisible()) {
            logger.log("PASS: Main login popup with its email input and submit button is visible after clicking 'Join Concert'.");
            await loginPage.closeLoginPopUp();
            await sleep(4000);
            await homePage.clickLeftRightArrowsScrollToSection2();
            await sleep(2000);
            await homePage.clickTrendingConcert();
            await sleep(2000);
            // browserManager.driver.navigate().back();
            await homePage.clickHeaderHomeButtonInHeroContext();
            await sleep(2000);
            await homePage.whatIsHighlokaScrollToSection3();
            await sleep(2000);
            await homePage.clickWhatIsHighlokaJoinConcertButtonContext();
            await sleep(2000);
            await loginPage.whatIsHighlokaLoginClosePopup();
            await sleep(2000);
            await homePage.noMoreFomoScrollToMiddleSection4();
            await sleep(1000);
            await homePage.clickJoinTheExperienceButton();
            await sleep(2000);
            await loginPage.noMoreFomoLoginClosePopup();
            await sleep(2000);
            await homePage.moreIntimateScrollToSection5();
            await sleep(2000);
            await loginPage.moreIntimateLoginClosePopup();
            await sleep(2000);
            await homePage.moreIntimateScrollToSection5ConnectText();
            await sleep(2000);
            await homePage.howItWorksScrollToSection6();
            await sleep(2000);
            await homePage.experienceBeutifulScrollToSection7();
            await sleep(2000);
            await homePage.clickJoinTheMovementButton();
            await sleep(2000);
            await loginPage.joinTheMovementLoginClosePopup();
            await sleep(2000);
            await homePage.homePageScrollToTopButtonClick();
            logger.log("Clicking the Header Home button...");
            await homePage.homePageScrollToTopSection1Text();
            testPassed = true;
        } else {
            logger.error("FAIL: Main login popup (with shared email input & submit) was NOT visible after clicking 'Join Concert'. " +
                "Check XPaths for LOGIN_POPUP_CONTAINER_XPATH, APP_POPUP_EMAIL_INPUT_XPATH, and APP_POPUP_SUBMIT_BUTTON_XPATH in appConfig.js.");
            testPassed = false;
        }

    } catch (error) {
        logger.error("An critical error occurred during the test:", error);
        const currentUrl = browserManager.driver ? await browserManager.getCurrentUrl() : "N/A (driver error)";
        logger.error(`Error occurred at URL (if available): ${currentUrl}`);
        testPassed = false;
    } finally {
        logger.log(`Test Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
        logger.log("Test finishing up.");
        await sleep(2000);
        if (browserManager && browserManager.driver) {
            logger.log("Closing browser...");
            // await browserManager.quitDriver();
            logger.log("Browser closed.");
        } else {
            logger.log("Browser was not initialized or already closed.");
        }
        logger.log("Test execution finished.");
        process.exit(testPassed ? 0 : 1);
    }
}

testJoinConcertShowsLoginPopup();