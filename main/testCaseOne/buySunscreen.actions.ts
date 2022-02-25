import { Page } from "@playwright/test";
import { cardNumberField, CVCField, dateField, emailField, payWithCardBtn, submitBtn } from "./checkout.locators";
import { addBtn, buyMosturizerBtn, buySunscreenBtn, currentTemperature } from "./landingPage.locators";
import { cartButton, mosturizersCards } from "./mosturizersPage.locators";



export async function addLeastExpensiveSunscreenInCart(page: Page) {
   await page.waitForSelector(mosturizersCards)
   let titlesAndNames50Arr: Array<object> = []
   let titlesAndNames30Arr: Array<object> = []
   let titlesAndNames = await page.$$eval(mosturizersCards, names => {
      return names.map(names => names.innerHTML)
   })
   for (let i = 0; i < titlesAndNames.length; i++) {
      if (i % 2 == 0)
         if (titlesAndNames[i].includes("50")  )  
         {
             titlesAndNames50Arr.push({ Name: titlesAndNames[i], Price: titlesAndNames[i + 1].match(/(\d+)/)[0] }) 
            }
         else if(titlesAndNames[i].includes("30") ){
            titlesAndNames30Arr.push({ Name: titlesAndNames[i], Price: titlesAndNames[i + 1].match(/(\d+)/)[0]  })
         }
   }
   titlesAndNames30Arr = titlesAndNames30Arr.sort(comparePrice)
   titlesAndNames50Arr = titlesAndNames50Arr.sort(comparePrice)
     //@ts-ignore
   console.log(addBtn(titlesAndNames30Arr[0].Name,titlesAndNames30Arr[0].Price))
     //@ts-ignore

   await page.locator(addBtn(titlesAndNames50Arr[0].Name,titlesAndNames50Arr[0].Price)).click()
   //@ts-ignore
   await page.locator(addBtn(titlesAndNames30Arr[0].Name,titlesAndNames30Arr[0].Price)).click()

   console.log(titlesAndNames)
   console.log(titlesAndNames30Arr)
   console.log(titlesAndNames50Arr)
}
function comparePrice(a, b) {

   return parseInt(a.Price) - parseInt(b.Price);
}

