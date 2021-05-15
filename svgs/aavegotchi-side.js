
// body
let leftBody = '<g class="gotchi-body"><g class="gotchi-primary"><path d="M43 14v-2h-2v-2h-2V8h-4V6h-6v2h-4v2h-2v2h-2v2h-1v41h3v-2h3v2h4v-2h4v2h4v-2h3v2h3V14z" fill="#64438e"/><path d="M41 14v-2h-2v-2h-4V8h-6v2h-4v2h-2v2h-2v39h2v-2h3v2h4v-2h4v2h4v-2h3v2h2V14z" fill="#edd3fd"/><path d="M42,51h-1v-2h-3v2h-4v-2h-4v2h-4v-2h-3v2h-2V14h2v-1h2v-2h4V9h6v2h4v2h2v2h1V51z" fill="#fff"/></g></g>'
// shadow
leftBody += '<g class="gotchi-shadow"><path d="M23 58v1h1v1h16v-1h1v-1z" opacity=".25"/></g>'
// cheek
leftBody += '<path class="gotchi-cheek" d="M22 32h2v2h-2z" fill="#f696c6"/>'

let leftHand = '<g class="gotchi-handsDown"><path d="M25 44h-1v-4h1v-1h2v-1h2v-1h1v-1h1v-1h2v7h-1v1h-1v1h-2v1h-4z" fill="#64438e"/><path d="M25 40h2v-1h2v-1h1v-1h1v-1h2v5h-1v1h-1v1h-2v1h-4z" fill="#fff"/><g fill="#edd3fd"><path d="M33 40v1h-1v-1h1z"/><path d="M29,42v1h2v-1h1v-1h-1v1H29z"/><path d="M29 43v1h-4v-1h4z"/></g></g>'
leftHand += '<g class="gotchi-handsUp"><path d="M26 29v-1h4v1h1v2h1v2h1v1h1v1h1v2h-7v-1h-1v-1h-1v-2h-1v-4z" fill="#64438e"/><path d="M30 29v2h1v2h1v1h1v1h1v2h-5v-1h-1v-1h-1v-2h-1v-4z" fill="#fff"/><g fill="#edd3fd"><path d="M30 37h-1v-1h1v1z"/><path d="M28,33h-1v2h1v1h1v-1h-1V33z"/><path d="M27 33h-1v-4h1v4z"/></g></g>'

// body
let rightBody = '<g class="gotchi-body"><g class="gotchi-primary"><path d="M21 14v-2h2v-2h2V8h4V6h6v2h4v2h2v2h2v2h1v41h-3v-2h-3v2h-4v-2h-4v2h-4v-2h-3v2h-3V14z" fill="#64438e"/><path d="M23 14v-2h2v-2h4V8h6v2h4v2h2v2h2v39h-2v-2h-3v2h-4v-2h-4v2h-4v-2h-3v2h-2V14z" fill="#edd3fd"/><path d="M22,15h1v-2h2v-2h4V9h6v2h4v2h2v1h2v37h-2v-2h-3v2h-4v-2h-4v2h-4v-2h-3v2h-1V15z" fill="#fff"/></g></g>'
// shadow
rightBody += '<g class="gotchi-shadow"><path d="M23 58v1h1v1h16v-1h1v-1z" opacity=".25"/></g>'
// cheek
rightBody += '<path class="gotchi-cheek" d="M40 32h2v2h-2z" fill="#f696c6"/>'

let rightHand = '<g class="gotchi-handsDown"><path d="M39 44h1v-4h-1v-1h-2v-1h-2v-1h-1v-1h-1v-1h-2v7h1v1h1v1h2v1h4z" fill="#64438e"/><path d="M39 40h-2v-1h-2v-1h-1v-1h-1v-1h-2v5h1v1h1v1h2v1h4z" fill="#fff"/><g fill="#edd3fd"><path d="M32 40v1h-1v-1h1z"/><path d="M33 42v-1h-1v1h1v1h2v-1h-2z"/><path d="M39 43v1h-4v-1h4z"/></g></g>'
rightHand += '<g class="gotchi-handsUp"><path d="M38 29v-1h-4v1h-1v2h-1v2h-1v1h-1v1h-1v2h7v-1h1v-1h1v-2h1v-4z" fill="#64438e"/><path d="M34 29v2h-1v2h-1v1h-1v1h-1v2h5v-1h1v-1h1v-2h1v-4z" fill="#fff"/><g fill="#edd3fd"><path d="M34,36h1v1h-1V36z"/><path d="M36 35h-1v1h1v-1h1v-2h-1v2z"/><path d="M37,29h1v4h-1V29z"/></g></g>'

const aavegotchiSvgs = {
  left: ['', '', leftBody, leftHand],
  right: ['', '', rightBody, rightHand]
}

exports.aavegotchiSvgs = aavegotchiSvgs
