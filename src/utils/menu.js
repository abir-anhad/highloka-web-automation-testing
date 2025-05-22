import { By } from 'selenium-webdriver';
import { APP_CONFIG } from '../config/appConfig.js';

let leftArrowOnHomePage = By.xpath(APP_CONFIG.HOME_MENU_XPATH);

export async function HomeMenuClicking(filePath) {
    // this.logger.log("Attempting to click Header Home Button.");
    await this.click(this.leftArrowOnHomePage);
    // this.logger.log("Clicked Header Home Button.");
}
