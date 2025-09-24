export default function QuoteOfTheDay() {
    const quotes = [
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Success doesn’t just find you. You have to go out and get it.",
        "Dream it. Wish it. Do it.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "The body achieves what the mind believes.",
        "No excuses. Just results.",
        "One workout at a time, one day at a time.",
        "Sweat is just fat crying.",
        "Discipline is choosing what you want most over what you want now.",
        "Your only limit is you.",
        "Stronger every day.",
        "Fall in love with the process and results will come.",
        "You don’t get the body you want by wishing for it.",
        "Pain is temporary. Pride is forever.",
        "Make yourself stronger than your strongest excuse."
    ]

    const index = Math.floor(Math.random() * quotes.length)

    return quotes[index];
}