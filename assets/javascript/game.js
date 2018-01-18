
// ==============  Liri.js | Composed by John Kim | Univeristy of Richmond  ============================= 

var gameObject = {
	currentLetter: " ",

	totalGuesses: [],
	incorrectGuesses: [],
	correctGuesses: [],
	nextCorrectLetter: [],

	carsArray: ["HUAYRA", "REVENTON", "911GT3RS", "WRXSTI", "SCUDERIA", "AVENTADOR", "GTRNISMO", "DB9 COUPE", "CALIFORNIA", "SLSAMG"],
	randomWord: "",
	carLetters:[],

	guessesLeft: 15,
	loseCount: 0,
	winCount:0,

	isMatch: null,
	isRepeat: null,

//================================ | Game Functions | =====================================================

	randomWord: function()                      
	{		
		var random_num = Math.random() * 9;
		random_num = Math.floor(random_num);

		// Split the string into an array containing the individual letters of the randomly chosen word
		this.randomWord = this.carsArray[random_num];
		this.carLetters = this.randomWord.split("");

		console.log(this.randomWord + " " + this.carLetters);    	// Randomly selected car placed in array.

		// Since this function will only run on a win/loss, reset the guesses arrays
		this.totalGuesses = [];
		this.incorrectGuesses = [];
		this.correctGuesses = [];
		this.nextCorrectLetter = [];
		this.guessesLeft = 15;
	},

	checkRepeat: function()
	{
		var repeatCounter = -1;                    		// Tally the number of guesses.

		// If the current letter equals one from the array of totalGuesses add by one to counter variable.
		for (var i=0; i < this.totalGuesses.length; i++)
		{
			if (this.currentLetter == this.totalGuesses[i])
			{
				repeatCounter++;
			}
		}
		// If counter is zero, the global isRepeat variable becomes false (signifying no matches found)
		// Otherwise a match was found and isRepeat becomes true.
		if (repeatCounter == 0)
		{
			this.isRepeat = false;
		}
		else
		{
			this.isRepeat = true;
		}
	},

	// ====================================== | Game Progression | =============================================
	checkMatch: function()
	{
		var matchCounter = 0;

		// Loop for the car names length amount of times.
		// If the guessed letter is equal to the the cars letter at a given index, the counter variable counts up one.
		for (var i=0; i < this.carLetters.length; i++)
		{
			if (this.currentLetter == this.carLetters[i])
			{
				matchCounter++;
			}
		}
		// If counter is zero, the global isMatch variable becomes false 
		// Otherwise a match was found and isMatch becomes true.
		if (matchCounter == 0)
		{
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function()
	{
												// Duplicate key stroke is not counted.
		if (this.isRepeat == true)
		{
			this.totalGuesses.pop(this.currentLetter);
		}
		// Letter has not been guessed and was a wrong guess, put the currentLetter in incorrectGuesses.
		if (this.isRepeat == false && this.isMatch == false)
		{
			this.incorrectGuesses.push(this.currentLetter);
			this.guessesLeft--;
		}
		// Letter has not been guessed and was a correct guess, put the currentLetter in correctGuesses.
		if (this.isRepeat == false && this.isMatch == true)
		{
			this.correctGuesses.push(this.currentLetter);
			this.guessesLeft--;
		}
	},
	showCar: function()     	     	// Display car if there are no correctGuesses.
	{

		// For the number of letters in the car name, fill the displayed guesses with an underscore.
		if (this.correctGuesses.length == 0)
		{
			for (var i =0; i<this.carLetters.length; i++)
			{
				this.nextCorrectLetter[i] = "_";
			}
		}
		else {
			// For the length of the car name,
			for (var i=0; i<this.carLetters.length; i++)
			{
				// If the displayed guess is not the same as carletters at index i,
				if (this.nextCorrectLetter[i] != this.carLetters[i])
				{
					// Loop for correctGuesses length number of times,
					for (var c=0; c<this.correctGuesses.length; c++)
					{
						// If the correctGuesses at c is equal to carLetters at i, the displayedGuess becomes the carletter at index i
						if (this.correctGuesses[c] == this.carLetters[i])
						{
							this.nextCorrectLetter[i] = this.carLetters[i];
						}
						// Otherwise the displayedGuess at index i (corresponding to the car letter's indexes) becomes an underscore.
						else 
						{
							this.nextCorrectLetter[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.nextCorrectLetter.join(" ");
		document.getElementById("start").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesLeft;
	},
	gameProgression: function()
	{                                             	 // Loop is equal to the car name length. 
		var counter = 0;

		for (var i=0; i<this.carLetters.length; i++)
		{
			if (this.nextCorrectLetter[i] == this.carLetters[i])
			{
				counter++;
			}
		} 

		if (counter == this.carLetters.length) 
		{
			alert("You win");                        // Player wins if the counter matches the length of the car name.
			this.winCount++;
			this.randomWord();
		}

		if (this.guessesLeft == 0)                   // Game loss alert
		{
			alert("You lose!");
			this.loseCount++;
			this.randomWord();
		}
	}
}

var nextGame = false;

document.onkeyup = function(q) 
{
	gameObject.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

	if (gameObject.currentLetter == " " && nextGame == false)
	{
		gameObject.randomWord();
		nextGame = true;
	}

	gameObject.totalGuesses.push(gameObject.currentLetter);
	gameObject.checkRepeat();
	gameObject.checkMatch();
	gameObject.match_repeatComparison();
	gameObject.showCar();
	gameObject.gameProgression();

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "Car Letters: " + gameObject.carLetters + "\n" + "Total Guesses: " + gameObject.totalGuesses);
	console.log("Correct Guesses: " + gameObject.correctGuesses);
	console.log("Incorrect Guesses: " + gameObject.incorrectGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesLeft);
	console.log(gameObject.nextCorrectLetter);
}
