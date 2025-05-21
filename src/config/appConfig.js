// src/config/appConfig.js
export const APP_CONFIG = {
    USER_PROFILE_DIR: "./my_chrome_session_profile", // Currently not actively used in BrowserManager unless uncommented
    EMAIL_ADDRESSES_TO_PROCESS: [ // Used by the original multi-instance script, not directly by testHomePage.js
        // "abirxive@gmail.com",
        "loka41@yopmail.com"
    ],
    INITIAL_APP_URL: "https://test.highloka.com/", // ** IMPORTANT: Set to your app's URL **

    // Test Sandbox (if applicable)
    TEST_SANDBOX_USERNAME_XPATH: "//input[@id='sandbox_username_id']", // Replace if different or remove if not applicable
    TEST_SANDBOX_PASSWORD_XPATH: "//input[@id='sandbox_password_id']", // Replace if different or remove if not applicable
    TEST_SANDBOX_LOGIN_BUTTON_XPATH: "//button[@id='sandbox_login_button_id']", // Replace if different or remove if not applicable
    TEST_SANDBOX_USERNAME: "user", // Replace with actual sandbox username
    TEST_SANDBOX_PASSWORD: "testuser", // Replace with actual sandbox password

    INITIAL_LOGIN_BUTTON_XPATH: "/html/body/div[1]/div/div/nav/div[3]/div/button",

    LOGIN_POPUP_CONTAINER_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]", 

    // Menu XPath
    HOME_MENU_XPATH : "/html/body/div/div/div/nav/div[2]/div/a[1]",

    // These are your existing XPaths for the email and submit button within that popup
    APP_POPUP_EMAIL_INPUT_XPATH: "/html/body/div[1]/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/form/input",
    APP_POPUP_SUBMIT_BUTTON_XPATH: "/html/body/div[1]/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/form/div/button",
    APP_POPUP_CLOSE_BUTTON_XPATH: "/html/body/div[1]/div/div/div[2]/div/div/div[3]/div",

    // OTP Flow specific (if the above popup leads to this, or if triggered differently)
    OTP_FIELD_NAME_PREFIX: "otpInput",
    // VERIFY_OTP_BUTTON_XPATH: "//div[contains(@class, 'actionButtonVerifyOtp')]/span[normalize-space()='Verify OTP']/ancestor::div[1]",
    VERIFY_OTP_BUTTON_XPATH: `//*[@id="__next"]/div/div/div[2]/div/div/div[2]/div[2]/div/div[2]/form/button`,

    // Home Page (Pre-Login) XPaths - As provided by user
    // section 1
    HOME_PAGE_SECTION1_TO_SCROLL_XPATH: "/html/body/div[1]/div/main/div/div[2]/div/div/section[1]", 
    HOME_PAGE_HEADER_HOME_BUTTON_XPATH: "/html/body/div/div/div/nav/div[2]/div/a[1]",
    HOME_PAGE_HERO_JOIN_CONCERTS_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[1]/div/div/button[2]",
    HOME_PAGE_HERO_DISCOVER_ARTISTS_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[1]/div/div/button[1]",
    HOME_PAGE_HERO_JOIN_CONCERTS_BUTTON_XPATH: "/html/body/div[1]/div/main/div/div[2]/div/div/section[1]/div/div/button[2]",
    
    // section 2 Trending Concert
    HOME_PAGE_SECTION2_TO_SCROLL_XPATH: "/html/body/div[1]/div/main/div/div[2]/div/div/section[2]", 
    HOME_PAGE_LEFT_ARROW: "/html/body/div[1]/div/main/div/div[2]/div/div/section[2]/div[1]/div[2]/div[1]/div",
    HOME_PAGE_RIGHT_ARROW: "/html/body/div[1]/div/main/div/div[2]/div/div/section[2]/div[1]/div[2]/div[2]",
    TRENDING_CONCERT_ITEM_XPATH: `/html/body/div/div/main/div/div[2]/div/div/section[2]/div[2]/div/div[1]`,
   
    // section 3 What is Highloka
    HOME_PAGE_SECTION3_TO_SCROLL_XPATH: "/html/body/div[1]/div/main/div/div[2]/div/div/section[3]", 
    WHAT_IS_HIGHLOKA_SEC_JOIN_CONCERT_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[3]/div/button",
    WHAT_IS_HIGHLOKA_SEC_LOGIN_CLOSE_BUTTON_XPATH: "/html/body/div/div/div/div[3]/div/div/div[3]/div",

    // Section 4 No More FOMO
    NO_MORE_FOMO_SECTION3_TOP_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[4]/div[2]/div[1]",
    NO_MORE_FOMO_SECTION3_MIDDLE_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[4]/div[2]/div[2]/div[2]/div/p",
    NO_MORE_FOMO_SECTION3_THIRD_DIV_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[4]/div[2]/div[3]/div[2]/div/p[1]",
    NO_MORE_FOMO_SECTION3_BOTTOM_DIV_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[4]/div[2]/div[4]/div[2]/div/p",
    NO_MORE_FOMO_SECTION3_JOIN_THE_EXPERIENCE_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[4]/div[3]",
    NO_MORE_FOMO_SECTION3_LOGIN_CLOSE_BUTTON_XPATH: "/html/body/div/div/div/div[3]/div/div/div[3]/div",
    
    // Section 5 More Intimate
    MORE_INTIMATE_SECTION5_TOP_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[5]/div/div[1]/p",
    MORE_INTIMATE_SECTION5_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[5]/div/div[1]/button",
    MORE_INTIMATE_SECTION5_LOGIN_CLOSE_BUTTON_XPATH: "/html/body/div/div/div/div[3]/div/div/div[3]/div",
    MORE_INTIMATE_SECTION5_CONNECT_TEXT_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[5]/div/div[2]/div[5]/div[2]/h3",

    // Section 6 How It Works
    HOW_IT_WORKS_SECTION6_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[6]/div/div[1]/h2",

    // Section 7 Experience Beutiful
    EXPERIENCE_BEUTIFUL_SECTION7_SCROLL_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[7]/div/h2[1]",
    EXPERIENCE_BEUTIFUL_SECTION7_JOIN_THE_MOVEMENT_BUTTON_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[7]/div/button",
    EXPERIENCE_BEUTIFUL_SECTION7_LOGIN_CLOSE_BUTTON_XPATH: "/html/body/div/div/div/div[3]/div/div/div[3]/div",

    // Home Page ScrollToTop button
    HOME_PAGE_SCROLL_TO_TOP_BUTTON_XPATH: "/html/body/div/div/div/div[2]",
    HOME_PAGE_SCROLL_TO_TOP_SECTION1_XPATH: "/html/body/div/div/main/div/div[2]/div/div/section[1]/div/h1",


    // Subsequent form steps XPaths (Original Full Flow - for reference from Python script)
    NAME_INPUT_FIELD_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/form/input",
    SHARED_NEXT_BUTTON_XPATH_AFTER_FORM_STEPS: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/div/div",
    RADIO_BUTTON_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/form/div/div[1]/input",
    DATE_INPUT_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/form/input",

    // Image upload XPaths (Original Full Flow - for reference from Python script)
    IMAGE_UPLOAD_VISIBLE_TRIGGER_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/form/div[1]",
    HIDDEN_FILE_INPUT_FOR_IMAGE_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/div/div/div[2]/form//input[@type='file']",
    ADD_IMAGE_BUTTON_XPATH: "/html/body/div/div/div/div[2]/div/div/div[2]/form/div[2]/div/span",

    IMAGE_PATH_TO_UPLOAD: "/img", // ** IMPORTANT: REPLACE THIS PATH with a valid absolute image path for full flow **


    // Concert Page XPaths and URL (Original Full Flow - for reference from Python script)
    CONCERT_REDIRECT_URL: "https://www.highloka.com/concerts/foodforsoul",
    GET_TICKET_OR_FIRST_ENTER_CONCERT_XPATH: "/html/body/div/div/main/section[1]/div/div[1]/div[2]/div[6]/div/div/span",
    FINAL_ENTER_CONCERT_XPATH: "/html/body/div/div/main/div/section/div/div/div[2]/div/div[3]/a/div/span",


    // Wait times
    WAIT_TIME_VERY_LONG: 60000, // For operations that might take a while
    WAIT_TIME_MEDIUM: 20000,    // Default wait for elements
    WAIT_TIME_SHORT: 10000,     // For quick checks or elements expected to be present soon
    WAIT_TIME_VERY_SHORT: 5000, // For very quick checks, like the sandbox login presence
    PAGE_LOAD_TIMEOUT: 300000,   // Max time for page to load
    SCRIPT_TIMEOUT: 30000       // Max time for async script
};