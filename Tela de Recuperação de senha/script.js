    const inputs = document.querySelectorAll('.code-input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            input.value = input.value.replace(/[^0-9]/g, '');

            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });