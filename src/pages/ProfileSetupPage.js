import { By } from 'selenium-webdriver';
import { BasePage } from './BasePage.js';
import { APP_CONFIG } from '../config/appConfig.js';
import { sleep, generateRandomString, getAbsolutePath, fileExists } from '../utils/helpers.js';

export class ProfileSetupPage extends BasePage {
    nameInput = By.xpath(APP_CONFIG.NAME_INPUT_FIELD_XPATH);
    nextButtonShared = By.xpath(APP_CONFIG.SHARED_NEXT_BUTTON_XPATH_AFTER_FORM_STEPS);
    radioInput = By.xpath(APP_CONFIG.RADIO_BUTTON_XPATH);
    dateInput = By.xpath(APP_CONFIG.DATE_INPUT_XPATH);
    imageUploadTrigger = By.xpath(APP_CONFIG.IMAGE_UPLOAD_VISIBLE_TRIGGER_XPATH);
    hiddenImageInput = By.xpath(APP_CONFIG.HIDDEN_FILE_INPUT_FOR_IMAGE_XPATH);
    addImageButton = By.xpath(APP_CONFIG.ADD_IMAGE_BUTTON_XPATH);

    /**
     * @param {import('../core/BrowserManager.js').BrowserManager} driverActions
     * @param {import('../utils/Logger.js').Logger} logger
     */
    constructor(driverActions, logger) {
        super(driverActions, logger);
    }

    async enterName() {
        this.logger.log("Checking for name input.");
        try {
            const nameField = await this.waitForElementClickable(this.nameInput, APP_CONFIG.WAIT_TIME_SHORT);
            const randomSuffix = generateRandomString(4);
            const nameToFill = "abir" + randomSuffix;
            await this.clear(nameField);
            await this.type(nameField, nameToFill);
            this.logger.log(`Entered name '${nameToFill}'.`);

            const nextButton = await this.waitForElementClickable(this.nextButtonShared);
            await this.click(nextButton);
            this.logger.log("Clicked 'Next' after name.");
            await sleep(2000);
        } catch (e) {
            this.logger.warn(`Name input not found or error. Skipping. Details: ${e.message}`);
        }
    }

    async selectRadioOption() {
        this.logger.log("Checking for radio button.");
        try {
            const radioButton = await this.waitForElementClickable(this.radioInput, APP_CONFIG.WAIT_TIME_SHORT);
            if (!await radioButton.isSelected()) {
                await this.click(radioButton); // Use BasePage click which handles JS click on interception
            }
            this.logger.log("Radio button selected.");

            const nextButton = await this.waitForElementClickable(this.nextButtonShared);
            await this.click(nextButton);
            this.logger.log("Clicked 'Next' after radio.");
            await sleep(2000);
        } catch (e) {
            this.logger.warn(`Radio button step not found or error. Skipping. Details: ${e.message}`);
        }
    }

    async enterDate() {
        this.logger.log("Checking for date input.");
        try {
            const dateField = await this.waitForElementClickable(this.dateInput, APP_CONFIG.WAIT_TIME_SHORT);
            const dateToEnter = "1990-01-15";
            // For date inputs, sending keys might not always work as expected across browsers/frameworks.
            // Sometimes direct JS value setting is more reliable if sendKeys fails.
            // await this.driverActions.executeJs(`arguments[0].value = '${dateToEnter}';`, dateField);
            await this.type(dateField, dateToEnter);
            this.logger.log(`Entered date '${dateToEnter}'.`);

            const nextButton = await this.waitForElementClickable(this.nextButtonShared);
            await this.click(nextButton);
            this.logger.log("Clicked 'Next' after date.");
            await sleep(2000);
        } catch (e) {
            this.logger.warn(`Date input step not found or error. Skipping. Details: ${e.message}`);
        }
    }

    async uploadImage() {
        const absImagePath = getAbsolutePath(APP_CONFIG.IMAGE_PATH_TO_UPLOAD);
        if (!APP_CONFIG.IMAGE_PATH_TO_UPLOAD || APP_CONFIG.IMAGE_PATH_TO_UPLOAD === "/img" || !fileExists(absImagePath)) {
            this.logger.warn(`IMAGE_PATH_TO_UPLOAD is not set to a valid file ('${absImagePath}'). Skipping image upload.`);
            return;
        }

        this.logger.log("Checking for image upload elements.");
        try {
            // The actual file input is often hidden. We send keys to it directly.
            // Ensure the visible trigger element is present if it unhides or prepares the input.
            await this.waitForElementVisible(this.imageUploadTrigger, APP_CONFIG.WAIT_TIME_SHORT);

            const actualFileInput = await this.findElement(this.hiddenImageInput, APP_CONFIG.WAIT_TIME_SHORT); // Don't need clickable for hidden input
            await actualFileInput.sendKeys(absImagePath); // This makes the file available to the input
            this.logger.log(`Sent image path '${absImagePath}' to hidden input.`);
            await sleep(3000); // Allow time for any preview or processing

            const addButton = await this.waitForElementClickable(this.addImageButton, APP_CONFIG.WAIT_TIME_SHORT);
            await this.click(addButton);
            this.logger.log("Clicked 'Add' button for image.");
            await sleep(2000);
        } catch (e) {
            this.logger.error(`Image upload elements not found or error. Skipping. Details: ${e.message}`, e);
        }
    }
}