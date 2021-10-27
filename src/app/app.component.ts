import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	icons: string[] = [
		"fab fa-angellist", 
		"fas fa-angry", 
		"fas fa-apple-alt", 
		"fas fa-atom", 
		"fas fa-award", 
		"fas fa-baby", 
		"fas fa-baseball-ball", 
		"fas fa-bell", 
		"fas fa-birthday-cake", 
		"fas fa-bolt", 
		"fas fa-bomb", 
		"fas fa-bone", 
		"fas fa-broom", 
		"fas fa-bug", 
		"fas fa-bullhorn", 
		"fas fa-bus-alt", 
		"fas fa-camera-retro", 
		"fas fa-campground", 
		"fab fa-canadian-maple-leaf", 
		"fas fa-candy-cane",
		"fas fa-carrot", 
		"fas fa-cat", 
		"fas fa-chess", 
		"fas fa-chess-knight", 
		"fab fa-chrome", 
		"fas fa-cloud-moon", 
		"fas fa-cocktail", 
		"fas fa-coffee", 
		"fas fa-cookie-bite", 
		"fas fa-crow", 
		"fas fa-cut", 
		"fas fa-dice-d20", 
		"fab fa-discord", 
		"fas fa-dizzy", 
		"fas fa-dog", 
		"fas fa-dove", 
		"fas fa-drum", 
		"fas fa-drumstick-bite", 
		"fab fa-envira", 
		"fas fa-fan", 
		"fas fa-feather-alt", 
		"fas fa-fighter-jet", 
		"fas fa-fire-extinguisher", 
		"fas fa-fish", 
		"fab fa-fly", 
		"fas fa-football-ball", 
		"fab fa-fort-awesome", 
		"fas fa-frog", 
		"fas fa-futbol", 
		"fab fa-galactic-republic", 
		"fas fa-gamepad", 
		"fas fa-gem", 
		"fas fa-ghost", 
		"fas fa-gifts", 
		"fas fa-globe-africa", 
		"fas fa-graduation-cap", 
		"fas fa-grin-beam-sweat", 
		"fas fa-grin-hearts", 
		"fas fa-guitar", 
		"fas fa-hamburger", 
		"fas fa-hammer", 
		"fas fa-hamsa", 
		"fas fa-hat-cowboy", 
		"fas fa-hat-wizard", 
		"fas fa-heart", 
		"fas fa-heart-broken", 
		"fas fa-helicopter", 
		"fas fa-horse", 
		"fas fa-hotdog", 
		"fas fa-ice-cream", 
		"fab fa-itunes-note", 
		"fas fa-jedi", 
		"fas fa-key", 
		"fas fa-kiwi-bird", 
		"fas fa-lemon", 
		"fas fa-lightbulb", 
		"fas fa-magic", 
		"fas fa-meteor", 
		"fas fa-moon", 
		"fas fa-mosque", 
		"fas fa-paint-brush", 
		"fas fa-palette", 
		"fas fa-paper-plane", 
		"fas fa-pastafarianism", 
		"fas fa-paw", 
		"fas fa-pepper-hot", 
		"fab fa-pied-piper-hat", 
		"fas fa-piggy-bank", 
		"fas fa-pizza-slice", 
		"fas fa-quidditch", 
		"fab fa-rebel", 
		"fas fa-rocket", 
		"fas fa-robot", 
		"fas fa-sad-cry", 
		"fas fa-skull", 
		"fas fa-sleigh", 
		"fas fa-snowflake", 
		"fas fa-snowman", 
		"fas fa-spider", 
		"fas fa-sun", 
		"fas fa-theater-masks", 
		"fas fa-toilet-paper", 
		"fas fa-tooth", 
		"fas fa-umbrella", 
		"fas fa-user-astronaut", 
		"fas fa-user-ninja", 
		"fas fa-user-secret", 
		"fas fa-wine-glass-alt"];
	gameStart: boolean = false;
	level: number = 1;
	numberOfCards: number = 0;
	cards: Card[] = [];
	busy: boolean = false;
	selectedCards: Card[] = [];
	maxSelectedCards: number = 2;
	moreCardsSelectable: boolean = true;
	showNextLevel: boolean = false;
	timeToSeeCards: number = 1000;
	flippingTime: number = 500;
	loadingTime: number = 5000;
	flippingCards: boolean = false;
	selectingCards: boolean = false;

	async startGame() {
		this.busy = true;
		this.level = 1;
		await this.initLevel();
		this.gameStart = true;
		this.busy = false;
		this.flipCards();
	}

	async endGame() {
		this.gameStart = false;
	}

	async nextLevel() {
		this.busy = true;
		++this.level;
		await this.initLevel();
		this.busy = false;
		this.flipCards();
	}

	async finishLevel() {
		await this.sleep(this.flippingTime);
		this.showNextLevel = true;
	}
	
	async initLevel() {
		await this.sleep(this.loadingTime);
		
		this.showNextLevel = false;
		this.cards = [];
		this.moreCardsSelectable = true;

		this.numberOfCards = 0;
		if (this.level <= 1) {
			this.numberOfCards = 4;
			this.maxSelectedCards = 2;
			this.timeToSeeCards = 2000;
		} else if (this.level >= 2 && this.level <= 4) {
			this.numberOfCards = 8;
			this.maxSelectedCards = 2;
			this.timeToSeeCards = 1500;
		} else {
			this.numberOfCards = 12;
			this.maxSelectedCards = 2;
			this.timeToSeeCards = 1000;
		}

		let numberOfIcons = this.icons.length;
		for (let i = 0; i < this.numberOfCards; i+=2) {
			let icon = this.icons[Math.floor(Math.random() * numberOfIcons) + 1];
			while (this.cards.some(x => x.imageIndex == icon)) {
				icon = this.icons[Math.floor(Math.random() * numberOfIcons) + 1];
			}

			let card1: Card = {
				value: i,
				imageIndex: icon,
				selected: false,
				complete: false
			};
			let card2: Card = {
				value: i,
				imageIndex: icon,
				selected: false,
				complete: false
			};
			this.cards.push(card1, card2);
		}

		this.shuffleCards();
	}

	shuffleCards() {
		let i = this.numberOfCards;
		while (i--) {
			const j = Math.floor(Math.random() * i);
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	async flipCards() {
		await this.sleep(this.flippingTime);
		this.flippingCards = true;
		await this.staggerAnimation(true, false);
		await this.sleep(this.timeToSeeCards);
		await this.staggerAnimation(false, true);
		this.flippingCards = false;
	}

	async staggerAnimation(selected: boolean, reverse: boolean) {
		if (reverse) {
			for (let i = this.cards.length - 1; i >= 0; i--) {
				const card = this.cards[i];
				card.selected = selected;
				await this.sleep(50);
			}
		} else {
			for (let i = 0; i < this.cards.length; i++) {
				const card = this.cards[i];
				card.selected = selected;
				await this.sleep(50);
			}
		}
	}

	async selectCard(card: Card) {
		if (!this.moreCardsSelectable || this.flippingCards || this.selectingCards) return;

		this.selectingCards = true;
		
		this.selectedCards.push(card);
		card.selected = true;
		
		this.moreCardsSelectable = this.selectedCards.length < this.maxSelectedCards;
		
		if (this.selectedCards.length == this.maxSelectedCards) {
			await this.checkCards();
		}

		this.selectingCards = false;
	}

	async checkCards() {
		// await this.sleep(this.flippingTime);
		let value = this.selectedCards[0].value;
		if (this.selectedCards.every(x => x.value == value)) {
			// success
			this.selectedCards.forEach(x => x.complete = true);
		} else {
			await this.sleep(this.flippingTime + 200);
			// fail
		}

		this.selectedCards.forEach(x => x.selected = false);
		
		this.selectedCards = [];
		this.moreCardsSelectable = true;

		if (this.cards.every(x => x.complete)) {
			this.finishLevel();
		}
	}

	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

export class Card {
	value: number = -1;
	imageIndex: string = "";
	selected: boolean = false;
	complete: boolean = false;
}