import { AutomationInstance } from './src/workflows/AutomationInstance.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { Logger } from './src/utils/Logger.js';
import { getAbsolutePath, fileExists, sleep } from './src/utils/helpers.js';
// import path from 'path'; // For profile dir creation, if uncommented
// import fs from 'fs';     // For profile dir creation, if uncommented

async function main() {
    const mainLogger = new Logger();


    if (!APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS || APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length === 0) {
        mainLogger.log("No emails to process. Please update the 'APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS' list.");
        return;
    }

    const absImagePathCheck = getAbsolutePath(APP_CONFIG.IMAGE_PATH_TO_UPLOAD);
    if (APP_CONFIG.IMAGE_PATH_TO_UPLOAD === "/img" || !fileExists(absImagePathCheck)) {
        mainLogger.warn(`IMAGE_PATH_TO_UPLOAD ('${APP_CONFIG.IMAGE_PATH_TO_UPLOAD}') is not set to a valid existing file. Image upload steps will likely be skipped or fail for all instances.`);
        mainLogger.warn(`Please update IMAGE_PATH_TO_UPLOAD in the script with an absolute path to your image.`);
    }

    mainLogger.log(`Starting automation for ${APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length} email(s).`);

    const automationPromises = [];

    for (let i = 0; i < APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length; i++) {
        const emailId = APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS[i];
        const instanceNum = i + 1;
        mainLogger.log(`Launching instance ${instanceNum} for ${emailId}.`);

        const instance = new AutomationInstance(emailId, instanceNum);
        automationPromises.push(instance.run()); // Don't await here to start them concurrently

        if (APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length > 1 && i < APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length - 1) {
            await sleep(3000); // Stagger start as in Python, but not after the last one
        }
    }

    // Wait for all automation instances to complete
    await Promise.all(automationPromises);

    for (let i = 0; i < APP_CONFIG.EMAIL_ADDRESSES_TO_PROCESS.length; i++) {
        mainLogger.log(`Instance ${i + 1} operations have fully completed.`);
    }

    mainLogger.log("Sob instances kaj hoye gechhe!"); // All instances work done!
}

main().catch(error => {
    const mainLogger = new Logger(); // Or a global logger instance
    mainLogger.error("Unhandled error in main execution:", error);
    if (error.stack) {
        console.error(error.stack);
    }
    process.exit(1); // Exit with an error code
});