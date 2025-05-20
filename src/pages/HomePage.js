// src/pages/HomePage.js
import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';

export class HomePage extends BasePage {
    // Locators from appConfig.js
    headerHomeButton = By.xpath(APP_CONFIG.HOME_PAGE_HEADER_HOME_BUTTON_XPATH);
    heroJoinConcertsButton = By.xpath(APP_CONFIG.HOME_PAGE_HERO_JOIN_CONCERTS_BUTTON_XPATH);
    heroDiscoverArtistsButton = By.xpath(APP_CONFIG.HOME_PAGE_HERO_DISCOVER_ARTISTS_BUTTON_XPATH);
    heroJoinConcertsButton = By.xpath(APP_CONFIG.HOME_PAGE_HERO_JOIN_CONCERTS_BUTTON_XPATH);

    leftArrowOnHomePage = By.xpath(APP_CONFIG.HOME_PAGE_LEFT_ARROW);
    rightArrowOnHomePage = By.xpath(APP_CONFIG.HOME_PAGE_RIGHT_ARROW);


    // Scroll target locators
    section1ToScrollTo = By.xpath(APP_CONFIG.HOME_PAGE_SECTION1_TO_SCROLL_XPATH);
    section2ToScrollTo = By.xpath(APP_CONFIG.HOME_PAGE_SECTION2_TO_SCROLL_XPATH);


    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }

    /**
     * Helper to scroll to an element and wait.
     * @param {By} locator - The locator of the element to scroll to.
     * @param {string} elementName - A friendly name for logging.
     */
    async scrollToElement(locator, elementName) {
        this.logger.log(`Attempting to scroll to ${elementName}.`);
        try {
            // Wait for the element to be present and visible in the DOM first.
            const element = await this.waitForElementVisible(locator, APP_CONFIG.WAIT_TIME_SHORT);
            
            // Execute JavaScript to scroll the element into the center of the view.
            // The scrollIntoView method inherently handles scrolling up or down.
            // Using {block: 'center'} attempts to place the element in the middle of the viewport.
            await this.driverActions.executeJs("arguments[0].scrollIntoView({behavior: 'auto', block: 'center'});", element);
            
            this.logger.log(`Scrolled to ${elementName} (centered).`);
            // Wait for a short period to allow any scroll-triggered animations or lazy loading to complete.
            await sleep(500);
        } catch (error) {
            this.logger.error(`Error scrolling to ${elementName}: ${error.message}`, error);
            // Re-throw the error so that the calling test/method is aware of the failure.
            throw error;
        }
    }
    
        /**
     * Clicks the Header Home Button.
     * (Derived from clickHeroButtonsScrollToSection1)
     */
        async clickHeaderHomeButtonInHeroContext() {
  
            this.logger.log("Attempting to click Header Home Button.");
            await this.click(this.headerHomeButton);
            this.logger.log("Clicked Header Home Button.");
        }
    
        /**
         * Clicks the Hero 'Discover the Artists' Button.
         * (Derived from clickHeroButtonsScrollToSection1)
         */
        async clickHeroDiscoverArtistsButtonInHeroContext() {

            this.logger.log("Attempting to click Hero 'Discover the Artists' Button.");
            await this.click(this.heroDiscoverArtistsButton);
            this.logger.log("Clicked Hero 'Discover the Artists' Button.");
        }
    
        /**
         * Clicks the Hero 'Join the Concerts' Button.
         * (Derived from clickHeroButtonsScrollToSection1)
         */
        async clickHeroJoinConcertsButtonInHeroContext() {

            this.logger.log("Attempting to click Hero 'Join the Concerts' Button.");
            await this.click(this.heroJoinConcertsButton);
            this.logger.log("Clicked Hero 'Join the Concerts' Button.");
        }
    


    /**
     * Scrolls to Section 2 and then clicks the Left Arrow.
     */
    async clickLeftRightArrowsScrollToSection2() {
        this.logger.log("Attempting to scroll to Section 2 before clicking Left Arrow.");
        await this.scrollToElement(this.section2ToScrollTo, "Section 2");

        this.logger.log("Attempting to click Right Arrow.");
        for (let i = 0; i < 50; i++) {
            await this.click(this.rightArrowOnHomePage);
            this.logger.log("Clicked Right Arrow.");
        }

        this.logger.log("Attempting to click Left Arrow.");
        await this.click(this.leftArrowOnHomePage);
        this.logger.log("Clicked Left Arrow.");

    }

    /**
       * Performs a sequence of interactions on the Home Page:
       * Scrolls to Section 1, clicks header/hero buttons, then scrolls to Section 3 and clicks a button there.
       */
    async performInitialHomePageInteractions() {
        this.logger.log("Starting initial Home Page interactions sequence.");

        await this.scrollToElement(this.section1ToScrollTo, "Section 1");

        this.logger.log("Attempting to click Header Home Button.");
        await this.click(this.headerHomeButton);
        this.logger.log("Clicked Header Home Button.");

        this.logger.log("Re-scrolling to Section 1 after clicking Home button to ensure context.");
        await this.scrollToElement(this.section1ToScrollTo, "Section 1 (after Home click)");

        this.logger.log("Attempting to click Hero 'Join the Concerts' Button.");
        await this.click(this.heroJoinConcertsButton);
        this.logger.log("Clicked Hero 'Join the Concerts' Button.");

        this.logger.log("Attempting to click Hero 'Discover the Artists' Button.");
        await this.click(this.heroDiscoverArtistsButton);
        this.logger.log("Clicked Hero 'Discover the Artists' Button.");

        this.logger.log("Proceeding to Section 3 interactions.");
        await this.scrollToElement(this.section3ToScrollTo, "Section 3");
        await this.clickSection3JoinConcertsButtonDetailed();

        this.logger.log("Finished initial Home Page interactions sequence.");
    }

    /**
     * Verifies that all key pre-login home page elements are visible.
     * @returns {Promise<boolean>} True if all specified elements are visible, false otherwise.
     */
    /**
        * Verifies that all key pre-login home page elements are visible, section by section.
        * @returns {Promise<boolean>} True if all specified elements are visible, false otherwise.
        */
    async verifyAllElementsVisibleSectionWise() {
        this.logger.log("Verifying visibility of home page elements section by section.");
        let overallVisibility = true;

        // Define elements per section
        const headerElements = [
            { name: "Header Home Button", locator: this.headerHomeButton },
        ];

        const section1Elements = [
            { name: "Section 1 Hero 'Join the Concerts' Button", locator: this.heroJoinConcertsButton },
            { name: "Section 1 Hero 'Discover the Artists' Button", locator: this.heroDiscoverArtistsButton },
        ];

        const section2Elements = [
            { name: "Section 2 Left Arrow", locator: this.leftArrowOnHomePage },
            { name: "Section 2 Right Arrow", locator: this.rightArrowOnHomePage },
        ];

        // Helper function to verify elements in a list
        const verifyElementList = async (elements, sectionName, sectionScrollLocator = null) => {
            let sectionVisibility = true;
            if (sectionScrollLocator) {
                this.logger.log(`Scrolling to ${sectionName} for verification.`);
                try {
                    await this.scrollToElement(sectionScrollLocator, sectionName);
                } catch (scrollError) {
                    this.logger.error(`Failed to scroll to ${sectionName}. Cannot verify its elements. Error: ${scrollError.message}`);
                    overallVisibility = false; 
                    return false; 
                }
            } else {
                this.logger.log(`Verifying elements in ${sectionName} (no explicit scroll locator for this group).`);
            }

            for (const el of elements) {
                this.logger.log(`Verifying visibility of: ${el.name}`);
                try {
                    await this.waitForElementVisible(el.locator, APP_CONFIG.WAIT_TIME_SHORT);
                    this.logger.log(`${el.name} is visible.`);
                } catch (error) {
                    this.logger.error(`${el.name} is NOT visible. Error: ${error.message}`);
                    sectionVisibility = false;
                    overallVisibility = false; // Mark overall as false if any element is not visible
                }
            }
            return sectionVisibility;
        };

        this.logger.log("--- Verifying Header Elements ---");

        await this.scrollToElement(this.section1ToScrollTo, "Top of Page (for Header)");
        await verifyElementList(headerElements, "Header");

        this.logger.log("--- Verifying Section 1 Elements ---");
        await verifyElementList(section1Elements, "Section 1", this.section1ToScrollTo);

        this.logger.log("--- Verifying Section 2 Elements ---");
        await verifyElementList(section2Elements, "Section 2", this.section2ToScrollTo);


        if (overallVisibility) {
            this.logger.log("All specified home page elements verified successfully across sections.");
        } else {
            this.logger.error("One or more specified home page elements were NOT visible.");
        }
        return overallVisibility;
    }
}