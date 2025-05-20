// src/utils/helpers.js
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import path from 'path';
import fs from 'fs';

/**
 * Pauses execution for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates a random string of a given length.
 * @param {number} length - The desired length of the random string.
 * @returns {string} The generated random string.
 */
export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Prompts the user for a 6-digit OTP via the command line.
 * @param {string} promptMessage - The message to display to the user.
 * @returns {Promise<string>} The 6-digit OTP entered by the user.
 */
export async function promptForOtp(promptMessage) {
    const rl = readline.createInterface({ input, output });
    let otp = "";
    while (!/^\d{6}$/.test(otp)) {
        otp = await rl.question(promptMessage);
        if (!/^\d{6}$/.test(otp)) {
            console.log("Invalid OTP. Must be 6 digits.");
        }
    }
    rl.close();
    return otp;
}

/**
 * Converts a relative or absolute file path to an absolute path.
 * @param {string} filePath - The file path to resolve.
 * @returns {string} The absolute file path.
 */
export function getAbsolutePath(filePath) {
    return path.resolve(filePath);
}

/**
 * Checks if a file exists at the given path.
 * @param {string} filePath - The path to the file.
 * @returns {boolean} True if the file exists, false otherwise.
 */
export function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error(`Error checking file existence for ${filePath}:`, err);
        return false;
    }
}