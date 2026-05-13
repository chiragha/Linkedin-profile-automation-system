import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const launchLinkedIn = async () => {
  let browser;

  try {
    // ==========================
    // LAUNCH BROWSER
    // ==========================

    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: 50,
      userDataDir: "./linkedin-session",

      args: [
        "--start-maximized",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    // ==========================
    // OPEN PAGE
    // ==========================

    const page = await browser.newPage();

    // Open LinkedIn feed first
    await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await delay(5000);

    console.log("Current URL:", page.url());

    // ==========================
    // LOGIN CHECK
    // ==========================

    if (page.url().includes("/login")) {
      return {
        success: false,
        message: "Please login manually first",
      };
    }

    // ==========================
    // SEARCH PAGE
    // ==========================

    const searchUrl =
      "https://www.linkedin.com/search/results/people/?keywords=BTech%202025";

    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });

    // Give LinkedIn time
    await delay(12000);

    console.log("Search Page:", page.url());

    // ==========================
    // SECURITY CHECK
    // ==========================

    const html = await page.content();

    if (
      html.includes("security check") ||
      html.includes("challenge") ||
      html.includes("captcha")
    ) {
      return {
        success: false,
        message: "LinkedIn blocked automation",
      };
    }


    // ==========================
    // WAIT FOR RESULTS
    // ==========================

    console.log("Waiting for search results...");

    // Let LinkedIn load
    await delay(25000);

    // Small scroll to trigger lazy loading
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });

    await delay(5000);

    console.log("Results Loaded");
    // DEBUG DOM
const pageText =
  await page.evaluate(() =>
    document.body.innerText
  );

console.log(
  "Page Text Length:",
  pageText.length
);

    console.log("Results Loaded");

    // ==========================
    // AUTO SCROLL
    // ==========================

    await autoScroll(page);

    await delay(3000);

    // ==========================
    // SCRAPE STUDENTS
    // ==========================


const students =
  await page.evaluate(() => {
    const results = [];

    // Get page text
    const pageText =
      document.body.innerText;

    // Split by LinkedIn Member
    const profiles =
      pageText.split(
        "LinkedIn Member"
      );

    profiles.forEach(
      (profile) => {
        const lines =
          profile
            .split("\n")
            .map((line) =>
              line.trim()
            )
            .filter(Boolean);

        // Ignore junk
        if (
          lines.length < 2
        )
          return;

        // Skip navigation text
        if (
          lines[0].includes(
            "Home"
          ) ||
          lines[0].includes(
            "People"
          )
        ) {
          return;
        }

        results.push({
          name:
            "LinkedIn Member",

          headline:
            lines[0] ||
            "N/A",

          location:
            lines[1] ||
            "N/A",
            profileUrl:
  "LinkedIn URL unavailable"
        });
      }
    );

    return results.slice(
      0,
      15
    );
  });

console.log(
  "Students Found:",
  students.length
);

    return {
      success: true,
      message: "LinkedIn scraping successful",
      students,
    };
  } catch (error) {
    console.log("BACKEND ERROR:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

// ==========================
// AUTO SCROLL
// ==========================

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;

      const distance = 500;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);

        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);

          resolve();
        }
      }, 500);
    });
  });
}

// ==========================
// DELAY
// ==========================

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
