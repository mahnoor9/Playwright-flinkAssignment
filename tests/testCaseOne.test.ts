import { test, expect, Page } from '@playwright/test';
import { addLeastExpensiveMosturizersInCart, buyMosturizersOrSunscreen, readTemperatureValue } from '../main/testCaseOne/buyMosturizer.actions';
import { addLeastExpensiveSunscreenInCart } from '../main/testCaseOne/buySunscreen.actions';
import { checkout, checkSuccess } from '../main/testCaseOne/checkout.actions';

let appURL = `http://weathershopper.pythonanywhere.com/`

test.beforeEach(async ({ page }) => {

    await page.goto(appURL)
})

test('Should select mosturizers and sunscreen on the basis of the temperature', async ({ page }) => {

    let temp = await readTemperatureValue(page)
    let choice = await buyMosturizersOrSunscreen(page, temp)
    if (choice == 0) {
        await addLeastExpensiveMosturizersInCart(page)
    }
    else {
        await addLeastExpensiveSunscreenInCart(page)
    }
    await checkout(page)
    await page.waitForTimeout(10000)
    let header = await checkSuccess(page)
 //   expect(header).toBeVisible()


})

