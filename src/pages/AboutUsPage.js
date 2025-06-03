import { sleep } from '../utils/helpers.js';
export class AboutUsPage {
  constructor(browserManager, logger) {
    this.driver = browserManager.driver;
    this.logger = logger;
  }

  async checkWelcomeHeader() {
    const headerXPath = '/html/body/div/div/main/div/div[2]/div[1]/div/div[2]/div/h1';
    this.logger.log('Checking for Welcome header...');
    const headerElement = await this.driver.findElement({ xpath: headerXPath });
    const isDisplayed = await headerElement.isDisplayed();
    if (!isDisplayed) {
      throw new Error('Welcome header not visible');
    }
  }

  async checkHeroSection() {
    const heroXPath = '/html/body/div/div/main/div/div[2]/div[1]/div/div[2]/div/div';
    this.logger.log('Checking for Hero section...');
    const heroElement = await this.driver.findElement({ xpath: heroXPath });
    const isDisplayed = await heroElement.isDisplayed();
    if (!isDisplayed) {
      throw new Error('Hero section not visible');
    }
  }

  async scrollDownAndUp() {
    const scrollContainerXPath = '/html/body/div/div/main';
    this.logger.log('Scrolling down and then up...');

    const scrollableDiv = await this.driver.findElement({ xpath: scrollContainerXPath });

    // Scroll to bottom
    await this.driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", scrollableDiv);
    await new Promise(res => setTimeout(res, 2000));

    // Scroll back up
    await this.driver.executeScript("arguments[0].scrollTop = 0", scrollableDiv);
    await new Promise(res => setTimeout(res, 2000));
  }
}
