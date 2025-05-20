// src/core/BrowserManager.js
import { Builder, By, until } from 'selenium-webdriver'; // Removed Key as it's not used here directly
import chrome from 'selenium-webdriver/chrome.js';
import { APP_CONFIG } from '../config/appConfig.js';
// import path from 'path'; // If using profile dir

export class BrowserManager {
    /** @type {import('selenium-webdriver').WebDriver} */
    driver;

    constructor() {}

    /**
     * @returns {Promise<import('selenium-webdriver').WebDriver>}
     */
    async buildDriver() {
        const chromeOptions = new chrome.Options();

        // Standard arguments
        chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
        chromeOptions.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36");

        // Directly manipulate 'goog:chromeOptions' for reliability
        // Ensure 'goog:chromeOptions' object exists on the capabilities map
        let googChromeOpts = chromeOptions.get('goog:chromeOptions');
        if (!googChromeOpts || typeof googChromeOpts !== 'object') {
            googChromeOpts = {};
        }

        // Set the desired experimental options directly
        // This mirrors what add_experimental_option('excludeSwitches', ...) and
        // add_experimental_option('useAutomationExtension', ...) would do in Python.
        googChromeOpts.excludeSwitches = ["enable-automation"];
        googChromeOpts.useAutomationExtension = false;

        // Set the modified/created googChromeOpts back onto the chromeOptions
        chromeOptions.set('goog:chromeOptions', googChromeOpts);

        // For profile (if you enable it later):
        // const profilePath = path.resolve(APP_CONFIG.USER_PROFILE_DIR);
        // if (APP_CONFIG.USER_PROFILE_DIR) {
        //    // Profile path should also be an argument
        //    chromeOptions.addArguments(`user-data-dir=${profilePath}`);
        // }

        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions) // Pass the configured options object
            .build();

        await this.driver.manage().setTimeouts({ implicit: 0, pageLoad: 300000, script: 30000 });
        return this.driver;
    }

    async quitDriver() {
        if (this.driver) {
            await this.driver.quit();
        }
    }

    /** @param {string} url */
    async get(url) {
        await this.driver.get(url);
    }

    async maximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    /**
     * @private
     * @param {import('selenium-webdriver').By} locator
     * @param {number} [timeout=APP_CONFIG.WAIT_TIME_MEDIUM]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async _findElement(locator, timeout = APP_CONFIG.WAIT_TIME_MEDIUM) {
        await this.driver.wait(until.elementLocated(locator), timeout, `Timeout waiting for element: ${locator.toString()}`);
        return this.driver.findElement(locator);
    }

    /**
     * @param {import('selenium-webdriver').By} locator
     * @param {number} [timeout=APP_CONFIG.WAIT_TIME_MEDIUM]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async findElement(locator, timeout = APP_CONFIG.WAIT_TIME_MEDIUM) {
        return this._findElement(locator, timeout);
    }

    /**
     * @param {import('selenium-webdriver').By} locator
     * @param {number} [timeout=APP_CONFIG.WAIT_TIME_MEDIUM]
     * @returns {Promise<import('selenium-webdriver').WebElement[]>}
     */
    async findElements(locator, timeout = APP_CONFIG.WAIT_TIME_MEDIUM) {
        await this.driver.wait(until.elementsLocated(locator), timeout, `Timeout waiting for elements: ${locator.toString()}`);
        return this.driver.findElements(locator);
    }

    /**
     * @param {import('selenium-webdriver').WebElement | import('selenium-webdriver').By} elementOrLocator
     * @param {number} [timeout]
     */
    async click(elementOrLocator, timeout) {
        const element = elementOrLocator instanceof By ? await this.waitForElementClickable(elementOrLocator, timeout) : elementOrLocator;
        await element.click();
    }

    /**
     * @param {import('selenium-webdriver').WebElement | import('selenium-webdriver').By} elementOrLocator
     * @param {string | number} text
     * @param {number} [timeout]
     */
    async type(elementOrLocator, text, timeout) {
        const element = elementOrLocator instanceof By ? await this.waitForElementVisible(elementOrLocator, timeout) : elementOrLocator;
        await element.sendKeys(text);
    }

    /**
     * @param {import('selenium-webdriver').WebElement | import('selenium-webdriver').By} elementOrLocator
     * @param {number} [timeout]
     */
    async clear(elementOrLocator, timeout) {
        const element = elementOrLocator instanceof By ? await this.waitForElementVisible(elementOrLocator, timeout) : elementOrLocator;
        await element.clear();
    }

    /**
     * @param {import('selenium-webdriver').By} locator
     * @param {number} [timeout=APP_CONFIG.WAIT_TIME_MEDIUM]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async waitForElementVisible(locator, timeout = APP_CONFIG.WAIT_TIME_MEDIUM) {
        const element = await this._findElement(locator, timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout, `Timeout: Element ${locator.toString()} not visible.`);
        return element;
    }

    /**
     * @param {import('selenium-webdriver').By} locator
     * @param {number} [timeout=APP_CONFIG.WAIT_TIME_MEDIUM]
     * @returns {Promise<import('selenium-webdriver').WebElement>}
     */
    async waitForElementClickable(locator, timeout = APP_CONFIG.WAIT_TIME_MEDIUM) {
        const element = await this.waitForElementVisible(locator, timeout);
        await this.driver.wait(async () => {
            try {
                return await element.isEnabled() && await element.isDisplayed();
            } catch (e) {
                return false;
            }
        }, timeout, `Timeout: Element ${locator.toString()} not clickable.`);
        return element;
    }

    /**
     * @template T
     * @param {string} script
     * @param  {...any} args
     * @returns {Promise<T>}
     */
    async executeJs(script, ...args) {
        return this.driver.executeScript(script, ...args);
    }

    /**
     * @returns {Promise<string>}
     */
    async getCurrentUrl() {
        return this.driver.getCurrentUrl();
    }
}