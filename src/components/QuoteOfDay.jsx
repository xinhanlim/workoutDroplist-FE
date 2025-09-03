export default function QuoteOfTheDay() {
    const quotes = [
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Success doesn’t just find you. You have to go out and get it.",
        "Dream it. Wish it. Do it.",
        "Don’t stop when you’re tired. Stop when you’re done."
    ]

    const index = Math.floor(Math.random() * quotes.length)

    return quotes[index];
}