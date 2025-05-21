import { Logger } from '../utils/Logger.js';
import { sleep } from '../utils/helpers.js';

import { By, until } from 'selenium-webdriver';


export class ContactPage {
  constructor(browserManager, logger) {
    this.browserManager = browserManager;
    this.logger = logger;
    this.driver = browserManager.driver;

    // XPath locators (from your original message)
    this.locators = {
      //fullNameInput: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[1]'
      fullNameInput:'//*[@id="loginProfileInputName"]',
      emailInput: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[2]/input',
      mobileInput: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[3]/input',
      messegeInput:'/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[5]/textarea',
      requestTypeDropdown: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[4]',
      requestTypeOptionAudience: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[4]/div/div[1]',
      requestTypeOptionArtist: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[4]/div/div[2]',
      requestTypeOptionVendor: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[4]/div/div[3]',
      requestTypeOptionOther: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[4]/div/div[4]',
      submitButton: '/html/body/div/div/main/div/div[1]/div/div/div[2]/div/form/div[6]/button',

      // Example validation error containers (update as needed)
      validationErrorsContainer: '/div/div[2]', // Popup alert container for errors
    };

    this.ids = {
        FullName : ''
    }
  }

 async navigateToContactPage() {
        const contactButtonXPath = "/html/body/div/div/div/nav/div[2]/div/a[4]/span";
        const contactButton = await this.driver.findElement(By.xpath(contactButtonXPath));
        await contactButton.click();
        this.logger.log("Navigated to Contact Us page.");
    }

  // Helper: find element by XPath
  async findElement(xpath) {
    return await this.driver.findElement({ xpath });
  }

  // Helper: clear input field
  async clearField(xpath) {
    const el = await this.findElement(xpath);
    await el.clear();
  }
// Helper: find element by ID
async findElementById(id) {
  return await this.driver.findElement({ id });
}

// Helper: clear input field by ID
async clearFieldById(id) {
  const el = await this.findElementById(id);
  await el.clear();
}
  // Fill full name field
async fillFullName(name) {
    const el = await this.findElement(this.locators.fullNameInput);
    await el.clear();
    await el.sendKeys(name);
    this.logger.log(`Filled Full Name with: ${name}`);
  }

  // Fill email field
  async fillEmail(email) {
    const el = await this.findElement(this.locators.emailInput);
    await el.clear();
    await el.sendKeys(email);
    this.logger.log(`Filled Email with: ${email}`);
  }

  // Fill mobile number field
  async fillMobile(mobile) {
    const el = await this.findElement(this.locators.mobileInput);
    await el.clear();
    await el.sendKeys(mobile);
    this.logger.log(`Filled Mobile with: ${mobile}`);
  }

  // Fill messege field
  async fillMessege(messege) {
    const el = await this.findElement(this.locators.messegeInput);
    await el.clear();
    await el.sendKeys(messege);
    this.logger.log(`Filled Messge with: ${messege}`);
  }

  // Select Request Type dropdown option (assuming "Audience" is a valid option)
  async selectRequestTypeAudience() {
    const audienceRadioButton = await this.findElement(this.locators.requestTypeOptionArtist);
    await audienceRadioButton.click();
    this.logger.log('Selected Request Type: Audience');
}

  // Clear all fields
  async clearAllFields() {
    await this.clearField(this.locators.fullNameInput);
    await this.clearField(this.locators.emailInput);
    await this.clearField(this.locators.mobileInput);
    // For dropdown, you can reset by clicking and selecting a blank option if applicable
    this.logger.log('Cleared all form fields.');
  }
  

  //by ID
  async clearAllFieldByID() {
    await this.clearFieldById(id1);
    await this.clearFieldById(id2);
    await this.clearField(id3);
    
    this.logger.log('Cleared all form fields.');
  }

  // Fill valid other fields except email (for testing invalid email)
  async fillValidOtherFields() {
    await this.fillFullName('Valid User');
    await this.fillMobile('9876543210');
    await this.fillMessege('9876543210');
    await this.selectRequestTypeAudience();
    this.logger.log('Filled valid other fields.');
  }

  // Fill valid other fields except mobile (for testing invalid mobile)
  async fillValidOtherFieldsExceptMobile() {
    await this.fillFullName('Valid User');
    await this.fillEmail('validuser@example.com');
    await this.fillMessege('9876543210');
    await this.selectRequestTypeAudience();
    this.logger.log('Filled valid other fields except mobile.');
  }

  // Fill valid fields except Request Type (leave dropdown unselected)
  async fillValidFieldsExceptRequestType() {
    await this.fillFullName('Valid User');
    await this.fillEmail('validuser@example.com');
    await this.fillMobile('9876543210');
    await this.fillMessege('9876543210');
    this.logger.log('Filled valid fields except request type.');
  }

  // Fill all valid fields
  async fillValidFields() {
    await this.fillFullName('Valid User');
    await this.fillEmail('validuser@example.com');
    await this.fillMobile('9876543210');
    await this.fillMessege('Testing..1,2,3');
    await this.selectRequestTypeAudience();
    this.logger.log('Filled all valid fields.');
  }

  // Submit the form
  async submitForm() {
    const btn = await this.findElement(this.locators.submitButton);
    await btn.click();
    this.logger.log('Clicked Submit button.');
    // Wait a moment for any validation to trigger
    await new Promise(r => setTimeout(r, 1500));
  }

  // Check if error popup with all required field messages is visible
  async areAllRequiredErrorsVisible() {
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      const checks = [
        'Please Enter Name',
        'Please Enter Either Email or Mobile',
        'Please Select Request Type',
        'Please Enter Your Message',
      ];
      const allPresent = checks.every(msg => text.includes(msg));
      this.logger.log(`All required errors present: ${allPresent}`);
      return allPresent;
    } catch {
      this.logger.log('Required errors popup not found.');
      return false;
    }
  }

  // Check if Email field error is visible
  async isEmailErrorVisible() {
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      const isVisible = text.includes('Please Enter Either Email or Mobile') || text.toLowerCase().includes('email');
      this.logger.log(`Email error visible: ${isVisible}`);
      return isVisible;
    } catch {
      this.logger.log('Email error popup not found.');
      return false;
    }
  }

  // Check if Mobile field error is visible
  async isMobileErrorVisible() {
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      const isVisible = text.includes('Please Enter Either Email or Mobile') || text.toLowerCase().includes('mobile');
      this.logger.log(`Mobile error visible: ${isVisible}`);
      return isVisible;
    } catch {
      this.logger.log('Mobile error popup not found.');
      return false;
    }
  }

  // Check if Full Name error is visible (generic check)
  async isFullNameErrorVisible() {
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      const isVisible = text.includes('Please Enter Name') || text.toLowerCase().includes('name');
      this.logger.log(`Full Name error visible: ${isVisible}`);
      return isVisible;
    } catch {
      this.logger.log('Full Name error popup not found.');
      return false;
    }
  }

  // Check if Request Type error is visible
  async isRequestTypeErrorVisible() {
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      const isVisible = text.includes('Please Select Request Type');
      this.logger.log(`Request Type error visible: ${isVisible}`);
      return isVisible;
    } catch {
      this.logger.log('Request Type error popup not found.');
      return false;
    }
  }

  // Check if payload rejected or error visible (for large input)
  async isPayloadRejectedOrErrorVisible() {
    // Reuse general validation popup
    try {
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      // You can adjust this to the actual message your app throws for large inputs
      const isVisible = text.toLowerCase().includes('too long') || text.toLowerCase().includes('limit');
      this.logger.log(`Payload size error visible: ${isVisible}`);
      return isVisible;
    } catch {
      this.logger.log('Payload size error popup not found.');
      return false;
    }
  }

  // Check if rate limit or button disabled after rapid submits
  async isRateLimitOrButtonDisabled() {
    try {
      // Example check: submit button disabled after rapid submits
      const btn = await this.findElement(this.locators.submitButton);
      const isDisabled = !(await btn.isEnabled());
      this.logger.log(`Submit button disabled: ${isDisabled}`);
      return isDisabled;
    } catch {
      this.logger.log('Could not verify rate limit or button disabled.');
      return false;
    }
  }

  // Check if script injection is blocked (validation or sanitization)
  async isScriptInjectionBlocked() {
    try {
      // Could check for validation error popup or that no alert was triggered (not easy in webdriver)
      const popup = await this.driver.findElement({ xpath: this.locators.validationErrorsContainer });
      const text = await popup.getText();
      // If error or no alert, consider blocked
      const blocked = text.toLowerCase().includes('invalid') || text.toLowerCase().includes('error');
      this.logger.log(`Script injection blocked: ${blocked}`);
      return blocked;
    } catch {
      this.logger.log('Script injection error popup not found.');
      return false;
    }
  }


// 1. Submit form blank and expect all required errors
async testBlankSubmission() {
this.logger.log('Running testBlankSubmission...');
await this.clearAllFields();
await this.submitForm();

const allErrorsVisible = await this.areAllRequiredErrorsVisible();
if (!allErrorsVisible) throw new Error('Expected all required field errors to be visible.');
}

// 2. Submit form with invalid email, expect email error
async testInvalidEmail() {
this.logger.log('Running testInvalidEmail...');
await this.clearAllFields();
await this.fillValidOtherFields(); // full name, mobile, request type valid
await this.fillEmail('invalid-email'); // deliberately invalid
await this.submitForm();

const emailErrorVisible = await this.isEmailErrorVisible();
if (!emailErrorVisible) throw new Error('Expected email validation error to be visible.');
}

// 3. Submit form with invalid mobile, expect mobile error
async testInvalidMobile() {
this.logger.log('Running testInvalidMobile...');
await this.clearAllFields();
await this.fillValidOtherFieldsExceptMobile(); // full name, email, request type valid
await this.fillMobile('123abc'); // deliberately invalid mobile
await this.submitForm();

const mobileErrorVisible = await this.isMobileErrorVisible();
if (!mobileErrorVisible) throw new Error('Expected mobile validation error to be visible.');
}

// 4. Submit form with unusual full name, expect no error (validity depends on app)
async testUnusualFullName() {
this.logger.log('Running testUnusualFullName...');
await this.clearAllFields();
await this.fillEmail('validuser@example.com');
await this.fillMobile('9876543210');
await this.selectRequestTypeAudience();
await this.fillFullName('Äëïôü ßØŁ'); // unusual characters
await this.submitForm();

const fullNameError = await this.isFullNameErrorVisible();
if (fullNameError) throw new Error('Did not expect full name error for unusual name.');
}

// 5. Submit form missing request type, expect request type error
async testMissingRequestType() {
this.logger.log('Running testMissingRequestType...');
await this.clearAllFields();
await this.fillValidFieldsExceptRequestType(); // all except request type selected
await this.submitForm();

const requestTypeErrorVisible = await this.isRequestTypeErrorVisible();
if (!requestTypeErrorVisible) throw new Error('Expected request type validation error to be visible.');
}

// 6. Submit form with excessively large inputs, expect payload size error or rejection
async testExcessiveInput() {
this.logger.log('Running testExcessiveInput...');
await this.clearAllFields();
const hugeString = 'a'.repeat(10000); // 10k chars, adjust based on app limits
await this.fillFullName(hugeString);
await this.fillEmail(`${hugeString}@example.com`);
await this.fillMobile('9876543210');
await this.fillMessege('Testing..1..2..3')
await this.selectRequestTypeAudience();
await this.submitForm();

const payloadError = await this.isPayloadRejectedOrErrorVisible();
if (!payloadError) throw new Error('Expected payload size error or rejection.');
}

// 7. Test rapid multiple submissions - expect rate limiting or button disable
async testRapidSubmissions() {
this.logger.log('Running testRapidSubmissions...');
await this.clearAllFields();
await this.fillValidFields();

// Submit rapidly 3 times
for (let i = 0; i < 3; i++) {
    await this.submitForm();
}

const rateLimitOrDisabled = await this.isRateLimitOrButtonDisabled();
if (!rateLimitOrDisabled) throw new Error('Expected rate limiting or button disabled on rapid submits.');
}

}