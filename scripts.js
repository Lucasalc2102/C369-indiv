document.addEventListener("DOMContentLoaded", function() {
    // Initialize forms and load data
    initForms();
    loadWalletBalance();
    populatePaymentMethods();

    // Additional event listeners
    setupEventListeners();
});

function initForms() {
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const otp = document.getElementById('otp').value;
            verifyOTP(otp);
        });
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            processPayment();
        });
    }

    const addCardForm = document.getElementById('addCardForm');
    if (addCardForm) {
        addCardForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addCard();
        });
    }

    const addTransactionForm = document.getElementById('addTransactionForm');
    if (addTransactionForm) {
        addTransactionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addTransaction();
        });
    }
}

function setupEventListeners() {
    window.onclick = function(event) {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    const shopeePayButton = document.getElementById('shopeePayButton');
    if (shopeePayButton) {
        shopeePayButton.addEventListener('click', function() {
            window.location.href = 'shopee-pay.html';
        });
    }

    const transactionHist = document.getElementById('transactionhist');
    if (transactionHist) {
        transactionHist.addEventListener('click', function() {
            window.location.href = 'shopee-pay.html';
        });
    }
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function login() {
    alert('Logged in!');
    window.location.href = 'otp.html';
}

function signup() {
    alert('Signed up!');
    window.location.href = 'otp.html';
}

function loadWalletBalance() {
    const walletBalance = localStorage.getItem('walletBalance');
    document.getElementById('walletBalance').innerText = walletBalance || '0.00';
}

function updateWalletBalance(amount) {
    const walletBalanceElement = document.getElementById('walletBalance');
    let currentBalance = parseFloat(walletBalanceElement.innerText.replace('', '').replace(',', ''));
    currentBalance += amount;
    walletBalanceElement.innerText = `{currentBalance.toFixed(2)}`;
    localStorage.setItem('walletBalance', walletBalanceElement.innerText);
}

function processPayment() {
    const amount = parseFloat(document.getElementById('amount').value);
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

    if (amount) {
        updateWalletBalance(amount);
    }

    if (paymentAmount) {
        updateWalletBalance(-paymentAmount);
        alert('Payment successful!');
        window.location.href = 'confirmation.html';
    }
}

function verifyOTP(otp) {
    const correctOTP = '123456';
    if (otp === correctOTP) {
        alert('OTP verified successfully!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid OTP. Please try again.');
    }
}

function populatePaymentMethods() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cards = JSON.parse(localStorage.getItem('cards')) || [];

    paymentMethodSelect.innerHTML = '<option value="" disabled selected>Select Payment Method</option>';

    cards.forEach(card => {
        const option = document.createElement('option');
        option.value = card.cardName;
        option.textContent = `{card.cardName} (**** ${card.cardNumber.slice(-4)})`;
        paymentMethodSelect.appendChild(option);
    });

    const otherMethods = ['Credit Card', 'MasterCard'];
    otherMethods.forEach(method => {
        const option = document.createElement('option');
        option.value = method.toLowerCase().replace(/ /g, '');
        option.textContent = method;
        paymentMethodSelect.appendChild(option);
    });
}

function addCard() {
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    const card = { cardName, cardNumber, expiryDate, cvv };

    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));

    document.getElementById('confirmationMessage').innerText = 'Card added successfully!';
    document.getElementById('addCardForm').reset();
}

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const method = document.getElementById('paymentMethod').value;

    let currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    currentBalance += amount;
    localStorage.setItem('walletBalance', currentBalance);
    document.getElementById('walletBalance').innerText = `${currentBalance.toFixed(2)}`;

    const transaction = {
        date: new Date().toISOString().split('T')[0],
        amount: amount,
        method: method
    };

    const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    transactionHistory.push(transaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    document.getElementById('addTransactionForm').reset();
}

function buyService(amount) {
    let walletBalance = parseFloat(localStorage.getItem('walletBalance') || '0.00');
    
    if (walletBalance >= amount) {
        walletBalance -= amount;
        localStorage.setItem('walletBalance', walletBalance.toFixed(2));
        window.location.href = 'confirmation.html';
    } else {
        alert('Insufficient balance.');
    }
}

function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "confirmation.html";
}

// GPT 2


