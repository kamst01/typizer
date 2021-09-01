import { ref } from 'vue';
export const quote = {
    author: ref(''),
    content: ref('')
};
export async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quote.content.value = data.content;
        quote.author.value = data.author;
        return quote.author.value, quote.content.value;
    } catch (err) {
        return console.error(err);
    }
}
export async function nextQuote() {
    await fetchRandomQuote();
}