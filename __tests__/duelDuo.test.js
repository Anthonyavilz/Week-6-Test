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

  test('test for clicking draw and will display 5 bots', async () => {
    await driver.get('http://localhost:3000');

    await driver.findElement(By.id('draw')).click();
    await driver.sleep(2000)

    const displayedBots = await driver.wait(until.elementLocated(By.id('choices')), 1000)
    expect(await displayedBots.isDisplayed()).toBe(true)
  });

  test('test for after clicking draw, adding bots to player selected area', async () => {
    await driver.get('http://localhost:3000');

    await driver.findElement(By.id('draw')).click();
    await driver.sleep(2000)

    await driver.wait(until.elementLocated(By.id('choices')), 1000)

    await driver.findElement(By.css('button.bot-btn')).click()
    await driver.sleep(2000)

    await driver.findElement(By.css('button.bot-btn')).click()
    await driver.sleep(2000)

    const playerSelection = await driver.wait(until.elementLocated(By.id('player-duo')), 1000)
    expect(await playerSelection.isDisplayed()).toBe(true)
  });
});