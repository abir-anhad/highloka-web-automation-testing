// src/pages/BasePage.js
import { By } from 'selenium-webdriver';

export class BasePage {
    /** @type {import('../core/BrowserManager.js').BrowserManager} */
    driverActions;
    /** @type {import('../utils/Logger.js').Logger} */
    logger;

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        this.driverActions = driverActions;
        this.logger = logger;
    }

    /**
     * @param {By} locator
     * @param {number} [timeout]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async findElement(locator, timeout) {
        return this.driverActions.findElement(locator, timeout);
    }

    /**
     * Clicks an element. Relies on BrowserManager for advanced click handling (like interception).
     * @param {import('selenium-webdriver').WebElement | By} elementOrLocator
     * @param {number} [timeout]
     */
    async click(elementOrLocator, timeout) {
        await this.driverActions.click(elementOrLocator, timeout);
    }

    /**
     * @param {import('selenium-webdriver').WebElement | By} elementOrLocator
     * @param {string | number} text
     * @param {number} [timeout]
     */
    async type(elementOrLocator, text, timeout) {
        await this.driverActions.type(elementOrLocator, text, timeout);
    }

    /**
     * @param {import('selenium-webdriver').WebElement | By} elementOrLocator
     * @param {number} [timeout]
     */
    async clear(elementOrLocator, timeout) {
        await this.driverActions.clear(elementOrLocator, timeout);
    }

    /**
     * Waits for an element to be visible.
     * @param {By} locator - The Selenium By locator.
     * @param {number} [timeout] - Timeout in milliseconds.
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async waitForElementVisible(locator, timeout) { // <<< ENSURE THIS METHOD IS PRESENT
        return this.driverActions.waitForElementVisible(locator, timeout);
    }

    /**
     * Waits for an element to be clickable.
     * @param {By} locator
     * @param {number} [timeout]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async waitForElementClickable(locator, timeout) {
        return this.driverActions.waitForElementClickable(locator, timeout);
    }
}