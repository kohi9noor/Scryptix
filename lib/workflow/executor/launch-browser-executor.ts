import puppeteer from "puppeteer";

import { LaunchBrowserTask } from "@/lib/workflow/task/launch-browser";
import { ExecutionEnvironment } from "@/types/executor";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    let browser;
    browser = await puppeteer.launch({
      headless: true,
    });
    environment.log.info("Browser launched successfully");

    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
