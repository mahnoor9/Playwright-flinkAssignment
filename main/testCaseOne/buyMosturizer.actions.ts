import { Page } from "@playwright/test";
import { cardNumberField, CVCField, dateField, emailField, payWithCardBtn, submitBtn, zipCodeField } from "./checkout.locators";
import { addBtn, buyMosturizerBtn, buySunscreenBtn, currentTemperature } from "./landingPage.locators";
import { cartButton, mosturizersCards } from "./mosturizersPage.locators";


export async function readTemperatureValue(page: Page) {
   let tempString = await (await page.$(currentTemperature)).innerText()
   tempString = tempString.split(/\s+/)[0]
   return Number(tempString)


}
export async function buyMosturizersOrSunscreen(page: Page, temp: number) {
   if (temp < 19) {
      await page.locator(buyMosturizerBtn).click()
      return 0
   }
   else {
      await page.locator(buySunscreenBtn).click()
      return 1
   }

}

export async function addLeastExpensiveMosturizersInCart(page: Page) {
   await page.waitForSelector(mosturizersCards)
   let titlesAndNamesAloeArr: Array<object> = []
   let titlesAndNamesAlmondArr: Array<object> = []
   let titlesAndNames = await page.$$eval(mosturizersCards, names => {
      return names.map(names => names.innerHTML)
   })
   for (let i = 0; i < titlesAndNames.length; i++) {
      if (i % 2 == 0)
         if (titlesAndNames[i].includes("aloe") || titlesAndNames[i].includes("Aloe")) {
            titlesAndNamesAloeArr.push({ Name: titlesAndNames[i], Price: titlesAndNames[i + 1].match(/(\d+)/)[0] })
         }
         else if (titlesAndNames[i].includes("almond") || titlesAndNames[i].includes("Almond")) {
            titlesAndNamesAlmondArr.push({ Name: titlesAndNames[i], Price: titlesAndNames[i + 1].match(/(\d+)/)[0] })
         }
   }
   titlesAndNamesAlmondArr = titlesAndNamesAlmondArr.sort(comparePrice)
   titlesAndNamesAloeArr = titlesAndNamesAloeArr.sort(comparePrice)
   //@ts-ignore
   console.log(addBtn(titlesAndNamesAloeArr[0].Name, titlesAndNamesAloeArr[0].Price))
   //@ts-ignore

   await page.locator(addBtn(titlesAndNamesAloeArr[0].Name, titlesAndNamesAloeArr[0].Price)).click()
   //@ts-ignore
   await page.locator(addBtn(titlesAndNamesAlmondArr[0].Name, titlesAndNamesAlmondArr[0].Price)).click()

   console.log(titlesAndNames)
   console.log(titlesAndNamesAlmondArr)
   console.log(titlesAndNamesAloeArr)
   //console.log(sortedArray)
   //return titlesAndNamesArr
}
export async function getLeastExpensiveSPF(page: Page) {

}
function comparePrice(a, b) {

   return parseInt(a.Price) - parseInt(b.Price);
}


