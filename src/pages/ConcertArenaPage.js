import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';


export class ArenaPage extends BasePage {


  activeConcertItem = By.xpath(APP_CONFIG.POST_LOGIN_HOME_ACTIVE_CONCERT_FIRST_ITEM_XPATH);
  lobbyPageEnterConcertButton = By.xpath(APP_CONFIG.LOBBY_PAGE_ENTER_CONCERT_BUTTON_XPATH);
  arenaFirstReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_FIRST_REACTION_BUTTON_XPATH);
  arenaPageChatInputBox = By.xpath(APP_CONFIG.CONCERT_ARENA_CHAT_INPUT_BOX_XPATH);
  arenaPageChatInputSubmitButton = By.xpath(APP_CONFIG.CONCERT_ARENA_CHAT_INPUT_SUBMIT_BUTTON_XPATH);
  arenaPageNitroModeToggleButton = By.xpath(APP_CONFIG.CONCERT_ARENA_NITRO_MODE_TOGGLE_BUTTON_XPATH);

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
    * Click the Lobby Enter Concert .
  */
  async clickLobbyEnterConcert() {
    this.logger.log("Attempting to click Lobby Page 'Enter Concert'.");
    await this.click(this.lobbyPageEnterConcertButton);
    this.logger.log("Clicked Enter Concert in Lobby Page.");
  }

  /**
    * Click the Arena page First Reaction button .
  */
  async clickArenaFirstReaction(holdDuration = 2000) {
    // this.logger.log("Attempting to click Arena Page First Reaction Button'.");
    // const element = await this.waitForElementClickable(this.arenaFirstReactionButton, APP_CONFIG.WAIT_TIME_SHORT); //
    // const actions = this.driverActions.driver.actions({ async: true }); //
    // await actions.move({ origin: element }).press().perform(); //
    // await sleep(3000);
    // this.logger.log("Clicked Arena page First Reaction button.");
  this.logger.log(`Attempting to press and hold Arena Page First Reaction Button for ${holdDuration}ms.`);
        const element = await this.waitForElementClickable(this.arenaFirstReactionButton, APP_CONFIG.WAIT_TIME_SHORT);
        
        const actions = this.driverActions.driver.actions({async: true});
        
        await actions.move({origin: element}).press().perform();
        this.logger.log("Mouse button pressed down on Arena page First Reaction button.");
       
        await sleep(holdDuration);
        
        // Release the mouse button
        await actions.release().perform();
        this.logger.log("Mouse button released on Arena page First Reaction button.");
        
        await sleep(1000); 
  }

  /**
    * Arena page Chat Input Box Send Text .
  */
  async arenaPageChatInputTyping() {
    this.logger.log("Attempting to Chat Input Box Send Text'.");
    let element = await this.findElement(this.arenaPageChatInputBox, APP_CONFIG.WAIT_TIME_SHORT);
    await element.sendKeys("hi..");
    await sleep(3000);
    this.logger.log("After Chat Input Box Send Text.");
  }

  /**
    * Click the Arena page First Reaction button .
  */
  async clickArenaChatSubmitButton() {
    this.logger.log("Attempting to Submit Chat Meassage in Arena Page'.");
    await this.click(this.arenaPageChatInputSubmitButton);
    this.logger.log("Clicked Submit Chat Meassage in Arena Page.");
  }

  /**
    * Click the Arena page Nitro Mode Toggle button .
  */
  async clickArenaNitroModeToggleButton() {
    this.logger.log("Attempting to Nitro Mode Toggle in Arena Page'.");
    await this.click(this.arenaPageNitroModeToggleButton);
    this.logger.log("Clicked Nitro Mode Toggle in Arena Page.");
  }


  /**
   * Go back to Lobby page.
  */
  async goBackToLobby() {
    this.logger.log('Navigating back to lobby...');
    await this.driverActions.driver.navigate().back();
    await sleep(3000);
    this.logger.log('Returned to lobby page.');
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
