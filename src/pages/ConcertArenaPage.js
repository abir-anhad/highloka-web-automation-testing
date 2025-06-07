import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep } from '../utils/helpers.js';


export class ArenaPage extends BasePage {


  activeConcertItem = By.xpath(APP_CONFIG.POST_LOGIN_HOME_ACTIVE_CONCERT_FIRST_ITEM_XPATH);
  lobbyPageEnterConcertButton = By.xpath(APP_CONFIG.LOBBY_PAGE_ENTER_CONCERT_BUTTON_XPATH);
  arenaFirstReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_FIRST_REACTION_BUTTON_XPATH);
  arenaSecondReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_SECOND_REACTION_BUTTON_XPATH);
  arenaThirdReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_THIRED_REACTION_BUTTON_XPATH);
  arenaFourthReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_FOURTH_REACTION_BUTTON_XPATH);
  arenaFifthReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_FIFTH_REACTION_BUTTON_XPATH);
  arenaSixthReactionButton = By.xpath(APP_CONFIG.CONCERT_ARENA_SIXTH_REACTION_BUTTON_XPATH);
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

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page First Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page First Reaction button.");

    await sleep(1000);
  }

  /**
    * Click the Arena page Second Reaction button .
  */
  async clickArenaSecondReaction(holdDuration = 2000) {
    this.logger.log(`Attempting to press and hold Arena Page Second Reaction Button for ${holdDuration}ms.`);
    const element = await this.waitForElementClickable(this.arenaSecondReactionButton, APP_CONFIG.WAIT_TIME_SHORT);

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page Second Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page Second Reaction button.");

    await sleep(1000);
  }

  /**
    * Click the Arena page Third Reaction button .
  */
  async clickArenaThirdReaction(holdDuration = 2000) {
    this.logger.log(`Attempting to press and hold Arena Page Third Reaction Button for ${holdDuration}ms.`);
    const element = await this.waitForElementClickable(this.arenaThirdReactionButton, APP_CONFIG.WAIT_TIME_SHORT);

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page Third Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page Third Reaction button.");

    await sleep(1000);
  }

  /**
    * Click the Arena page Fourth Reaction button .
  */
  async clickArenaFourthReaction(holdDuration = 2000) {
    this.logger.log(`Attempting to press and hold Arena Page Fourth Reaction Button for ${holdDuration}ms.`);
    const element = await this.waitForElementClickable(this.arenaFourthReactionButton, APP_CONFIG.WAIT_TIME_SHORT);

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page Fourth Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page Fourth Reaction button.");

    await sleep(1000);
  }

  /**
    * Click the Arena page Fifth Reaction button .
  */
  async clickArenaFifthReaction(holdDuration = 2000) {
    this.logger.log(`Attempting to press and hold Arena Page Fifth Reaction Button for ${holdDuration}ms.`);
    const element = await this.waitForElementClickable(this.arenaFifthReactionButton, APP_CONFIG.WAIT_TIME_SHORT);

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page Fifth Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page Fifth Reaction button.");

    await sleep(1000);
  }

  /**
    * Click the Arena page Sixth Reaction button .
  */
  async clickArenaSixthReaction(holdDuration = 2000) {
    this.logger.log(`Attempting to press and hold Arena Page Sixth Reaction Button for ${holdDuration}ms.`);
    const element = await this.waitForElementClickable(this.arenaSixthReactionButton, APP_CONFIG.WAIT_TIME_SHORT);

    const actions = this.driverActions.driver.actions({ async: true });

    await actions.move({ origin: element }).press().perform();
    this.logger.log("Mouse button pressed down on Arena page Sixth Reaction button.");

    await sleep(holdDuration);

    // Release the mouse button
    await actions.release().perform();
    this.logger.log("Mouse button released on Arena page Sixth Reaction button.");

    await sleep(1000);
  }

  /**
    * Arena page Chat Input Box Send Text .
  */
  async arenaPageChatInputTyping() {
    this.logger.log("Attempting to Chat Input Box Send Text'.");
    let element = await this.findElement(this.arenaPageChatInputBox, APP_CONFIG.WAIT_TIME_SHORT);
    await element.sendKeys("Hello Highloka..");
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



  handleNewChatMessage = (chat) => {
    console.log(`NEW MESSAGE at ${new Date().toLocaleTimeString()}: `);

    console.log('---');
    if (chat.userId !== 'null null') {
      console.log(`User ID: ${chat.userId}`);
      console.log(`Message: ${chat.message}`);
    }
    if(chat.message == "Hello Highloka.."){
      console.log(`Chat Message : Passed!`);
    }
  };
  getMessageSignature(userId, message) {
    return `USER:${userId}---MSG:${message}`;
  }
  async observeNewChats(driver, newChatHandler, pollIntervalMs = 3000) {
    const processedMessageSignatures = new Set();
    let isObserving = true;

    // populate existing messages 
    // We still add them to processedMessageSignatures.

    await this.fetchNewChatMessages(driver, processedMessageSignatures, newChatHandler);

    const intervalId = setInterval(async () => {
      if (!isObserving) return;
      await this.fetchNewChatMessages(driver, processedMessageSignatures, newChatHandler);
    }, pollIntervalMs);

    return () => {
      isObserving = false;
      clearInterval(intervalId);
      console.log("Chat observer stopped.");
    };
  }

  async fetchNewChatMessages(driver, processedMessageSignatures, onNewChatCallback) {
    try {
      const chatMessageElements = await driver.findElements(By.css('div.chat-text-viewchat-text-view_styles_chat-text-view__fWR0W'));
      let newMessagesFoundInThisPoll = false;

      for (const messageElement of chatMessageElements) {
        let userId = 'N/A';
        let message = 'N/A';
        let currentMessageSignature = '';

        try {
          const userIdElement = await messageElement.findElement(By.css('span.chat-text-view_styles_chatSenderName__fjqUw'));
          userId = await userIdElement.getText();

          const messageTextElement = await messageElement.findElement(By.css('span.chat-text-view_styles_chat-text-content__ymUhG'));
          message = await messageTextElement.getText();

          currentMessageSignature = this.getMessageSignature(userId, message);

          if (!processedMessageSignatures.has(currentMessageSignature)) {
            processedMessageSignatures.add(currentMessageSignature);
            if (onNewChatCallback && typeof onNewChatCallback === 'function') {
              onNewChatCallback({ userId, message });
            }
            newMessagesFoundInThisPoll = true;
          }
        } catch (e) {
          // Ignore if a specific message element
          // eta ignore korai valo
          // console.warn("Could not fully parse.", e.message);
        }
      }

    } catch (error) {
      console.error("Error polling:", error);
    }
  }
  async testObserveChat() {
    await this.observeNewChats(this.driverActions.driver, this.handleNewChatMessage)
  }


}
