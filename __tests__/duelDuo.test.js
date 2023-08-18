const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking the 'draw' button displays robots choices", async () => {
    await driver.get("http://localhost:8000");
    await driver.sleep(3000);
    const drawBtn = await driver
      .findElement(By.css('button[id="draw"]'))
      .click();
    await driver.sleep(3000);

    const choicesDiv = await driver.findElement(By.css('div[id="choices"]'));
    const choiceElements = await choicesDiv.findElements(
      By.css('div[class="bot-card outline"]')
    );
    await driver.sleep(2000);
    expect(choiceElements.length).toBeGreaterThan(0);
  });
});
