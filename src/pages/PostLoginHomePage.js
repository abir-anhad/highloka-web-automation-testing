

import { sleep } from '../utils/helpers.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { BrowserManager } from '../core/BrowserManager.js';

export class PostLoginHomePage {
  constructor(browserManager, logger) {
    this.browserManager = browserManager;
     this.driver = browserManager.driver;
    this.logger = logger;
  }
  //USER PROFILE TESTS-------------------------------------------------------------------------------------------------------------------------------//
  async openUserMenu() {
    const xpath = '/html/body/div/div/div/nav/div[3]/div[1]';
    this.logger.log('Opening user menu...');
    const userMenu = await this.browserManager.driver.findElement({ xpath });
    await userMenu.click();
    await sleep(2000);
  }

  async clickEditFirstNameButton() {
    const xpath = '/html/body/div/div/main/div[1]/div[4]/div/form/div/div[1]/button';
    this.logger.log('Clicking "Edit First Name" button...');
    const editButton = await this.browserManager.driver.findElement({ xpath });
    await editButton.click();
    await sleep(1000);
  }

  async editFirstName(newFirstName = 'souvik') {
    const xpath = '/html/body/div/div/main/div[1]/div[4]/div/form/div/div[1]/input';
    this.logger.log(`Editing first name to "${newFirstName}"...`);
    const firstNameInput = await this.browserManager.driver.findElement({ xpath });
    await firstNameInput.clear();
    await firstNameInput.sendKeys(newFirstName);
    await sleep(1000);
  }
  async clickEditLasttNameButton() {
    const xpath = '/html/body/div/div/main/div[1]/div[4]/div/form/div/div[2]/button';
    this.logger.log('Clicking "Edit Last Name" button...');
    const editButton = await this.browserManager.driver.findElement({ xpath });
    await editButton.click();
    await sleep(1000);
  }

  async editLastName(newLastName = 'test') {
    const xpath = '/html/body/div/div/main/div[1]/div[4]/div/form/div/div[2]/input';
    this.logger.log(`Editing last name to "${newLastName}"...`);
    const lastNameInput = await this.browserManager.driver.findElement({ xpath });
    await lastNameInput.clear();
    await lastNameInput.sendKeys(newLastName);
    await sleep(1000);
  }

  async clickSave() {
    const xpath = '/html/body/div/div/main/div[1]/div[4]/div/form/button';
    this.logger.log('Clicking Save Changes button...');
    const saveButton = await this.browserManager.driver.findElement({ xpath });
    await saveButton.click();
    await sleep(3000); // Wait for any save confirmation
  }

  async clickHomeButton() {
    
    const xpath = '/html/body/div/div/div[1]/nav/div[2]/div/a[1]/span'; 
    this.logger.log('Clicking Home button to return to homepage...');
    const homeButton = await this.browserManager.driver.findElement({ xpath });
    await homeButton.click();
    await sleep(5000);
  }

  async reopenUserMenuAndVerifyName() {
    const userMenuXPath = '/html/body/div/div/div/nav/div[3]/div[1]/a/div/div[1]'; // User menu button
    const nameHeaderXPath = '/html/body/div/div/main/div[1]/div[1]/div/div/div[2]/h3';

    this.logger.log('Reopening user menu to verify updated name...');
    
    const userMenuBtn = await this.browserManager.driver.findElement({ xpath: userMenuXPath });
    await userMenuBtn.click();
    await sleep(3000);

    const nameHeader = await this.browserManager.driver.findElement({ xpath: nameHeaderXPath });
    const actualName = await nameHeader.getText();

    const expectedName = 'Loka 41'; // Souvik Test
    if (actualName !== expectedName) {
      throw new Error(`Name mismatch! Expected: "${expectedName}", Found: "${actualName}"`);
    }

    this.logger.log(`Name verification successful: ${actualName}`);
  }


  //Explore Button Test----------------------------------------------------------------------------------------------------------------------
   async clickExploreButton() {
    const xpath = '/html/body/div/div/main/div[1]/div[2]/div[2]/button';
    this.logger.log('Clicking "Explore" button...');
    const exploreButton = await this.browserManager.driver.findElement({ xpath });
    await exploreButton.click();
    await sleep(1000);
  }


  //Concert Tiles test-----------------------------------------------------------------------------------------------------------------------
  
  async scrollDownAndUp() {
    const scrollContainerXPath = '/html/body/div/div/main';
    this.logger.log('Scrolling down and then up...');

    const scrollableDiv = await this.browserManager.driver.findElement({ xpath: scrollContainerXPath });

    // Scroll to bottom
    await this.driver.executeScript("arguments[0].scrollTop = arguments[0].scrollHeight", scrollableDiv);
    await new Promise(res => setTimeout(res, 2000));

    // Scroll back up
    await this.driver.executeScript("arguments[0].scrollTop = 0", scrollableDiv);
    await new Promise(res => setTimeout(res, 2000));
  }


  async clickEnterConcertAndCheckRedirect() {
    this.logger.log('Clicking "Enter Concert"...');
    const enterConcertButton = await this.browserManager.driver.findElement({
      xpath: '/html/body/div/div/main/div[2]/div/div[2]/div[2]/div/div[2]',
    });
    await enterConcertButton.click();
    await sleep(5000); // wait for redirect

    this.logger.log('Verifying redirection by checking Get Ticket button...');
    const getTicketButton = await this.browserManager.driver.findElement({
      xpath: '//*[@id="__next"]/div/main/section[1]/div/div[1]/div[2]/div[6]/div/div',
    });

    if (!getTicketButton) {
      throw new Error('Redirection failed: Get Ticket button not found');
    }

    this.logger.log('"Get Ticket" button found. Redirection successful.');
  }

  async returnToHomePage() {
    this.logger.log('Returning to homepage...');
    await this.browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(5000); // Wait for home to load again
  }


  //My EVents Check
  async verifyMyEventsLoaded() {
    const xpath = '/html/body/div/div/main/div[1]/div[2]/div[1]/div/span';
    this.logger.log('Verifying if "My Events" is loading...');
    const myEventsHeader = await this.browserManager.driver.findElement({ xpath });
    const text = await myEventsHeader.getText();

    if (!text || !text.toLowerCase().includes('my events')) {
      throw new Error(`"My Events" section not loaded properly. Found text: "${text}"`);
    }

    this.logger.log('"My Events" section loaded successfully.');
    }

  //MENU TESTS-------------------------------------------------------------------------------------------------------------------

  async openTopRightMenuAndVerifyOptions() {
    this.logger.log('Opening top-right hamburger menu...');
    const menuButtonXPath = '/html/body/div/div/div/nav/div[4]/div';
    const menuButton = await this.browserManager.driver.findElement({ xpath: menuButtonXPath });
    await menuButton.click();
    await sleep(2000);

    const navOptions = [
      {
        name: 'Home',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[1]/div/div',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[1]/div/a'
      },
      {
        name: 'About',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[2]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[2]/div/a'
      },
      {
        name: 'Blog',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[3]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[3]/div/a'
      },
      {
        name: 'Contact',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[4]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[4]/div/a'
      },
      {
        name: 'Legal',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[5]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[5]/div/a'
      },
      {
        name: 'Logout',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/div[3]/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/div[3]/p'
      },
    ];

    for (const option of navOptions) {
      this.logger.log(`Verifying menu option: ${option.name}`);

      const logoEl = await this.browserManager.driver.findElement({ xpath: option.logoXPath });
      const linkEl = await this.browserManager.driver.findElement({ xpath: option.linkXPath });

      if (!logoEl || !linkEl) {
        throw new Error(`Menu option "${option.name}" is not properly loaded.`);
      }
    }

    this.logger.log('All menu options loaded successfully.');
  }

  async clickAndVerifyRedirect(optionName,linkXPath, expectedUrl) {
    this.logger.log(`Opening menu to click ${optionName}...`);

    // Reopen menu
    const menuButtonXPath = '/html/body/div/div/div/nav/div[4]/div';
    const menuButton = await this.browserManager.driver.findElement({ xpath: menuButtonXPath });
    await menuButton.click();
    await sleep(1500);

    this.logger.log(`Clicking ${optionName} link...`);
    const link = await this.browserManager.driver.findElement({ xpath: linkXPath });
    await link.click();
    await sleep(2500);

    const currentUrl = await this.browserManager.driver.getCurrentUrl();
    if (!currentUrl.includes(expectedUrl)) {
      throw new Error(`${optionName} redirection failed. Expected: ${expectedUrl}, Got: ${currentUrl}`);
    }

    this.logger.log(`${optionName} redirection successful.`);

    this.logger.log(`Navigating back from ${optionName}...`);
    await this.browserManager.driver.navigate().back();
    await sleep(2000);
  }
  async testMenuRedirections() {
    const navTests = [
      {
        name: 'About',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[2]/div/div/img',
        linkXPath: '//*[@id="__next"]/div/div/div[1]/div/div[1]/span[2]/div/a',
        url: 'https://test.highloka.com/about_us',
      },
      {
        name: 'Blog',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[3]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[3]/div/a',
        url: 'https://test.highloka.com/blog',
      },
      {
        name: 'Contact',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[4]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[4]/div/a',
        url: 'https://test.highloka.com/contact_us',
      },
      {
        name: 'Legal',
        logoXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[5]/div/div/img',
        linkXPath: '/html/body/div/div/div/div[1]/div/div[1]/span[5]/div/a',
        url: 'https://test.highloka.com/legal',
      }
    ];

    for (const test of navTests) {
      await this.clickAndVerifyRedirect(test.name,test.linkXPath, test.url);
    }

    this.logger.log("All redirection tests passed successfully.");
  }

  //Log Out Test ------------------------------------------------------------

  async logoutAndVerify() {
    const menuButtonXPath = '/html/body/div/div/div/nav/div[4]/div';
    const logoutButtonXPath = '/html/body/div/div/div/div[1]/div/div[1]/div[3]/p';
    const joinButtonXPath = '/html/body/div/div/div/nav/div[3]/div/button';

    this.logger.log('Opening menu to perform logout...');
    await this.browserManager.driver.findElement({ xpath: menuButtonXPath }).click();
    await sleep(1500);

    this.logger.log('Clicking Logout...');
    await this.browserManager.driver.findElement({ xpath: logoutButtonXPath }).click();
    await sleep(2500);

    this.logger.log('Verifying logout by checking Join The Cult button...');
    const joinButton = await this.browserManager.driver.findElement({ xpath: joinButtonXPath });

    if (joinButton) {
      this.logger.log('Logout successful. "Join The Cult" button found.');
    } else {
      throw new Error(' Logout failed. "Join The Cult" button not found.');
    }
  }








}
