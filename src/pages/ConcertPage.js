import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';

export class ConcertPage extends BasePage {
    getTicketOrFirstEnterButton = By.xpath(APP_CONFIG.GET_TICKET_OR_FIRST_ENTER_CONCERT_XPATH);
    finalEnterConcertButton = By.xpath(APP_CONFIG.FINAL_ENTER_CONCERT_XPATH);

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }

    async navigateToConcertPage() {
        this.logger.log(`Profile setup complete. Navigating to concert page: ${APP_CONFIG.CONCERT_REDIRECT_URL}`);
        await this.driverActions.get(APP_CONFIG.CONCERT_REDIRECT_URL);
        await sleep(3000); // Allow concert page to load
    }

    async clickGetTicketOrInitialEnter() {
        this.logger.log("Checking for 'Get Ticket' or initial 'Enter Concert' button.");
        try {
            const button = await this.waitForElementClickable(this.getTicketOrFirstEnterButton, APP_CONFIG.WAIT_TIME_SHORT);
            await this.click(button);
            this.logger.log("Clicked 'Get Ticket' or initial 'Enter Concert' button.");
            await sleep(2000); // Wait after click
        } catch (e) {
            this.logger.warn(`'Get Ticket' or initial 'Enter Concert' button not found. Skipping. Details: ${e.message}`);
        }
    }

    async clickFinalEnterConcert() {
        this.logger.log("Checking for final 'Enter Concert' button.");
        try {
            const finalButton = await this.waitForElementClickable(this.finalEnterConcertButton, APP_CONFIG.WAIT_TIME_SHORT);
            await this.click(finalButton);
            this.logger.log("Clicked final 'Enter Concert' button.");
            await sleep(2000); // Wait after click
        } catch (e) {
            this.logger.warn(`Final 'Enter Concert' button not found. Skipping. Details: ${e.message}`);
        }
    }
}