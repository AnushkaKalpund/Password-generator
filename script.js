$(document).ready(function () {
    let password = '';

    function generatePassword() {
        const passwordLength = parseInt($('#passwordLength').val());
        const useSymbols = $('#useSymbols').is(':checked');
        const useNumbers = $('#useNumbers').is(':checked');
        const useLowerCase = $('#useLowerCase').is(':checked');
        const useUpperCase = $('#useUpperCase').is(':checked');

        let charset = '';
        let newPassword = '';

        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        password = newPassword;
        checkPasswordStrength(password); // Call function to check password strength
        updatePasswordMeter(password); // Call function to update password complexity meter
        $('#generatedPassword').val(password); // Update generated password field
    }

    function checkPasswordStrength(password) {
        // Define criteria for a strong password
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()]/.test(password);
        const isLongEnough = password.length >= 8;

        // Check if password meets all criteria for being strong
        const isStrong = hasLowerCase && hasUpperCase && hasNumbers && hasSymbols && isLongEnough;

        // Display whether the password is strong or not
        if (isStrong) {
            $('#passwordStrength').text('Your complexity is : Strong Password');
        } else {
            $('#passwordStrength').text('Your complexity is : Weak Password');
        }
    }

    function updatePasswordMeter(password) {
        const meter = $('.meter-bar');
        const meterText = $('.meter-text');

        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()]/.test(password);
        const isLongEnough = password.length >= 8;

        let strength = 0;

        if (hasLowerCase) strength++;
        if (hasUpperCase) strength++;
        if (hasNumbers) strength++;
        if (hasSymbols) strength++;
        if (isLongEnough) strength++;

        meter.width((strength / 5) * 100 + '%');

        // Update meter text based on strength
        switch (strength) {
            case 0:
                meterText.text('Very Weak');
                break;
            case 1:
                meterText.text('Weak');
                break;
            case 2:
                meterText.text('Moderate');
                break;
            case 3:
                meterText.text('Strong');
                break;
            case 4:
                meterText.text('Very Strong');
                break;
            case 5:
                meterText.text('Extremely Strong');
                break;
            default:
                meterText.text('');
        }
    }

    function copyToClipboard() {
        const el = document.createElement('textarea');
        el.value = password;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        $('#successMessage').text('Password copied to clipboard!');
        setTimeout(function () {
            $('#successMessage').text('');
        }, 2000);
    }

    function togglePasswordVisibility() {
        const passwordInput = $('#generatedPassword');
        const toggleButton = $('#toggleVisibility');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            toggleButton.text('Hide Password');
        } else {
            passwordInput.attr('type', 'password');
            toggleButton.text('Show Password');
        }
    }

    $('#generatePassword').click(function () {
        generatePassword();
        $('#generatedPasswordContainer').show();
    });

    $('#regeneratePassword').click(function () {
        generatePassword();
    });

    $('#copyToClipboard').click(function () {
        copyToClipboard();
    });

    $('#toggleVisibility').click(function () {
        togglePasswordVisibility();
    });
});
