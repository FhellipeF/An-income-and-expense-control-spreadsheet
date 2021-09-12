const transactionUl = document.querySelector('#transactions')

const currentBalance = document.querySelector('#current-balance')
const income = document.querySelector('#income')
const expenses = document.querySelector('#expenses')

const form = document.querySelector('#form')
const inputName = document.querySelector('#name')
const inputValue = document.querySelector('#value')



const local = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? local : []

const remove = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  update()
  init()

}

const addTransaction = ({amount, name, id})=> {
  const operator = amount < 0 ? '-' : '+'
  const cssClass = amount < 0 ? 'minus' : 'plus'
  const withoutOperator = Math.abs(amount)
  const li = document.createElement('li')
  li.classList.add(cssClass)
  li.innerHTML = `
    ${name} <span>$ ${operator} ${withoutOperator}<span><button class="delete" onClick="remove(${id})">x</button>
  `
  transactionUl.prepend(li)
}

const getNegativeBalace = transactionAmounts => Math.abs(transactionAmounts.filter(value => value < 0)
.reduce((acumulator, value) => acumulator + value, 0))
.toFixed(2)

const getPositiveBalace = transactionAmounts => transactionAmounts
.filter(value => value > 0)
.reduce((acumulator, value) => acumulator + value, 0)
.toFixed(2)

const getTotal = transactionAmounts => transactionAmounts
.reduce((acumulator, transaction) => acumulator + transaction, 0)
.toFixed(2)

const value = () => {
  const transactionAmounts = transactions.map(({amount}) => amount)
  currentBalance.textContent = `$ ${total = getTotal(transactionAmounts)}`
  income.textContent = `$ ${positiveBalace = getPositiveBalace(transactionAmounts)}`
  expenses.textContent = `$ ${negativeBalace = getNegativeBalace(transactionAmounts)}`

}


const init = () => {
  transactionUl.innerHTML  = ''
  transactions.forEach(addTransaction)
  value()
}
init()

const update = () =>{
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)

const addToTransaction = (transactionName,transactionValue ) => {
  transactions.push({
    id: generateId(),
    name: transactionName,
    amount: Number(transactionValue)
    })
}

const cleanInputs = () =>{
  inputName.value = ''
  inputValue.value = ''
}

const formSubmit = envet => {
  event.preventDefault()

  const transactionName = inputName.value.trim()
  const transactionValue = inputValue.value.trim()
  
  const inputEmpty = transactionName === ''|| transactionValue === ''

  if(inputEmpty){
    alert('Fill in the information correctly!')
    return
  }

  

  addToTransaction(transactionName, transactionValue)
  init()
  update()
  cleanInputs()
  
}
form.addEventListener('submit', formSubmit)