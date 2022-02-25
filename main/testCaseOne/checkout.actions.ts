import { Page } from "@playwright/test"
import { cardNumberField, CVCField, dateField, emailField, payWithCardBtn, submitBtn, zipCodeField } from "./checkout.locators"
import { cartButton } from "./mosturizersPage.locators"

export async function checkout(page: Page) {
    await page.locator(cartButton).click()
    await page.waitForSelector(payWithCardBtn)
    await page.locator(payWithCardBtn).click()
 
    await page.waitForSelector('iframe[name="stripe_checkout_app"]')
 
   
    const frame1 = await page.frameLocator('iframe[name="stripe_checkout_app"]')
 
    const emailbtn= await frame1.locator(emailField)
    await emailbtn.focus()
    await emailbtn.click()
    await emailbtn.type('abc@email.com')
  
    const cardNumberEle = await frame1.locator(cardNumberField)
    await cardNumberEle.focus()
    await cardNumberEle.click()
    await cardNumberEle.type('5555')
    await cardNumberEle.type('5555')
    await cardNumberEle.type('5555')
    await cardNumberEle.type('4444')
 
    const CVCFieldEle = await frame1.locator(CVCField)
    await CVCFieldEle.focus()
    await CVCFieldEle.click()
    await CVCFieldEle.type('123')
 
    const dateFieldEle = await frame1.locator(dateField)
    await dateFieldEle.focus()
    await dateFieldEle.click()
    await dateFieldEle.type('12')
    await dateFieldEle.type('22')
 
    const zipCodeEle = await frame1.locator(zipCodeField)
    await zipCodeEle.focus()
    await zipCodeEle.click()
    await zipCodeEle.type('12344')
  
    await frame1.locator(submitBtn).click()
 
 
 }

 export async function checkSuccess(page){
     return (await page.$(`div.h2`))
 }