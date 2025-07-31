const valueCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const actionCards = [];//["secondChance", "freeze", "flipThree"];
export function generateDeck() {
	const deck = [];
	deck.push(0);
	for (let i = 1; i < valueCards.length; i++) {
		for (let j = 0; j < valueCards[i]; j++) {
			deck.push(valueCards[i]);
		}
	}
	for (let i = 0; i < actionCards.length; i++) {
		for (let j = 0; j < 3; j++) {
			deck.push(actionCards[i]);
		}
	}
	return shuffleDeck(deck);
}

export function shuffleDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

export function calculateValueOdds(deck, targetValue) {
	const totalCards = deck.length;
	const targetCards = deck.filter(card => card.value === targetValue);
	return targetCards.length / totalCards * 100; // Return odds as a percentage
}
