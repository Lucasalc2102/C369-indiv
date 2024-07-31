document.addEventListener("DOMContentLoaded", function() {
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

    // Load initial wallet balance from storage if available
    loadWalletBalance();
});

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function login() {
    // Simulate successful login
    alert('Logged in!');
    window.location.href = 'otp.html';
}

function signup() {
    // Simulate successful signup
    alert('Signed up!');
    window.location.href = 'otp.html';
}

function loadWalletBalance() {
    // Load wallet balance from localStorage if available
    const walletBalance = localStorage.getItem('walletBalance');
    if (walletBalance) {
        document.getElementById('walletBalance').innerText = walletBalance;
    } else {
        document.getElementById('walletBalance').innerText = '$0.00';
    }
}

function updateWalletBalance(amount) {
    const walletBalanceElement = document.getElementById('walletBalance');
    let currentBalance = parseFloat(walletBalanceElement.innerText.replace('$', '').replace(',', ''));
    currentBalance += amount;
    walletBalanceElement.innerText = `$${currentBalance.toFixed(2)}`;
    localStorage.setItem('walletBalance', walletBalanceElement.innerText);
}

function processPayment() {
    const amount = parseFloat(document.getElementById('amount').value);
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

    if (amount) {
        // Add amount to wallet balance
        updateWalletBalance(amount);
    }

    if (paymentAmount) {
        // Deduct payment amount from wallet balance
        updateWalletBalance(-paymentAmount);
        // Simulate successful payment
        alert('Payment successful!');
        window.location.href = 'confirmation.html'; // Redirect to confirmation page
    }
}

function verifyOTP(otp) {
    const correctOTP = '123456'; // The correct OTP for testing purposes
    if (otp === correctOTP) {
        alert('OTP verified successfully!');
        window.location.href = 'index.html'; // Redirect to the home page
    } else {
        alert('Invalid OTP. Please try again.'); // Show pop-up message for incorrect OTP
    }
}

// Show login form when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
