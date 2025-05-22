import { sleep } from '../utils/helpers.js';

export class LobbyPage {
  constructor(browserManager, logger) {
    this.browserManager = browserManager;
    this.logger = logger;
  }

  async clickConcertTileInMyEvents() {
    this.logger.log('Clicking on concert tile in My Events...');
    const tile = await this.browserManager.driver.findElement({
      xpath: '/html/body/div/div/main/div[1]/div[2]/div[1]/div/div/div/div',
    });
    await tile.click();
    await sleep(5000);

    const currentUrl = await this.browserManager.driver.getCurrentUrl();
    if (!currentUrl.includes('/concerts/may-ondemand/lobby')) {
      throw new Error('Redirect to lobby failed.');
    }
    this.logger.log('Redirected to lobby page successfully.');
  }

  async clickEnterConcertAndVerifyArena() {
    this.logger.log('Clicking Enter Concert on Lobby page...');
    const enterBtn = await this.browserManager.driver.findElement({
      xpath: '//*[@id="__next"]/div/main/div/section/div/div[1]/div[2]/div/div[2]/a',
    });
    await enterBtn.click();
    await sleep(5000);

    const currentUrl = await this.browserManager.driver.getCurrentUrl();
    if (!currentUrl.includes('/concerts/may-ondemand/arena')) {
      throw new Error('Redirect to arena page failed.');
    }
    this.logger.log('Successfully redirected to arena page.');
  }

  async goBackToLobby() {
    this.logger.log('Navigating back to lobby...');
    await this.browserManager.driver.navigate().back();
    await sleep(3000);

    const currentUrl = await this.browserManager.driver.getCurrentUrl();
    if (!currentUrl.includes('/concerts/may-ondemand/lobby')) {
      throw new Error('Failed to return to lobby page.');
    }
    this.logger.log('Returned to lobby page.');
  }

  async clickViewDetailsAndVerifyRedirect() {
    this.logger.log('Clicking "View Details"...');
    const viewDetails = await this.browserManager.driver.findElement({
      xpath: '//*[@id="__next"]/div/main/div/section/div/div[1]/div[2]/div/div[2]/p',
    });
    await viewDetails.click();
    await sleep(5000);

    const currentUrl = await this.browserManager.driver.getCurrentUrl();
    if (!currentUrl.includes('/concerts/may-ondemand')) {
      throw new Error('Redirect to concert details failed.');
    }
    this.logger.log('Redirected to concert details page.');
  }
}
