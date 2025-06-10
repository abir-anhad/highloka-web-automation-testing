import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';


export class ConcertLandingPage extends BasePage {


  activeConcertItem = By.xpath(APP_CONFIG.POST_LOGIN_HOME_ACTIVE_CONCERT_FIRST_ITEM_XPATH);
  lobbyPageViewDetailsText = By.xpath(APP_CONFIG.LOBBY_PAGE_VIEW_DETAILS_TEXT_XPATH);
  concertLandingTopSectionEnterConcertButton = By.xpath(APP_CONFIG.CONCERT_LANDING_TOP_SECTION_ENTER_CONCERT_BUTTON_XPATH);
  hereGlimpseSectionScrollTo = By.xpath(APP_CONFIG.CONCERT_LANDING_GLIMPSE_SECTION_XPATH);
  hereGlimpseSectionVideoClick = By.xpath(APP_CONFIG.CONCERT_LANDING_GLIMPSE_SECTION_VIDEO_CLICK_XPATH);
  concertLandingBottomSectionScrollTo = By.xpath(APP_CONFIG.CONCERT_LANDING_BOTTOM_SECTION_XPATH);
  concertLandingBottomSectionEnterConcertButton = By.xpath(APP_CONFIG.CONCERT_LANDING_BOTTOM_SECTION_ENTER_CONCERT_BUTTON_XPATH);

  /**
   * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
   * @param {import('../utils/Logger.js').Logger} logger
   */
  constructor(driverActions, logger) {
    super(driverActions, logger);
    // this.browserManager = driverActions;
  }

  /**
   * Helper to scroll to an element and wait.
   * @param {By} locator - The locator of the element to scroll to.
   * @param {string} elementName - A friendly name for logging.
   */

  /**
    * Click the Active Concert First Item.
  */
  async clickActiveConcert() {
    this.logger.log("Attempting to click  'Active Concert Item'.");
    await this.click(this.activeConcertItem);
    this.logger.log("Clicked Active Concert Item.");
  }

  /**
    * Click the Lobby View Details .
  */
  async clickLobbyEnterConcert() {
    this.logger.log("Attempting to click Lobby Page 'View Details'.");
    await this.click(this.lobbyPageViewDetailsText);
    this.logger.log("Clicked View Details in Lobby Page.");
  }

  /**
    * Click the Concert landing top Enter Concert button.
  */
  async clickConcertLandingEnterConcert() {
    this.logger.log("Attempting to click Concert landing top Enter Concert button.");
    await this.click(this.concertLandingTopSectionEnterConcertButton);
    this.logger.log("Clicked Concert landing top Enter Concert button.");
  }

  /**
   * Go back to Concert Landing page.
  */
  async goBackToConcertLanding() {
    this.logger.log('Navigating back to Concert Landing...');
    await this.driverActions.driver.navigate().back();
    await sleep(3000);
    this.logger.log('Returned to Concert Landing page.');
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
    * Scroll to Concert landing Glimpse On-demand Video.
  */

  async hereGlimpseSectionScrollDown() {
    await this.scrollToElement(this.hereGlimpseSectionScrollTo, "Section 3");
    await new Promise(res => setTimeout(res, 2000));
  }


 /**
    * Click the Concert landing Glimpse On-demand Video.
  */
  async clickConcertLandingOnDemandVideo() {
    this.logger.log("Attempting to click Concert landing Glimpse On-demand Video.");
    await this.click(this.hereGlimpseSectionVideoClick);
    this.logger.log("Clicked Concert landing Glimpse On-demand Video.");
  }

   /**
    * Scroll to Concert landing Bottom Section.
  */

  async bottomSectionScrollDown() {
    await this.scrollToElement(this.concertLandingBottomSectionScrollTo, "Section 5");
    await new Promise(res => setTimeout(res, 2000));
  }

  /**
    * Click the Concert landing bottom Enter Concert button.
  */
  async clickConcertLandingBottomEnterConcert() {
    this.logger.log("Attempting to click Concert landing bottom Enter Concert button.");
    await this.click(this.concertLandingBottomSectionEnterConcertButton);
    this.logger.log("Clicked Concert landing bottom Enter Concert button.");
  }
  

  /**
   * Go back to Lobby page.
  */
  async goBackToHome() {
    this.logger.log('Navigating back to Home...');
    await this.driverActions.driver.navigate().to('https://test.highloka.com/home');
    await sleep(3000);
    this.logger.log('Returned to Home Page.');
  }



}
