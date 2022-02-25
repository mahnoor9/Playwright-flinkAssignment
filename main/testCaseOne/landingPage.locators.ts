export let currentTemperature= `#temperature`
export let buyButtons = `button.btn.btn-primary`
export let buyMosturizerBtn = `text=Buy moisturizers`
export let buySunscreenBtn = `text=Buy sunscreens`
export function addBtn(name:string,price:string){
    return `button[onclick="addToCart('${name}',${price})"]`
}