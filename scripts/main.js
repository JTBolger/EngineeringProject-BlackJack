var tableRim = document.getElementById("table-rim");
var table = document.getElementById("table");
var startButton = document.getElementById("start");
var playArea = document.getElementById("play-area")
var card = document.getElementById("card-inner")
var coinHolder = document.getElementById("balance")
var betDisplay = document.getElementById("bet")
var incBet = document.getElementById("add-bet")
var decBet = document.getElementById("subtract-bet")
var finBet = document.getElementById("confirm-bet")
var allInBet = document.getElementById("all-in-bet")
var hitButton = document.getElementById("hit-button")
var stayButton = document.getElementById("stay-button")

var bank = 100
var bet = 0
var balance = document.getElementById("money")
balance.innerHTML = "$"+bank+".00"

function startGame() {
    startButton.style.opacity = "0"
    startButton.style.cursor = "auto"
    tableRim.style.height = "105%"
    tableRim.style.borderTopRightRadius = "0"
    tableRim.style.borderTopLeftRadius = "0"
    table.style.height = "105%"
    table.style.borderTopRightRadius = "0"
    table.style.borderTopLeftRadius = "0"
    playArea.style.marginBottom = "0"
    playArea.style.borderTopRightRadius = "0"
    playArea.style.borderTopLeftRadius = "0"
    coinHolder.style.opacity = "1"
}

function flipCard() {
    card.style.transform = "rotateY(180deg)"
}

var hands = 0
var playerWins = 0
var dealerWins = 0
var playerBlackjacks = 0
var dealerBlackjacks = 0
var DubDwnWon = 0
var amountWon = 0
var fundAddTot = 0
var streak = 0

function incHands() {
    hands += 1
    document.getElementById("hands").innerHTML = "Hands : "+hands
}
function incPlayerWins() {
    playerWins += 1
    document.getElementById("player-wins").innerHTML = "Player Wins : "+playerWins
}
function incDealerWins() {
    dealerWins += 1
    document.getElementById("dealer-wins").innerHTML = "Dealer Wins : "+dealerWins
}
function incPlayerBlackjacks() {
    playerBlackjacks += 1
    document.getElementById("player-blackjacks").innerHTML = "Player Blackjacks : "+playerBlackjacks
}
function incDealerBlackjacks() {
    dealerBlackjacks += 1
    document.getElementById("dealer-blackjacks").innerHTML = "Dealer Blackjacks : "+dealerBlackjacks
}
function incDoubleDownsWon() {
    DubDwnWon += 1
    document.getElementById("double-downs-won").innerHTML = "Double Downs Won : "+DubDwnWon
}
function incAmountWon(amount) {
    amountWon += amount
    document.getElementById("money-won").innerHTML = "Amount Won : $"+amountWon+".00"
}
function incFundAdded(amount) {
    fundAddTot += amount
    document.getElementById("funds-added").innerHTML = "Funds Added : $"+fundAddTot+".00"
}
function incStreak() {
    streak += 1
    document.getElementById("current-streak").innerHTML = "Current Streak : "+streak
}
function resetStreak() {
    streak = 0
    document.getElementById("current-streak").innerHTML = "Current Streak : "+streak
}

const deck = [
    '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
    '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
    '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
    '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'
];
  
// Test Teck //
// const deck = [
//     '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
//     '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
//     '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
//     '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//     '10H', '10H', '10H', '10H', '10H', 'AH', 'AH', 'AH', 'AH', 'AH',
//   ];

var amountToBet = 10
var betIncSlider = document.getElementById("betInc")
var betIncValue = document.getElementById("betIncValue")
betIncValue.innerHTML = "$"+betIncSlider.value+".00"
betIncSlider.oninput = function() {
    betIncValue.innerHTML = "$"+this.value+".00"
    console.log("betIncValue.value = "+betIncSlider.value)
    amountToBet = parseInt(betIncSlider.value)
    console.log("amountToBet = "+amountToBet)
}

function addBet() {
    if (bank < (bet + amountToBet)) {
        console.error("bet amount exceeds bank amount")
    }
    else if (bank >= (bet + amountToBet)) {
        bet = (bet + amountToBet)
        betDisplay.innerHTML = "$"+bet+".00"
        console.log("amount after change = "+bet)
    }
}
function allIn() {
    var betTempR = bank % 10
    bet = bank - betTempR
    betDisplay.innerHTML = "$"+bet+".00"
    console.log("amount after change = "+bet)
}
function subtractBet() {
    if ((bet - amountToBet) <= 0) {
        console.error("bet amount cannot be less than or equal to zero")
    }
    else if ((bet - amountToBet) > 0) {
        bet = (bet - amountToBet)
        betDisplay.innerHTML = "$"+bet+".00"
        console.log("amount after change = "+bet)
    }
}
function confirmBet() {
    if ((bet <= bank) && (bet > 0)) {
        incBet.style.display = "none"
        decBet.style.display = "none"
        finBet.style.display = "none"
        allInBet.style.display = "none"
        bank = bank - bet
        balance.innerHTML = "$"+bank+".00"
        if (bank >= bet) {
            doubleButton.style.display = "flex"
        }
        beginDeal()
    }
}

function randomCard(deck) {
    const randomIndex = Math.floor(Math.random() *deck.length);
    return deck[randomIndex];
}

var dCard1Style = document.getElementById("dCard1")
var dCard2Style = document.getElementById("dCard2")
var dCard3Style = document.getElementById("dCard3")
var dCard4Style = document.getElementById("dCard4")
var dCard5Style = document.getElementById("dCard5")
var dCard6Style = document.getElementById("dCard6")
var dCard7Style = document.getElementById("dCard7")
var dCard8Style = document.getElementById("dCard8")
var dCard9Style = document.getElementById("dCard9")
var pCard1Style = document.getElementById("pCard1")
var pCard2Style = document.getElementById("pCard2")
var pCard3Style = document.getElementById("pCard3")
var pCard4Style = document.getElementById("pCard4")
var pCard5Style = document.getElementById("pCard5")
var pCard6Style = document.getElementById("pCard6")
var pCard7Style = document.getElementById("pCard7")
var pCard8Style = document.getElementById("pCard8")
var pCard9Style = document.getElementById("pCard9")

// var dCard1 = 0
// var dCard2 = 0
// var dCard3 = 0
// var dCard4 = 0
// var dCard5 = 0
// var dCard6 = 0
// var dCard7 = 0
// var dCard8 = 0
// var dCard9 = 0
// var pCard1 = 0
// var pCard2 = 0
// var pCard3 = 0
// var pCard4 = 0
// var pCard5 = 0
// var pCard6 = 0
// var pCard7 = 0
// var pCard8 = 0
// var pCard9 = 0

var cardFace = document.getElementById("card")

var hitNumber = 0
var dealerValue = 0
var playerValue = 0
var playerHand = []
var dealerHand = []
function addCardToPlayerHand(newCard) {
    playerHand.push(newCard)
}
function addCardToDealerHand(newCard) {
    dealerHand.push(newCard)
}
function drawCard(dealingCard) {
    if (dealingCard == 1) {
        dCard1Style.style.display = "block"
        dCard1 = randomCard(deck)
        addCardToDealerHand(dCard1)
        console.log("dCard1 = "+dCard1)
        document.getElementById("dCard1-front").innerHTML = changePicture(dCard1)
        calculateDealerValue(dealerHand)
        document.getElementById("dealer-value").innerHTML = Value(dCard1)
        hitNumber = 11
    }
    else if (dealingCard == 2) {
        dCard2Style.style.display = "block"
        dCard2 = randomCard(deck)
        addCardToDealerHand(dCard2)
        console.log("dCard2 = "+dCard2)
        document.getElementById("dCard2-front").innerHTML = "<img src=\"images/Blackjack game/1.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
        calculateDealerValue(dealerHand)
        document.getElementById("dealer-value").innerHTML = Value(dCard1)
        hitNumber = 12
    }
    else if (dealingCard == 3) {
        dCard3Style.style.display = "block"
        dCard3 = randomCard(deck)
        addCardToDealerHand(dCard3)
        console.log("dCard3 = "+dCard3)
        document.getElementById("dCard3-front").innerHTML = changePicture(dCard3)
        calculateDealerValue(dealerHand)
        hitNumber = 13
    }
    else if (dealingCard == 4) {
        dCard4Style.style.display = "block"
        dCard4 = randomCard(deck)
        addCardToDealerHand(dCard4)
        console.log("dCard4 = "+dCard4)
        document.getElementById("dCard4-front").innerHTML = changePicture(dCard4)
        calculateDealerValue(dealerHand)
        hitNumber = 14
    }
    else if (dealingCard == 5) {
        dCard5Style.style.display = "block"
        dCard5 = randomCard(deck)
        addCardToDealerHand(dCard5)
        console.log("dCard5 = "+dCard5)
        document.getElementById("dCard5-front").innerHTML = changePicture(dCard5)
        calculateDealerValue(dealerHand)
        hitNumber = 15
    }
    else if (dealingCard == 6) {
        dCard6.style.display = "block"
        dCard6 = randomCard(deck)
        console.log("dCard6 = "+dCard6)
        document.getElementById("dCard6-front").innerHTML = changePicture(dCard6)
        calculateDealerValue(dealerHand)
        hitNumber = 16
    }
    else if (dealingCard == 7) {
        dCard7.style.display = "block"
        dCard7 = randomCard(deck)
        console.log("dCard7 = "+dCard7)
        document.getElementById("dCard7-front").innerHTML = changePicture(dCard7)
        calculateDealerValue(dealerHand)
        hitNumber = 17
    }
    else if (dealingCard == 8) {
        dCard8.style.display = "block"
        dCard8 = randomCard(deck)
        console.log("dCard8 = "+dCard8)
        document.getElementById("dCard8-front").innerHTML = changePicture(dCard8)
        calculateDealerValue(dealerHand)
        hitNumber = 18
    }
    else if (dealingCard == 9) {
        dCard9.style.display = "block"
        dCard9 = randomCard(deck)
        console.log("dCard9 = "+dCard9)
        document.getElementById("dCard9-front").innerHTML = changePicture(dCard9)
        calculateDealerValue(dealerHand)
        hitNumber = 19
    }
    else if (dealingCard == 10) {
        pCard1Style.style.display = "block"
        pCard1 = randomCard(deck)
        addCardToPlayerHand(pCard1)
        console.log("pCard1 = "+pCard1)
        document.getElementById("pCard1-front").innerHTML = changePicture(pCard1)
        calculatePlayerValue(playerHand)
        hitNumber = 1
    }
    else if (dealingCard == 11) {
        pCard2Style.style.display = "block"
        pCard2 = randomCard(deck)
        addCardToPlayerHand(pCard2)
        console.log("pCard2 = "+pCard2)
        document.getElementById("pCard2-front").innerHTML = changePicture(pCard2)
        calculatePlayerValue(playerHand)
        hitNumber = 2
        testForBlackjack()
    }
    else if (dealingCard == 12) {
        pCard3Style.style.display = "block"
        pCard3 = randomCard(deck)
        addCardToPlayerHand(pCard3)
        console.log("pCard3 = "+pCard3)
        document.getElementById("pCard3-front").innerHTML = changePicture(pCard3)
        calculatePlayerValue(playerHand)
        hitNumber = 3
    }
    else if (dealingCard == 13) {
        pCard4Style.style.display = "block"
        pCard4 = randomCard(deck)
        addCardToPlayerHand(pCard4)
        console.log("pCard4 = "+pCard4)
        document.getElementById("pCard4-front").innerHTML = changePicture(pCard4)
        calculatePlayerValue(playerHand)
        hitNumber = 4
    }
    else if (dealingCard == 14) {
        pCard5Style.style.display = "block"
        pCard5 = randomCard(deck)
        addCardToPlayerHand(pCard5)
        console.log("pCard5 = "+pCard5)
        document.getElementById("pCard5-front").innerHTML = changePicture(pCard5)
        calculatePlayerValue(playerHand)
        hitNumber = 5
    }
    else if (dealingCard == 15) {
        pCard6.style.display = "block"
        pCard6 = randomCard(deck)
        console.log("pCard6 = "+pCard6)
        document.getElementById("pCard6-front").innerHTML = changePicture(pCard6)
        calculatePlayerValue(playerHand)
        hitNumber = 6
    }
    else if (dealingCard == 16) {
        pCard7.style.display = "block"
        pCard7 = randomCard(deck)
        console.log("pCard7 = "+pCard7)
        document.getElementById("pCard7-front").innerHTML = changePicture(pCard7)
        calculatePlayerValue(playerHand)
        hitNumber = 7
    }
    else if (dealingCard == 17) {
        pCard8.style.display = "block"
        pCard8 = randomCard(deck)
        console.log("pCard8 = "+pCard8)
        document.getElementById("pCard8-front").innerHTML = changePicture(pCard8)
        calculatePlayerValue(playerHand)
        hitNumber = 8
    }
    else if (dealingCard == 18) {
        pCard9.style.display = "block"
        pCard9 = randomCard(deck)
        console.log("pCard9 = "+pCard9)
        document.getElementById("pCard9-front").innerHTML = changePicture(pCard9)
        calculatePlayerValue(playerHand)
        hitNumber = 9
    }
}

function beginDeal() {
    hitButton.style.display = "flex"
    stayButton.style.display = "flex"
    drawCard(1)
    setTimeout(drawCardTwo, 500)
    setTimeout(drawCardTen, 1000)
    setTimeout(drawCardEleven, 1500)
}
function drawCardTwo() {
    drawCard(2)
}
function drawCardTen() {
    drawCard(10)
}
function drawCardEleven() {
    drawCard(11)
}
function drawCardThree() {
    dCard3Style.style.display = "block"
    dCard3 = randomCard(deck)
    document.getElementById("dCard3-front").innerHTML = changePicture(dCard3)
    addCardToDealerHand(dCard3)
    calculateDealerValue(dealerHand)

    if ((dealerValue) < 17) {
        setTimeout(drawCardFour, 500)
        console.log("dCard4 = "+dCard4+"\ndealerValue = "+dealerValue)
    }
}
function drawCardFour() {
    dCard4Style.style.display = "block"
    dCard4 = randomCard(deck)
    document.getElementById("dCard4-front").innerHTML = changePicture(dCard4)
    addCardToDealerHand(dCard4)
    calculateDealerValue(dealerHand)

    if ((dealerValue) < 17) {
        setTimeout(drawCardFive, 500)
        console.log("pCard5 = "+dCard5+"\ndealerValue = "+dealerValue)
    }
}
function drawCardFive() {
    dCard5Style.style.display = "block"
    dCard5 = randomCard(deck)
    document.getElementById("dCard5-front").innerHTML = changePicture(dCard5)
    addCardToDealerHand(dCard5)
    calculateDealerValue(dealerHand)

    if ((dealerValue) < 17) {
        setTimeout(drawCardSix, 500)
        console.log("pCard6 = "+dCard6+"\ndealerValue = "+dealerValue)
    }
}
function drawCardSix() {
    dCard6Style.style.display = "block"
    dCard6 = randomCard(deck)
    document.getElementById("dCard6-front").innerHTML = changePicture(dCard6)
    addCardToDealerHand(dCard6)
    calculateDealerValue(dealerHand)
}


function Value(card) {
    if (card == "2C") {
        return 2
    }
    else if (card == "3C") {
        return 3
    }
    else if (card == "4C") {
        return 4
    }
    else if (card == "5C") {
        return 5
    }
    else if (card == "6C") {
        return 6
    }
    else if (card == "7C") {
        return 7
    }
    else if (card == "8C") {
        return 8
    }
    else if (card == "9C") {
        return 9
    }
    else if (card == "10C") {
        return 10
    }
    else if (card == "JC") {
        return 10
    }
    else if (card == "QC") {
        return 10
    }
    else if (card == "KC") {
        return 10
    }
    else if (card == "2D") {
        return 2
    }
    else if (card == "3D") {
        return 3
    }
    else if (card == "4D") {
        return 4
    }
    else if (card == "5D") {
        return 5
    }
    else if (card == "6D") {
        return 6
    }
    else if (card == "7D") {
        return 7
    }
    else if (card == "8D") {
        return 8
    }
    else if (card == "9D") {
        return 9
    }
    else if (card == "10D") {
        return 10
    }
    else if (card == "JD") {
        return 10
    }
    else if (card == "QD") {
        return 10
    }
    else if (card == "KD") {
        return 10
    }
    else if (card == "2H") {
        return 2
    }
    else if (card == "3H") {
        return 3
    }
    else if (card == "4H") {
        return 4
    }
    else if (card == "5H") {
        return 5
    }
    else if (card == "6H") {
        return 6
    }
    else if (card == "7H") {
        return 7
    }
    else if (card == "8H") {
        return 8
    }
    else if (card == "9H") {
        return 9
    }
    else if (card == "10H") {
        return 10
    }
    else if (card == "JH") {
        return 10
    }
    else if (card == "QH") {
        return 10
    }
    else if (card == "KH") {
        return 10
    }
    else if (card == "2S") {
        return 2
    }
    else if (card == "3S") {
        return 3
    }
    else if (card == "4S") {
        return 4
    }
    else if (card == "5S") {
        return 5
    }
    else if (card == "6S") {
        return 6
    }
    else if (card == "7S") {
        return 7
    }
    else if (card == "8S") {
        return 8
    }
    else if (card == "9S") {
        return 9
    }
    else if (card == "10S") {
        return 10
    }
    else if (card == "JS") {
        return 10
    }
    else if (card == "QS") {
        return 10
    }
    else if (card == "KS") {
        return 10
    }
    else if (card == "AH") {
        return 11
    }
    else if (card == "AC") {
        return 11
    }
    else if (card == "AD") {
        return 11
    }
    else if (card == "AS") {
        return 11
    }
}

function HIT() {
    if (playerValue < 21) {
        drawCard((hitNumber + 10))
        doubleButton.style.display = "none"
    }
    else {
        console.error("player has busted/reached 21")
    }
    testForBust(1)
}
function STAY() {
    hitButton.style.display = "none"
    stayButton.style.display = "none"
    doubleButton.style.display = "none"
    hitNumber = 12;
    console.log("Player is staying on: " + playerValue);
    document.getElementById("dCard2-front").innerHTML = changePicture(dCard2);
    document.getElementById("dealer-value").innerHTML = dealerValue;
    if (dealerValue < 17) {
        setTimeout(drawCardThree, 500)
        console.log("dCard3 = "+dCard3+"\ndealerValue = "+dealerValue)
    }
    setTimeout(testForWin, 2000)
    setTimeout(resetGame, 3000)
}
var doubled = 0
var doubleButton = document.getElementById("double-down")
function DOUBLE() {
    hitButton.style.display = "none"
    stayButton.style.display = "none"
    doubleButton.style.display = "none"
    bank -= bet
    balance.innerHTML = "$"+bank+".00"
    bet += bet
    betDisplay.innerHTML = "$"+bet+".00"
    HIT()
    STAY()
    doubled = 1
}


function testForBust(side) {
    if (side == 1) {
        if (playerValue > 21) {
            console.warn("Player has busted ! "+playerValue)
            setTimeout(STAY, 500)
        }
    }
    else if (side == 2) {
        if ((dealerValue >= 17)) {
            console.warn("Dealer is staying / Dealer has busted ! "+dealerValue)
        }
        else {
            return true
        }
    }
}
function testForBlackjack() {
    if ((playerValue == 21) && (dealerValue == 21)) {
        console.warn("Push")
        doubleButton.style.display = "none"
        bank += bet
        document.getElementById("dealer-value").innerHTML = "21";
        document.getElementById("player-value").innerHTML = "21";
        resetGame()
        return "false"
    }
    else if ((playerValue == 21) && (hitNumber == 2)) {
        console.warn("Player Blackjack")
        hitButton.style.display = "none"
        stayButton.style.display = "none"
        bank += (bet + (1.5*bet))
        document.getElementById("player-value").style.color = "#10bb10"
        document.getElementById("player-value").style.height = "2.5rem"
        doubleButton.style.display = "none"
        document.getElementById("player-value").innerHTML = "21";
        setTimeout(resetGame, 3000)
        incAmountWon(bet*2.5)
        incPlayerBlackjacks()
        incPlayerWins()
    }
    else if ((dealerValue == 21) && (hitNumber == 2)) {
        console.warn("Dealer Blackjack")
        doubleButton.style.display = "none"
        document.getElementById("dCard2-front").innerHTML = changePicture(dCard2);
        hitButton.style.display = "none"
        stayButton.style.display = "none"
        document.getElementById("dealer-value").style.color = "#10bb10"
        document.getElementById("dealer-value").style.height = "2.5rem"
        document.getElementById("dealer-value").innerHTML = "21";
        setTimeout(resetGame, 3000)
        incDealerBlackjacks()
        incDealerWins()
    }
}
function testForWin() {
    if (playerValue > 21) { // Dealer Win
        console.warn("Player Bust")
        document.getElementById("player-value").style.color = "#bb1010"
        document.getElementById("dealer-value").style.color = "#10bb10"
        document.getElementById("dealer-value").style.height = "2.5rem"
        incDealerWins()
        resetStreak()
        return "false"
    }
    else if ((playerValue > dealerValue) && (playerValue <= 21)) { // Player Win
        console.warn("Player Win")
        document.getElementById("player-value").style.color = "#10bb10" // green
        document.getElementById("dealer-value").style.color = "#bb1010" // red
        document.getElementById("player-value").style.height = "2.5rem"
        bank += (bet*2)
        incAmountWon(bet*2)
        incPlayerWins()
        if (doubled == 1) {
            incDoubleDownsWon()
        }
        incStreak()
        return "true"
    }
    else if (playerValue == dealerValue) {
        console.warn("Push")
        document.getElementById("player-value").style.height = "2.5rem"
        document.getElementById("dealer-value").style.height = "2.5rem"
        document.getElementById("dealer-value").style.color = "rgb(248 255 0)" // yellow
        document.getElementById("player-value").style.color = "rgb(248 255 0)" // yellow
        bank += bet
        return "false"
    }
    else if ((playerValue <= 21) && (dealerValue > 21)) { // Player Win
        console.warn("Dealer Bust")
        document.getElementById("dealer-value").style.color = "#bb1010"
        document.getElementById("player-value").style.color = "#10bb10"
        document.getElementById("player-value").style.height = "2.5rem"
        bank += (bet*2)
        incAmountWon(bet*2)
        incPlayerWins()
        if (doubled == 1) {
            incDoubleDownsWon()
        }
        incStreak()
        return "true"
    }
    else if ((playerValue <= dealerValue) && (dealerValue <= 21)) { // Dealer Win
        console.warn("Dealer Win")
        document.getElementById("dealer-value").style.color = "#10bb10"
        document.getElementById("player-value").style.color = "#bb1010"
        document.getElementById("dealer-value").style.height = "2.5rem"
        incDealerWins()
        resetStreak()
        return "false"
    }
    else {
        console.error("testForWin Error")
    }
    balance.innerHTML = "$"+bank+".00"
}

function resetGame() {
    dCard1Style.style.display = "none"
    dCard2Style.style.display = "none"
    dCard3Style.style.display = "none"
    dCard4Style.style.display = "none"
    dCard5Style.style.display = "none"
    dCard6Style.style.display = "none"
    dCard7Style.style.display = "none"
    dCard8Style.style.display = "none"
    dCard9Style.style.display = "none"
    pCard1Style.style.display = "none"
    pCard2Style.style.display = "none"
    pCard3Style.style.display = "none"
    pCard4Style.style.display = "none"
    pCard5Style.style.display = "none"
    pCard6Style.style.display = "none"
    pCard7Style.style.display = "none"
    pCard8Style.style.display = "none"
    pCard9Style.style.display = "none"
    document.getElementById("player-value").style.height = "2rem"
    document.getElementById("dealer-value").style.height = "2rem"
    doubled = 0
    bet = 0
    hitNumber = 0
    dCard1 = 0
    dCard2 = 0
    dCard3 = 0
    dCard4 = 0
    dCard5 = 0
    dCard6 = 0
    dCard7 = 0
    dCard8 = 0
    dCard9 = 0
    pCard1 = 0
    pCard2 = 0
    pCard3 = 0
    pCard4 = 0
    pCard5 = 0
    pCard6 = 0
    pCard7 = 0
    pCard8 = 0
    pCard9 = 0
    dealerValue = 0
    playerValue = 0
    playerHand = []
    dealerHand = []
    incBet.style.display = "flex"
    decBet.style.display = "flex"
    finBet.style.display = "flex"
    allInBet.style.display = "flex"
    doubleButton.style.display = "none"
    betDisplay.innerHTML = "$"+bet+".00"
    balance.innerHTML = "$"+bank+".00"
    document.getElementById("dealer-value").innerHTML = "00"
    document.getElementById("player-value").innerHTML = "00"
    document.getElementById("player-value").style.color = "#ffffff"
    document.getElementById("dealer-value").style.color = "#ffffff"
    incHands()
    console.warn("Game Reset")
}

function calculatePlayerValue(hand) {
  let total = 0
  let numAces = 0

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const cardVal = Value(card)
    if (cardVal == 11) {
      numAces++
    }
    total += cardVal;
  }

  // Adjust Ace values if the total exceeds 21
  while (total > 21 && numAces > 0) {
    total -= 10 // Change Ace value from 11 to 1
    numAces--
  }

  playerValue = total
  document.getElementById("player-value").innerHTML = total
  console.log("player's hand : "+playerHand)
}

function calculateDealerValue(hand) {
    let total = 0
    let numAces = 0
  
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      const cardVal = Value(card)
      if (cardVal == 11) {
        numAces++
      }
      total += cardVal;
    }
  
    // Adjust Ace values if the total exceeds 21
    while (total > 21 && numAces > 0) {
      total -= 10 // Change Ace value from 11 to 1
      numAces--
    }
  
    dealerValue = total
    document.getElementById("dealer-value").innerHTML = total
    console.log("dealer's hand : "+dealerHand)
    console.log("dealer total = "+total)
  }



function changePicture(cardPic) {
    if (cardPic == "AC") {
        return "<img src=\"images/Blackjack game/2.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "2C") {
        return "<img src=\"images/Blackjack game/3.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "3C") {
        return "<img src=\"images/Blackjack game/4.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "4C") {
        return "<img src=\"images/Blackjack game/5.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "5C") {
        return "<img src=\"images/Blackjack game/6.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "6C") {
        return "<img src=\"images/Blackjack game/7.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "7C") {
        return "<img src=\"images/Blackjack game/8.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "8C") {
        return "<img src=\"images/Blackjack game/9.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "9C") {
        return "<img src=\"images/Blackjack game/10.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "10C") {
        return "<img src=\"images/Blackjack game/11.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "JC") {
        return "<img src=\"images/Blackjack game/12.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "QC") {
        return "<img src=\"images/Blackjack game/13.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "KC") {
        return "<img src=\"images/Blackjack game/14.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    // HEARTS //
    if (cardPic == "AH") {
        return "<img src=\"images/Blackjack game/15.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "2H") {
        return "<img src=\"images/Blackjack game/16.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "3H") {
        return "<img src=\"images/Blackjack game/17.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "4H") {
        return "<img src=\"images/Blackjack game/18.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "5H") {
        return "<img src=\"images/Blackjack game/19.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "6H") {
        return "<img src=\"images/Blackjack game/20.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "7H") {
        return "<img src=\"images/Blackjack game/21.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "8H") {
        return "<img src=\"images/Blackjack game/22.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "9H") {
        return "<img src=\"images/Blackjack game/23.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "10H") {
        return "<img src=\"images/Blackjack game/24.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "JH") {
        return "<img src=\"images/Blackjack game/25.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "QH") {
        return "<img src=\"images/Blackjack game/26.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "KH") {
        return "<img src=\"images/Blackjack game/27.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    // DIAMONDS //
    if (cardPic == "AD") {
        return "<img src=\"images/Blackjack game/28.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "2D") {
        return "<img src=\"images/Blackjack game/29.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "3D") {
        return "<img src=\"images/Blackjack game/30.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "4D") {
        return "<img src=\"images/Blackjack game/31.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "5D") {
        return "<img src=\"images/Blackjack game/32.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "6D") {
        return "<img src=\"images/Blackjack game/33.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "7D") {
        return "<img src=\"images/Blackjack game/34.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "8D") {
        return "<img src=\"images/Blackjack game/35.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "9D") {
        return "<img src=\"images/Blackjack game/36.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "10D") {
        return "<img src=\"images/Blackjack game/37.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "JD") {
        return "<img src=\"images/Blackjack game/38.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "QD") {
        return "<img src=\"images/Blackjack game/39.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "KD") {
        return "<img src=\"images/Blackjack game/40.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    // SPADES //
    if (cardPic == "AS") {
        return "<img src=\"images/Blackjack game/41.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "2S") {
        return "<img src=\"images/Blackjack game/42.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "3S") {
        return "<img src=\"images/Blackjack game/43.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "4S") {
        return "<img src=\"images/Blackjack game/44.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "5S") {
        return "<img src=\"images/Blackjack game/45.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "6S") {
        return "<img src=\"images/Blackjack game/46.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "7S") {
        return "<img src=\"images/Blackjack game/47.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "8S") {
        return "<img src=\"images/Blackjack game/48.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "9S") {
        return "<img src=\"images/Blackjack game/49.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "10S") {
        return "<img src=\"images/Blackjack game/50.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "JS") {
        return "<img src=\"images/Blackjack game/51.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "QS") {
        return "<img src=\"images/Blackjack game/52.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
    else if (cardPic == "KS") {
        return "<img src=\"images/Blackjack game/53.png\" style=\"width: 100%; height: 100%; border-radius: 10px;\">"
    }
}

function addFund() {
    var fundToAdd = document.getElementById("add-funds-box")

    var fundToAddNum = fundToAdd.value;

    fundToAddNum = parseFloat(fundToAddNum);

    if (fundToAddNum % 1 == 0) {
        console.log("Fund to add : "+fundToAddNum)

        bank += fundToAddNum

        console.log("New Value : "+bank)
        balance.innerHTML = "$"+bank+".00"
        incFundAdded(fundToAddNum)
        document.getElementById("add-fund-debug").innerHTML = "Funds Added"
        document.getElementById("add-fund-debug").style.color = "white"
    }
    else {
        console.error("Value must be a whole number")
        document.getElementById("add-fund-debug").innerHTML = "Value must be a whole number."
        document.getElementById("add-fund-debug").style.color = "red"
    }
}
function copyStats() {
    var statsToCopy = "Hands : "+hands+"\nPlayer Wins : "+playerWins+"\nDealer Wins : "+dealerWins+"\nPlayer Blackjacks : "+playerBlackjacks+"\nDealer Blackjacks : "+dealerBlackjacks+"\nDouble Downs Won : "+DubDwnWon+"\nCurrent Streak : "+streak+"\nAmount Won : $"+amountWon+".00\nFunds Added : $"+fundAddTot+".00\n\nTotal Balance : $"+bank+".00"
    navigator.clipboard.writeText(statsToCopy)
}

// MENU //

var pokerChip = document.getElementById("poker-chip")
var closeButton = document.getElementById("close-menu-button")
var statsButton = document.getElementById("stats")
var statsBody = document.getElementById("stats-body")
var aboutButton = document.getElementById("about-the-project")
var aboutBody = document.getElementById("project-body")
var addFundButton = document.getElementById("add-funds")
var addFundBody = document.getElementById("add-funds-body")
var totalMoney = document.getElementById("total-money")
var howToPlayButton = document.getElementById("how-to-play")
var howToPlayBody = document.getElementById("how-to-play-body")
var settingsButton = document.getElementById("settings")
var settingsBody = document.getElementById("settings-body")

let menuOpen = 0

function openMenu() {
    if (menuOpen == 0) {
        console.log("Open Menu")
        coinHolder.style.height = "75%"
        balance.style.cursor = "auto"
        closeButton.style.marginBottom = "1rem"
        closeButton.style.height = "5rem"
        statsButton.style.display = "block"
        aboutButton.style.display = "block"
        addFundButton.style.display = "block"
        howToPlayButton.style.display = "block"
        settingsButton.style.display = "block"
        menuOpen = 1
    }
}
function closeMenu() {
    console.log("Close Menu")
    coinHolder.style.height = "60px"
    closeButton.style.width = "325px"
    coinHolder.style.width = "325px"
    balance.style.cursor = "pointer"
    balance.style.alignItems = "flex-start"
    closeButton.style.marginBottom = "-10rem"
    statsButton.style.display = "none"
    addFundButton.style.display = "none"
    aboutButton.style.display = "none"
    statsButton.style.top = "0"
    statsBody.style.opacity = "0"
    statsBody.style.height = "0%"
    aboutButton.style.top = "0"
    aboutBody.style.opacity = "0"
    aboutBody.style.height = "0rem"
    addFundButton.style.top = "0"
    addFundBody.style.opacity = "0"
    addFundBody.style.height = "0rem"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.322)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.322)"
    statsButton.style.marginBottom = "0%"
    aboutButton.style.marginBottom = "0%"
    addFundButton.style.marginBottom = "0%"
    statsBody.style.display = "none"
    aboutBody.style.display = "none"
    addFundBody.style.display = "none"
    howToPlayButton.style.display = "none"
    howToPlayBody.style.display = "none"
    howToPlayButton.style.marginBottom = "0"
    settingsButton.style.marginBottom = "0"
    settingsBody.style.display = "none"
    settingsButton.style.display = "none"
    menuOpen = 0
}
function openStats() {
    console.log("Open Stats")
    coinHolder.style.width = "85%"
    closeButton.style.width = "100%"
    closeButton.style.marginRight = "0"
    pokerChip.style.marginLeft = "-65%"
    statsBody.style.opacity = "1"
    statsBody.style.display = "flex"
    statsBody.style.cursor = "auto"
    statsBody.style.height = "75%"
    aboutButton.style.display = "none"
    addFundButton.style.display = "none"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    coinHolder.style.justifyContent = "space-between"
    statsButton.style.marginBottom = "100%"
}
function openAbout() {
    console.log("Open About")
    coinHolder.style.width = "85%"
    closeButton.style.width = "100%"
    pokerChip.style.marginLeft = "-65%"
    aboutButton.style.marginRight = "0"
    aboutButton.style.top = "-115%"
    aboutBody.style.opacity = "1"
    aboutBody.style.display = "flex"
    aboutBody.style.cursor = "auto"
    aboutBody.style.height = "75%"
    statsButton.style.top = "-175%"
    statsButton.style.display = "none"
    addFundButton.style.display = "none"
    closeButton.style.marginRight = "0"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    aboutButton.style.marginBottom = "100%"
}
function openAddFunds() {
    console.log("Open Add Funds")
    coinHolder.style.width = "85%"
    closeButton.style.width = "100%"
    pokerChip.style.marginLeft = "-65%"
    addFundButton.style.marginRight = "0"
    addFundButton.style.top = "-115%"
    addFundBody.style.opacity = "1"
    addFundBody.style.display = "flex"
    addFundBody.style.cursor = "auto"
    addFundBody.style.height = "75%"
    addFundBody.style.marginLeft = "-33.5rem"
    statsButton.style.top = "-175%"
    statsButton.style.display = "none"
    aboutButton.style.top = "-175%"
    aboutButton.style.display = "none"
    closeButton.style.marginRight = "0"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    addFundButton.style.marginBottom = "100%"
}
function openHowToPlay() {
    console.log("Add Funds About")
    coinHolder.style.width = "85%"
    closeButton.style.width = "100%"
    pokerChip.style.marginLeft = "-65%"
    howToPlayButton.style.marginRight = "0"
    howToPlayButton.style.marginBottom = "30rem"
    howToPlayBody.style.opacity = "1"
    howToPlayBody.style.display = "flex"
    howToPlayBody.style.cursor = "auto"
    howToPlayBody.style.height = "75%"
    howToPlayBody.style.marginLeft = "-32.5rem"
    statsButton.style.top = "-175%"
    statsButton.style.display = "none"
    addFundButton.style.display = "none"
    aboutButton.style.top = "-175%"
    aboutButton.style.display = "none"
    closeButton.style.marginRight = "0"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    addFundButton.style.marginBottom = "100%"
    settingsButton.style.display = "none"
}
function openSettings() {
    console.log("Add Funds About")
    coinHolder.style.width = "85%"
    closeButton.style.width = "100%"
    pokerChip.style.marginLeft = "-65%"
    settingsButton.style.marginRight = "0"
    settingsButton.style.marginBottom = "30rem"
    settingsBody.style.opacity = "1"
    settingsBody.style.display = "flex"
    settingsBody.style.cursor = "auto"
    settingsBody.style.height = "75%"
    settingsBody.style.marginLeft = "-32.5rem"
    statsButton.style.top = "-175%"
    statsButton.style.display = "none"
    addFundButton.style.display = "none"
    aboutButton.style.top = "-175%"
    aboutButton.style.display = "none"
    closeButton.style.marginRight = "0"
    coinHolder.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    closeButton.style.backgroundColor = "rgba(0, 0, 0, 0.425)"
    // addFundButton.style.marginBottom = "100%"
    howToPlayButton.style.display = "none"
}