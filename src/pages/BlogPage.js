// src/pages/BlogPage.js
import { sleep } from '../utils/helpers.js';
export class BlogPage {
  constructor(browserManager, logger) {
    this.driver = browserManager.driver;
    this.logger = logger;
    this.locators = {
      getInTouchButtonXPath: '/html/body/div/div/main/div/div[1]/div/div/div/div',
    };
  }


async scrollDownThenUp() {
  this.logger.log('Testing scroll down then up on scrollable div...');

  // Locate the scrollable div
  const scrollableDiv = await this.driver.findElement({xpath:'/html/body/div/div/main'}); // update selector if needed

  // Scroll to bottom
  await this.driver.executeScript(
    'arguments[0].scrollTop = arguments[0].scrollHeight',
    scrollableDiv
  );
  await sleep(2000);

  // Scroll to top
  await this.driver.executeScript(
    'arguments[0].scrollTop = 0',
    scrollableDiv
  );
  await sleep(2000);

  this.logger.log('Div scroll down and up completed');
}

  async clickGetInTouchButton() {
    this.logger.log('Testing Get in Touch button click...');
    const button = await this.driver.findElement({ xpath: this.locators.getInTouchButtonXPath });
    await button.click();
    await sleep(3000); // Wait for any navigation or effect

    const currentUrl = await this.driver.getCurrentUrl();
    this.logger.log(`Current URL after clicking: ${currentUrl}`);
    if (!currentUrl.includes('contact')) {
      throw new Error('Clicking Get in Touch did not navigate to contact section/page.');
    }
  }
}
