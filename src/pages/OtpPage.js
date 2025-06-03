import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';

export class OtpPage extends BasePage {
    /** @param {number} index */
    otpFieldByName(index) {
        return By.name(`${APP_CONFIG.OTP_FIELD_NAME_PREFIX}${index}`);
    }
    verifyOtpButton = By.xpath(APP_CONFIG.VERIFY_OTP_BUTTON_XPATH);

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }

    /** @param {string} otpValue */
    async enterOtp(otpValue) {
        this.logger.log(`Received OTP ${otpValue}. Entering.`);
        for (let i = 0; i < otpValue.length; i++) {
            const digit = otpValue[i];
            const otpInputLocator = this.otpFieldByName(i + 1);
            try {
                const otpField = await this.waitForElementClickable(otpInputLocator, APP_CONFIG.WAIT_TIME_SHORT);
                await this.type(otpField, digit);
            } catch (error) {
                this.logger.error(`Timeout or error for OTP field ${otpInputLocator.toString()}`, error);
                throw error;
            }
        }
        this.logger.log("All OTP digits entered.");
    }

    async clickVerifyOtp() {
        this.logger.log("Locating 'Verify OTP' button.");
        const button = await this.waitForElementClickable(this.verifyOtpButton, APP_CONFIG.WAIT_TIME_SHORT);
        await this.click(button);
        this.logger.log("Clicked 'Verify OTP'.");
    }
}