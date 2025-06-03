import { BrowserManager } from './src/core/BrowserManager.js';
import { Logger } from './src/utils/Logger.js';
import { BlogPage } from './src/pages/BlogPage.js';
import { APP_CONFIG } from './src/config/appConfig.js';
import { sleep } from './src/utils/helpers.js';

const BLOG_NAV_BUTTON_XPATH = '/html/body/div/div/div/nav/div[2]/div/a[3]';

async function runBlogPageTests() {
  const logger = new Logger('BlogPageTests');
  const browserManager = new BrowserManager();
  let blogPage;
  let testPassed = true;

  try {
    await browserManager.buildDriver();
    await browserManager.maximizeWindow();

    blogPage = new BlogPage(browserManager, logger);

    logger.log(`Navigating to home page: ${APP_CONFIG.INITIAL_APP_URL}`);
    await browserManager.get(APP_CONFIG.INITIAL_APP_URL);
    await sleep(20000); // Manual login time

    // Click on Blogs in navbar
    logger.log('Clicking "Blogs" from nav...');
    const blogsButton = await browserManager.driver.findElement({ xpath: BLOG_NAV_BUTTON_XPATH });
    await blogsButton.click();
    await sleep(5000); // Allow blog page to load

    // Run tests on blog page
    const testCases = [
      blogPage.scrollDownThenUp,
      blogPage.clickGetInTouchButton,
    ];

    for (const testCase of testCases) {
      try {
        await testCase.call(blogPage);
        logger.log(`${testCase.name} passed`);
      } catch (err) {
        logger.error(`${testCase.name} failed`, err);
        testPassed = false;
      }
    }
  } catch (error) {
    logger.error("Critical error during BlogPage test execution:", error);
    testPassed = false;
  } finally {
    logger.log(`Final Result: ${testPassed ? 'PASSED' : 'FAILED'}`);
    await sleep(1000);
    await browserManager.quitDriver();
    process.exit(testPassed ? 0 : 1);
  }
}

runBlogPageTests();
