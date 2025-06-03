// src/utils/Logger.js
export class Logger {
    /** @type {string} */
    contextInfo;

    /**
     * @param {string} [context="Main"] - Context for the logger, e.g., "Instance 1 | email@example.com" or "HomePageTest"
     */
    constructor(context = "Main") {
        this.contextInfo = `[${context}]`;
    }

    /**
     * @param {string} message
     */
    log(message) {
        console.log(`${this.contextInfo}: ${message}`);
    }

    /**
     * @param {string} message
     * @param {Error|any} [error]
     */
    error(message, error) {
        const errorMessage = error instanceof Error ? error.message : (error || '');
        console.error(`${this.contextInfo}: ERROR - ${message}`, errorMessage);
        if (error instanceof Error && error.stack) {
            console.error(error.stack);
        }
    }

    /**
     * @param {string} message
     */
    warn(message) {
        console.warn(`${this.contextInfo}: WARNING - ${message}`);
    }
}