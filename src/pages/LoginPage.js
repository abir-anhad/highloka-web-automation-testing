// import { By } from 'selenium-webdriver';
// import { BasePage } from './BasePage.js';
// import { APP_CONFIG } from '../config/appConfig.js';
// import { sleep } from '../utils/helpers.js';

// export class LoginPage extends BasePage {
//     // Test Sandbox Locators
//     sandboxUsernameField = By.xpath(APP_CONFIG.TEST_SANDBOX_USERNAME_XPATH);
//     sandboxPasswordField = By.xpath(APP_CONFIG.TEST_SANDBOX_PASSWORD_XPATH);
//     sandboxLoginButton = By.xpath(APP_CONFIG.TEST_SANDBOX_LOGIN_BUTTON_XPATH);

//     // Main App Locators
//     initialButton = By.xpath(APP_CONFIG.INITIAL_BUTTON_XPATH);
//     emailInputPopup = By.xpath(APP_CONFIG.APP_POPUP_EMAIL_INPUT_XPATH);
//     submitButtonPopup = By.xpath(APP_CONFIG.APP_POPUP_SUBMIT_BUTTON_XPATH);

//     /**
//      * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
//      * @param {import('../utils/Logger.js').Logger} logger
//      */
//     constructor(driverActions, logger) {
//         super(driverActions, logger);
//     }

//     async attemptSandboxLogin() {
//         this.logger.log("Checking for Test Sandbox login.");
//         try {
//             const usernameField = await this.waitForElementClickable(this.sandboxUsernameField, APP_CONFIG.WAIT_TIME_VERY_SHORT);
//             const passwordField = await this.findElement(this.sandboxPasswordField); // Already waited for username
//             const loginButton = await this.findElement(this.sandboxLoginButton);

//             await this.type(usernameField, APP_CONFIG.TEST_SANDBOX_USERNAME);
//             await this.type(passwordField, APP_CONFIG.TEST_SANDBOX_PASSWORD);
//             await this.click(loginButton);
//             this.logger.log("Test Sandbox login submitted.");
//             await sleep(3000);
//         } catch (error) {
//             if (error.name === 'TimeoutError' || error.message?.includes('Timeout waiting for element')) {
//                 this.logger.log("Test Sandbox login not found or already logged in. Proceeding.");
//             } else {
//                 this.logger.error("Error during Test Sandbox login", error);
//             }
//         }
//     }

//     async clickInitialButton() {
//         this.logger.log("Locating initial button.");
//         const button = await this.waitForElementClickable(this.initialButton, APP_CONFIG.WAIT_TIME_MEDIUM);
//         await this.click(button);
//         this.logger.log("Clicked initial button.");
//     }

//     /** @param {string} email */
//     async enterEmailAndSubmit(email) {
//         this.logger.log("Locating email input on popup.");
//         const emailField = await this.waitForElementClickable(this.emailInputPopup, APP_CONFIG.WAIT_TIME_MEDIUM);
//         await this.clear(emailField);
//         await this.type(emailField, email);
//         this.logger.log(`Entered email '${email}'.`);

//         this.logger.log("Locating submit button on popup.");
//         const submitButton = await this.waitForElementClickable(this.submitButtonPopup, APP_CONFIG.WAIT_TIME_MEDIUM);
//         await this.click(submitButton);
//         this.logger.log("Clicked submit for email.");
//     }
// }

// src/pages/LoginPage.js
import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';

export class LoginPage extends BasePage {
    // Test Sandbox Locators
    sandboxUsernameField = By.xpath(APP_CONFIG.TEST_SANDBOX_USERNAME_XPATH);
    sandboxPasswordField = By.xpath(APP_CONFIG.TEST_SANDBOX_PASSWORD_XPATH);
    sandboxLoginButton = By.xpath(APP_CONFIG.TEST_SANDBOX_LOGIN_BUTTON_XPATH);

    // Main Login Popup Locators (triggered by "Join Concert" or header login button)
    // These use the XPaths from appConfig.js
    loginPopupContainer = By.xpath(APP_CONFIG.LOGIN_POPUP_CONTAINER_XPATH); // ** Uses LOGIN_POPUP_CONTAINER_XPATH from appConfig **
    loginPopupEmailInput = By.xpath(APP_CONFIG.APP_POPUP_EMAIL_INPUT_XPATH); // Your existing XPath for the email field in the popup
    loginPopupSubmitButton = By.xpath(APP_CONFIG.APP_POPUP_SUBMIT_BUTTON_XPATH); // Your existing XPath for the submit button in the popup
    loginPopupCloseButton = By.xpath(APP_CONFIG.APP_POPUP_CLOSE_BUTTON_XPATH);
    whatIsHighlokaLoginCloseButton = By.xpath(APP_CONFIG.WHAT_IS_HIGHLOKA_SEC_LOGIN_CLOSE_BUTTON_XPATH);
    noMoreFomoLoginCloseButton = By.xpath(APP_CONFIG.NO_MORE_FOMO_SECTION3_LOGIN_CLOSE_BUTTON_XPATH);
    moreIntimateLoginCloseButton = By.xpath(APP_CONFIG.MORE_INTIMATE_SECTION5_LOGIN_CLOSE_BUTTON_XPATH);
    joinTheMovementLoginCloseButton = By.xpath(APP_CONFIG.EXPERIENCE_BEUTIFUL_SECTION7_LOGIN_CLOSE_BUTTON_XPATH);

    // Header Login Button (your original initial_button_xpath, now INITIAL_LOGIN_BUTTON_XPATH in appConfig)
    headerLoginButton = By.xpath(APP_CONFIG.INITIAL_LOGIN_BUTTON_XPATH);

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }

    async attemptSandboxLogin() {
        this.logger.log("Checking for Test Sandbox login form...");
        try {
            const usernameField = await this.waitForElementClickable(this.sandboxUsernameField, APP_CONFIG.WAIT_TIME_VERY_SHORT);
            const passwordField = await this.findElement(this.sandboxPasswordField, APP_CONFIG.WAIT_TIME_VERY_SHORT);
            const loginButton = await this.findElement(this.sandboxLoginButton, APP_CONFIG.WAIT_TIME_VERY_SHORT);

            await this.type(usernameField, APP_CONFIG.TEST_SANDBOX_USERNAME);
            await this.type(passwordField, APP_CONFIG.TEST_SANDBOX_PASSWORD);
            await this.click(loginButton);
            this.logger.log("Test Sandbox login submitted.");
            await sleep(3000); // Allow time for login to process
        } catch (error) {
            if (error.name === 'TimeoutError' || error.message?.includes('Timeout waiting')) {
                this.logger.log("Test Sandbox login form not found or timed out. Proceeding.");
            } else {
                // Log unexpected errors but don't necessarily halt if sandbox is optional
                this.logger.error("An unexpected error occurred during Test Sandbox login attempt.", error);
            }
        }
    }

    /**
     * Checks if the main login popup is visible along with its email input and submit button.
     * This method relies on LOGIN_POPUP_CONTAINER_XPATH, APP_POPUP_EMAIL_INPUT_XPATH,
     * and APP_POPUP_SUBMIT_BUTTON_XPATH being correctly defined in appConfig.js.
     * @returns {Promise<boolean>} True if the popup and its elements are visible, false otherwise.
     */
    async isMainLoginPopupVisible() { // <<< THIS IS THE REQUIRED METHOD
        this.logger.log("Checking for main login popup visibility...");
        try {
            // 1. Wait for the popup container itself to be visible
            //    ** Ensure LOGIN_POPUP_CONTAINER_XPATH in appConfig.js is correct for your app! **
            await this.waitForElementVisible(this.loginPopupContainer, APP_CONFIG.WAIT_TIME_SHORT);
            this.logger.log("Login popup container is visible.");

            // 2. Check for the email/phone input within the (now visible) popup
            await this.waitForElementVisible(this.loginPopupEmailInput, APP_CONFIG.WAIT_TIME_VERY_SHORT);
            this.logger.log("Login popup email input is visible.");

            // 3. Check for the submit button within the (now visible) popup
            await this.waitForElementVisible(this.loginPopupSubmitButton, APP_CONFIG.WAIT_TIME_VERY_SHORT);
            this.logger.log("Login popup submit button is visible.");

            return true; // All elements found and visible
        } catch (error) {
            // This catch block will be hit if any waitForElementVisible times out
            this.logger.warn("Main login popup or one of its key elements (container, email input, submit) not found or not visible within the timeout.", error.message ? error.message : error);
            return false; // Indicates the popup (or its content) wasn't verified
        }
    }

    async closeLoginPopUp() {
        this.logger.log("Locating login popup close button.");
        const button = await this.waitForElementClickable(this.loginPopupCloseButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Successfully closed login popup.");
    }

    async whatIsHighlokaLoginClosePopup() {
        this.logger.log("Locating login popup close button.");
        const button = await this.waitForElementClickable(this.whatIsHighlokaLoginCloseButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Successfully closed login popup.");
    }

    async noMoreFomoLoginClosePopup() {
        this.logger.log("Locating login popup close button.");
        const button = await this.waitForElementClickable(this.noMoreFomoLoginCloseButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Successfully closed login popup.");
    }

    async moreIntimateLoginClosePopup() {
        this.logger.log("Locating login popup close button.");
        const button = await this.waitForElementClickable(this.moreIntimateLoginCloseButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Successfully closed login popup.");
    }
    
    async joinTheMovementLoginClosePopup() {
        this.logger.log("Locating login popup close button.");
        const button = await this.waitForElementClickable(this.joinTheMovementLoginCloseButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Successfully closed login popup.");
    }
    
    

    /**
     * Clicks the main login button usually found in the page header.
     * (This corresponds to your original `initial_button_xpath`)
     */
    async clickHeaderLoginButton() {
        this.logger.log("Locating and clicking header login button.");
        const button = await this.waitForElementClickable(this.headerLoginButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(button);
        this.logger.log("Clicked header login button.");
    }
    

    /**
     * Enters email into the main login popup and clicks its submit button.
     * (This uses APP_POPUP_EMAIL_INPUT_XPATH and APP_POPUP_SUBMIT_BUTTON_XPATH)
     * @param {string} email - The email address to enter.
     */
    async enterEmailInPopupAndSubmit(email) {
        this.logger.log("Locating email input on main login popup.");
        const emailField = await this.waitForElementClickable(this.loginPopupEmailInput, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.clear(emailField);
        await this.type(emailField, email);
        this.logger.log(`Entered email '${email}' in popup.`);

        this.logger.log("Locating submit button on main login popup.");
        const submitButton = await this.waitForElementClickable(this.loginPopupSubmitButton, APP_CONFIG.WAIT_TIME_MEDIUM);
        await this.click(submitButton);
        this.logger.log("Clicked submit for email in popup.");
    }
}