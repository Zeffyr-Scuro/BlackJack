const player = {
    name: "John",
    chips: 200
}

let cards = []
let sum = 0
let win = false
let amount = 0
let hasBlackJack = false
let isAlive = false
let message = ""
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const betEl = document.getElementById("bet-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    const randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    const firstCard = getRandomCard()
    const secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        win = true
        amount = amount * 2
        betEl.textContent = "Bet:"
        updatePlayer(amount)
    } else {
        message = "You're out of the game!"
        isAlive = false
        amount = 0
        betEl.textContent = "Bet:"
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive && !hasBlackJack) {
        const card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function hold() {
    const computerNum = Math.ceil(Math.random() * 11) + 10
    if (isAlive && !hasBlackJack) {
        if (sum > computerNum){
            message = "You win!"
            isAlive = false
            win = true
            amount = amount * 2
            betEl.textContent = "Bet:"
            updatePlayer(amount)
        }else{
            message = "You loss!"
            isAlive = false
            amount = 0
            betEl.textContent = "Bet:"
        }
        messageEl.textContent = message
    }
}

function bet(num) {
    if (isAlive && !hasBlackJack){
        if (num <= player.chips){
            amount += num
            updatePlayer(num)
        }
        betEl.textContent = "Bet: " + amount
    }
}

function updatePlayer(num){
    if (win){
        amount = 0
        win = false
        playerEl.textContent = player.name + ": $" + (player.chips += num)
    }else{
        playerEl.textContent = player.name + ": $" + (player.chips -= num)
    }
}
