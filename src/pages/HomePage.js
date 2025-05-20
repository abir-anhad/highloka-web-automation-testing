// src/pages/HomePage.js
import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
// import { sleep } from '../utils/helpers.js';

export class HomePage extends BasePage {
    // Locators using provided XPaths from appConfig.js for consistency
    headerHomeButton = By.xpath(APP_CONFIG.HOME_PAGE_HEADER_HOME_BUTTON_XPATH);
    heroJoinConcertsButton = By.xpath(APP_CONFIG.HOME_PAGE_HERO_JOIN_CONCERTS_BUTTON_XPATH);
    heroDiscoverArtistsButton = By.xpath(APP_CONFIG.HOME_PAGE_HERO_DISCOVER_ARTISTS_BUTTON_XPATH);
    section3JoinConcertsButton = By.xpath(APP_CONFIG.HOME_PAGE_SECTION3_JOIN_CONCERTS_BUTTON_XPATH);

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }


    /**
     * Clicks the Home button in the header.
     */
    async clickHeaderHomeButton() {
        this.logger.log("Attempting to click Header Home Button.");
        await this.click(this.headerHomeButton); 
        this.logger.log("Clicked Header Home Button.");
    }

    /**
     * Clicks the "Join the Concerts" button in the hero section.
     */
    async clickHeroJoinConcertsButton() {
        this.logger.log("Attempting to click Hero 'Join the Concerts' Button.");
        await this.click(this.heroJoinConcertsButton);
        this.logger.log("Clicked Hero 'Join the Concerts' Button.");
    }

    /**
     * Clicks the "Discover the Artists" button in the hero section.
     */
    async clickHeroDiscoverArtistsButton() {
        this.logger.log("Attempting to click Hero 'Discover the Artists' Button.");
        await this.click(this.heroDiscoverArtistsButton);
        this.logger.log("Clicked Hero 'Discover the Artists' Button.");
    }

    /**
     * Clicks the "Join the Concerts" button in section 3.
     */
    async clickSection3JoinConcertsButton() {
        this.logger.log("Attempting to click Section 3 'Join the Concerts' Button.");
        await this.click(this.section3JoinConcertsButton);
        this.logger.log("Clicked Section 3 'Join the Concerts' Button.");
    }

    /**
     * Verifies that all key pre-login home page elements are visible.
     * @returns {Promise<boolean>} True if all specified elements are visible, false otherwise.
     */
    async verifyAllElementsVisible() {
        this.logger.log("Verifying visibility of all specified home page elements.");
        const elementsToVerify = [
            { name: "Header Home Button", locator: this.headerHomeButton },
            { name: "Hero 'Join the Concerts' Button", locator: this.heroJoinConcertsButton },
            { name: "Hero 'Discover the Artists' Button", locator: this.heroDiscoverArtistsButton },
            { name: "Section 3 'Join the Concerts' Button", locator: this.section3JoinConcertsButton },
        ];

        for (const el of elementsToVerify) {
            try {
                await this.waitForElementVisible(el.locator, APP_CONFIG.WAIT_TIME_SHORT);
                this.logger.log(`${el.name} is visible.`);
            } catch (error) {
                this.logger.error(`${el.name} is NOT visible.`, error);
                return false;
            }
        }
        this.logger.log("All specified home page elements are visible.");
        return true;
    }
}