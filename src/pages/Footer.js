export class FooterPage {


  constructor(browserManager, logger) {
    this.driver = browserManager.driver;
    this.browserManager = browserManager;
    this.logger = logger;
  }


  async scrollToFooter() {
    const scrollableDivXPath = '/html/body/div/div/main';
    this.logger.log('Scrolling down to footer...');
    const mainContainer = await this.driver.findElement({ xpath: scrollableDivXPath });
    await this.driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", mainContainer);
    await new Promise(res => setTimeout(res, 3000));
  }
  //Legal page

  async checkFooterVisible() {
    const footerXPath = '/html/body/div/div/main/div/div[3]/div/div';
    this.logger.log('Checking if footer is visible...');
    const footer = await this.driver.findElement({ xpath: footerXPath });
    const isDisplayed = await footer.isDisplayed();
    if (!isDisplayed) {
      throw new Error('Footer not visible');
    }
  }

  async testTermsAndConditionsLink() {
    const tcXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[2]/ul/li[1]';
    const expectedUrl = 'https://test.highloka.com/legal?section=TermsAndConditions';
    this.logger.log('Clicking Terms & Conditions...');
    const tcLink = await this.driver.findElement({ xpath: tcXPath });
    await tcLink.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`T&C URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async testPrivacyPolicyLink() {
    const ppXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[2]/ul/li[2]';
    const expectedUrl = 'https://test.highloka.com/legal?section=PrivacyPolicy';
    this.logger.log('Clicking Privacy Policy...');
    const ppLink = await this.driver.findElement({ xpath: ppXPath });
    await ppLink.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Privacy Policy URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async testRefundsPolicyLink() {
    const refundsXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[2]/ul/li[3]';
    const expectedUrl = 'https://test.highloka.com/legal?section=RefundsAndCancellations';
    this.logger.log('Clicking Refunds Policy...');
    const refundsLink = await this.driver.findElement({ xpath: refundsXPath });
    await refundsLink.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Refunds URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async returnToHomeAndScrollFooter() {
    this.logger.log('Returning to home and scrolling down...');
    await this.driver.get('https://test.highloka.com/');
    await this.driver.sleep(4000);
    await this.scrollToFooter();
  }


  /**
 * Page shortcuts
 */
    async testHomeLink() {
    const homeXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[1]/ul/li[1]';
    const expectedUrl = 'https://test.highloka.com';
    this.logger.log('Clicking Home from footer...');
    const link = await this.driver.findElement({ xpath: homeXPath });
    await link.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.startsWith(expectedUrl)) {
      throw new Error(`Home URL mismatch. Expected start with: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async testAboutUsLink() {
    const aboutXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[1]/ul/li[2]';
    const expectedUrl = 'https://test.highloka.com/about_us';
    this.logger.log('Clicking About Us from footer...');
    const link = await this.driver.findElement({ xpath: aboutXPath });
    await link.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`About Us URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async testBlogsLink() {
    const blogXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[1]/ul/li[3]';
    const expectedUrl = 'https://test.highloka.com/blog';
    this.logger.log('Clicking Blogs from footer...');
    const link = await this.driver.findElement({ xpath: blogXPath });
    await link.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Blogs URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

  async testContactUsLink() {
    const contactXPath = '/html/body/div/div/main/div/div[3]/div/div/div/div[1]/div[2]/div[1]/ul/li[4]';
    const expectedUrl = 'https://test.highloka.com/contact_us';
    this.logger.log('Clicking Contact Us from footer...');
    const link = await this.driver.findElement({ xpath: contactXPath });
    await link.click();
    await this.driver.sleep(3000);

    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`Contact Us URL mismatch. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }
  }

}
