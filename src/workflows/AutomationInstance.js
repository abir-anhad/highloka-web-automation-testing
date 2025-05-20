import { BrowserManager } from '../core/BrowserManager.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { ProfileSetupPage } from '../pages/ProfileSetupPage.js';
import { ConcertPage } from '../pages/ConcertPage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { Logger } from '../utils/Logger.js';
import { sleep, promptForOtp } from '../utils/helpers.js';
import { HomePage } from '../pages/HomePage.js';

export class AutomationInstance {
    /** @type {string} */
    email;
    /** @type {number} */
    instanceNumber;
    /** @type {BrowserManager} */
    browserManager;
    /** @type {Logger} */
    logger;
    /** @type {LoginPage} */
    loginPage;
    /** @type {OtpPage} */
    otpPage;
    /** @type {ProfileSetupPage} */
    profileSetupPage;
    /** @type {ConcertPage} */
    concertPage;


    /**
     * @param {string} email
     * @param {number} instanceNumber
     */
    constructor(email, instanceNumber) {
        this.email = email;
        this.instanceNumber = instanceNumber;
        this.browserManager = new BrowserManager();
        this.logger = new Logger(instanceNumber, email);
    }

    async run() {
        this.logger.log("Starting.");
        try {
            await this.browserManager.buildDriver();
            this._initializePages();

            await this.browserManager.get(APP_CONFIG.INITIAL_APP_URL);
            await this.browserManager.maximizeWindow();
            this.logger.log(`Mapsd to ${APP_CONFIG.INITIAL_APP_URL}`);

            this.homePage.clickSection2TrendingConcertLeftArrow();
            // Open Login Popup
            // this.loadLoginPopup();

            this.logger.log("All interactive steps completed.");

        } catch (error) {
            const currentUrl = this.browserManager.driver ? await this.browserManager.getCurrentUrl() : "N/A (driver not initialized)";
            this.logger.error(`Overall ${error.name || 'Error'}. Current URL: ${currentUrl}. Details:`, error.message);
            if (error.stack) {
                console.error(error.stack);
            }
        } finally {
            // In Python: # driver.quit() # I'm keeping the browser open as you'll close it manually
            this.logger.log("Instance task sequence finished. Browser remains open.");
            await sleep(200000); // Long sleep as in Python
            // If you want to close the browser eventually:
            // await this.browserManager.quitDriver();
        }
    }

    async loadLoginPopup() {
        // Not working as of now
        await this.loginPage.attemptSandboxLogin();
        await this.loginPage.clickHeaderLoginButton();



        await this.loginPage.enterEmailInPopupAndSubmit(this.email);

        this.logger.log("Awaiting OTP input.");
        await sleep(2000);
        const otpValue = await promptForOtp(`****** [Instance ${this.instanceNumber} | ${this.email}]: Enter 6-digit OTP: `);

        await this.otpPage.enterOtp(otpValue);
        await this.otpPage.clickVerifyOtp();

        this.logger.log("OTP verified. Checking for subsequent form steps.");
        await sleep(3000);

        await this.profileSetupPage.enterName();
        await this.profileSetupPage.selectRadioOption();
        await this.profileSetupPage.enterDate();
        await this.profileSetupPage.uploadImage();

        await this.concertPage.navigateToConcertPage();
        await this.concertPage.clickGetTicketOrInitialEnter();
        await this.concertPage.clickFinalEnterConcert();
    }

    _initializePages() {
        this.loginPage = new LoginPage(this.browserManager, this.logger);
        this.otpPage = new OtpPage(this.browserManager, this.logger);
        this.profileSetupPage = new ProfileSetupPage(this.browserManager, this.logger);
        this.concertPage = new ConcertPage(this.browserManager, this.logger);
        this.homePage = new HomePage(this.browserManager, this.logger);
    }
}