const valueCards = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const actionCards = ["Flip Three", "Second Chance", "Freeze"];
const plusCards = ['x2', '+2', '+4','+6', '+8', '+10'];

const cardMap = {
	'0': { value: 0, text: 'Zero', color: 'blue' },
	'1': { value: 1, text: 'One', color: 'yellow' },
	'2': { value: 2, text: 'Two', color: 'green' },
	'3': { value: 3, text: 'Three', color: 'purple' },
	'4': { value: 4, text: 'Four', color: 'blue' },
	'5': { value: 5, text: 'Five', color: 'green' },
	'6':  { value: 6, text: 'Six', color: 'purple' },
	'7': { value: 7, text: 'Seven', color: 'orange' },
	'8': { value: 8, text: 'Eight', color: 'yellow' },
	'9': { value: 9, text: 'Nine', color: 'orange' },
	'10': { value: 10, text: 'Ten', color: 'red' },
	'11': { value: 11, text: 'Eleven', color: 'blue' },
	'12': { value: 12, text: 'Twelve', color: 'purple' },
	'Flip Three': { special: 'Flip Three', color: 'yellow' },
	'Freeze': { special: 'Freeze', color: 'blue' },
	'Second Chance': { special: 'Second Chance', color: 'red' },
	'x2': { add: 'x2', color: 'orange' },
	'x3': { add: 'x3', color: 'orange' },
	'+2': { add: '+2', color: 'orange' },
	'+4': { add: '+4', color: 'orange' },
	'+6': { add: '+6', color: 'orange' },
	'+8': { add: '+8', color: 'orange' },
	'+10': { add: '+10', color: 'orange' },
};

export function generateDeck() {
	const deck = [];
	deck.push(cardMap['0']);
	// for (let i = 1; i < valueCards.length; i++) {
	// 	for (let j = 0; j < valueCards[i]; j++) {
	// 		deck.push(cardMap[valueCards[i]]);
	// 	}
	// }
	for (let i = 1; i < valueCards.length; i++) {
		for (let j = 0; j < 1; j++) {
			deck.push(cardMap[valueCards[i]]);
		}
	}
	// for (let i = 0; i < actionCards.length; i++) {
	// 	for (let j = 0; j < 10; j++) {
	// 		deck.push(cardMap[actionCards[i]]);
	// 	}
	// }
	for (let i = 0; i < actionCards.length; i++) {
		for (let j = 0; j < 3; j++) {
			deck.push(cardMap[actionCards[i]]);
		}
	}
	for (let i = 0; i < plusCards.length; i++) {
		deck.push(cardMap[plusCards[i]]);
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

export function calculateCardOdds(deck, target) {
	const totalCards = deck.length;
	const targetCards = deck.filter(card => !card.special ? card.value === target : card.special === target);
	return targetCards.length / totalCards * 100; // Return odds as a percentage
}
