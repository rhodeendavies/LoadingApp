import { Component } from '@angular/core';
import { faAngry, faAppleAlt, faAtom, faAward, faBaby, faBaseballBall, faBed, faBell, faBirthdayCake, faBolt, faBomb, faBone, faBroom, faBug, faBullhorn, faBusAlt, faCameraRetro, faCampground, faCandyCane, faCar, faCarrot, faCat, faChess, faChessKnight, faCloudMeatball, faCloudMoon, faCloudMoonRain, faCloudRain, faCloudSunRain, faCocktail, faCoffee, faCookieBite, faCrow, faCut, faDiceD20, faDizzy, faDog, faDove, faDrum, faDrumstickBite, faEye, faFan, faFeatherAlt, faFighterJet, faFireExtinguisher, faFish, faFlag, faFootballBall, faFrog, faFutbol, faGamepad, faGem, faGhost, faGifts, faGlobeAfrica, faGraduationCap, faGrinBeamSweat, faGrinHearts, faGuitar, faHamburger, faHammer, faHamsa, faHatCowboy, faHatWizard, faHeading, faHeart, faHeartBroken, faHelicopter, faHorse, faHotdog, faIceCream, faJedi, faKey, faKiwiBird, faLemon, faLightbulb, faMagic, faMeteor, faMoon, faMosque, faPaintBrush, faPalette, faPaperPlane, faPastafarianism, faPaw, faPepperHot, faPiggyBank, faPizzaSlice, faQuidditch, faRobot, faRocket, faSadCry, faSkull, faSleigh, faSnowflake, faSnowman, faSpider, faSun, faTheaterMasks, faThermometer, faToiletPaper, faTooth, faUmbrella, faUserAstronaut, faUserNinja, faUserSecret, faWineGlassAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	icons: IconDefinition[] = [
		faAngry,
		faAppleAlt,
		faAtom,
		faAward,
		faBaby,
		faBaseballBall,
		faBell,
		faBirthdayCake,
		faBolt,
		faBomb,
		faBone,
		faBroom,
		faBug,
		faBullhorn,
		faBusAlt,
		faCameraRetro,
		faCampground,
		faCandyCane,
		faCarrot,
		faCat,
		faChess,
		faChessKnight,
		faCloudMoon,
		faCloudMoonRain,
		faCloudMeatball,
		faCloudRain,
		faCloudSunRain,
		faCocktail,
		faCoffee,
		faCookieBite,
		faCrow,
		faCut,
		faDiceD20,
		faDizzy,
		faDog,
		faDove,
		faDrum,
		faDrumstickBite,
		faFan,
		faFeatherAlt,
		faFighterJet,
		faFireExtinguisher,
		faFish,
		faFootballBall,
		faFrog,
		faFutbol,
		faGamepad,
		faGem,
		faGhost,
		faGifts,
		faGlobeAfrica,
		faGraduationCap,
		faGrinBeamSweat,
		faGrinHearts,
		faGuitar,
		faHamburger,
		faHammer,
		faHamsa,
		faHatCowboy,
		faHatWizard,
		faHeart,
		faHeartBroken,
		faHelicopter,
		faHorse,
		faHotdog,
		faIceCream,
		faJedi,
		faKey,
		faKiwiBird,
		faLemon,
		faLightbulb,
		faMagic,
		faMeteor,
		faMoon,
		faMosque,
		faPaintBrush,
		faPalette,
		faPaperPlane,
		faPastafarianism,
		faPaw,
		faPepperHot,
		faPiggyBank,
		faPizzaSlice,
		faQuidditch,
		faRocket,
		faRobot,
		faSadCry,
		faSkull,
		faSleigh,
		faSnowflake,
		faSnowman,
		faSpider,
		faSun,
		faTheaterMasks,
		faToiletPaper,
		faTooth,
		faUmbrella,
		faUserAstronaut,
		faUserNinja,
		faUserSecret,
		faWineGlassAlt];
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
	score = 0;
	levelStartTime: Date = new Date();
	loader: number = 0;
	showPickLoader: boolean = true;
	loaderIcon: IconDefinition = this.icons[1];
	icon: number = 0;
	loaderInterval = setInterval(() => {}, 0);
	loaderCards: Card[] = [];
	faEye = faEye;

	pickLoader(option: number) {
		this.loader = option;
		this.showPickLoader = false;
		if (this.loader == 4) {
			for (let i = 0; i < 100; i++) {
				this.loaderCards.push({
					value: i,
					imageIndex: this.loaderIcon,
					selected: false,
					complete: false,
				});
			}
		}
	}

	flipLoaderCard(card: Card) {
		card.selected = true;
		setTimeout(() => {
			card.selected = false;
		}, 300);
	}

	setCardLoaderInterval() {
		this.loaderInterval = setInterval(() => {
			++this.icon;
			this.loaderIcon = this.icons[this.icon];
		}, 2000);
	}

	clearCardLoaderInterval() {
		clearInterval(this.loaderInterval);
	}

	async startGame() {
		this.busy = true;
		if (this.loader == 3) {
			this.setCardLoaderInterval();
		}
		this.level = 1;
		this.score = 0;
		await this.initLevel();
		this.gameStart = true;
		this.busy = false;
		if (this.loader == 3) {
			this.clearCardLoaderInterval();
		}
		this.flipCards();
	}

	async endGame() {
		this.gameStart = false;
	}

	async nextLevel() {
		this.busy = true;
		if (this.loader == 3) {
			this.setCardLoaderInterval();
		}
		++this.level;
		await this.initLevel();
		this.busy = false;
		if (this.loader == 3) {
			this.clearCardLoaderInterval();
		}
		this.flipCards();
	}

	async finishLevel() {
		let levelEndTime = new Date();
		let secondsTakenOnLevel = (levelEndTime.getTime() - this.levelStartTime.getTime()) / 1000;
		await this.sleep(this.flippingTime);
		this.showNextLevel = true;
		setTimeout(async () => {
			let newScore = this.score + (1/secondsTakenOnLevel * 1000) * this.level;
			let inc = Math.floor((newScore - this.score) / 100);
			while (this.score < newScore) {
				this.score += inc;
				await this.sleep(1);
			}
		}, 1000);
	}

	async initLevel() {
		await this.sleep(this.loadingTime);

		this.levelStartTime = new Date();
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
		for (let i = 0; i < this.numberOfCards; i += 2) {
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
		if (card.selected || !this.moreCardsSelectable || this.flippingCards || this.selectingCards) return;

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
	imageIndex: IconDefinition = faBug;
	selected: boolean = false;
	complete: boolean = false;
}