<template>
  <input 
        type="text" 
        name="typedText" 
        id="typedText"
        class="p-4 w-full ring ring-gray-600 focus:ring focus:ring-blue-900 rounded"
        placeholder="Type here"
        @input="inputListener()"
        onpaste="return false;"
        disabled
    >
</template>

<script>
export default {
    methods: {
        inputListener() {
            const quoteElement = document.getElementById('quote');
            const inputElement = document.getElementById('typedText');
            const arrayOfQuote = quoteElement.querySelectorAll('span');
            const arrayOfInput = inputElement.value.split('');
            // with the quote returned from api,
            // make an array of the quote, after the split into span elements,
            arrayOfQuote.forEach((characterElement, index) => {
                // assign the value of the input element 
                // & match it up with the index.
                const inputValue = arrayOfInput[index];
                // if the input value is nothing - or - null
                if (inputValue == null) {
                    // add incorrect styling for the character element that does not match the quote,
                    // also, remove correct styling
                    characterElement.classList.remove('text-red-500', 'bg-red-200', 'underline', 'font-bold');
                    characterElement.classList.remove('text-green-400');
                } else if (inputValue === characterElement.innerText) {
                    // if the input value is the same as the next character in the quote:
                    // remove the maxlength attribute on the input element
                    inputElement.removeAttribute('maxlength');
                    // add correct styling for the character elements that do match the quote,
                    // also, remove incorrect styling
                    characterElement.classList.add('text-green-400');
                    characterElement.classList.remove('text-red-500', 'bg-red-200', 'underline', 'font-bold');
                } else {
                    // if the input value is not the same as the next character in the quote
                    if (inputValue !== characterElement.innerText[index]) {
                        // limit maxlength of input element to 1
                        inputElement.setAttribute('maxlength', 1);
                    }
                    // add incorrect styling for the character element that does not match the quote,
                    // also, remove correct styling
                    characterElement.classList.add('text-red-500', 'bg-red-200', 'underline', 'font-semibold');
                    characterElement.classList.remove('text-green-400');
                }
            });
        },
    }
}
</script>