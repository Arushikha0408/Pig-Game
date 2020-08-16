 /*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score,roundScore,acivePlayer,gamePlaying;

init();





/*******************************************************************************************************
*********************************************************************************************************/
 
                                     //  STUDY AND UNDERSTANDING //

/*******************************************************************************************************
*********************************************************************************************************/
//score=[0,0];
//roundScore=0;
//activePlayer=0;

//dice=Math.floor((Math.random()*6)+1);
//console.log(dice);

/*
DOM MANIPULATION - The element that give the access to the DOM is the DOCUMENT object.
The method to select elements from the webpage is querySelector.
*/


//1.we are putting the value of dice in the current score box.textContent method changes the plain text.
//this is setter as we set the value.
//document.querySelector('#current-' + activePlayer).textContent=dice;


//2.innerHTML method helps in putting the HTML, also use the tags or HTML in quotes so that parser acan understand that it is html and not JS code. <em> tah italisize the content.
//document.querySelector('#current-' + activePlayer).innerHTML= '<em>' + dice + '</em>';


/*
we can read the elements from webpage and also store them in some variable using querySelector.
it is a getter as we get a value .
*/

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

/*
We can use the query Selector to change the Property of the CSS
when we are using class instead of id we use a .classname. 
then use a style method
then use the property we need to change 
then finaly equates the value we want to use, here we use none so that we dont see the dice image.
*/

//document.querySelector('.dice').style.display ='none';

/*
Another method to select an id of the webpage is getElememtById . it is faster that querySelector
There is no need to use # for ids in its argument.

Here we are going to set the values of the global score and current score to 0 without changing the HTML.
*/

//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';        //we use it all in the init function
//document.getElementById('current-1').textContent = '0';


/*
Events : Notifications that are sent to notify the code that something happened on the webpage.
Example: clicking a button, resizing a window ,scrolling down or pressing a key.

Event Listener: A Function that performs an action based on a event . It waits for a specific event to happen.

https://developer.mozilla.org/en-US/docs/Web/Events         this is the reference for events 

the method is addEventListener which takes 2 argument , first is the type of event (go to the upper link) and the second argument is the function that we call when the event occurs.
*/
/*******************************************************************************************************
*********************************************************************************************************/
/*******************************************************************************************************
*********************************************************************************************************/




document.querySelector('.btn-roll').addEventListener('click',function () {
	// this is a anonymous function that cannot be called outside this eventlistener and is only executed when this even occurs.
    if(gamePlaying){

    	//1.Need a random number
		var dice=Math.floor((Math.random()*6)+1);

		//2.Display the result
		var diceDOM=document.querySelector('.dice');
		diceDOM.style.display ='block' ;                          //to display the image 
		diceDOM.src = 'dice-' + dice + '.png';                    //to change the image every time dice rolls 

		//3.Update the round score if the rolled number was NOT a 1
		if(dice!==1)
		{
			//add the score and continue to play
			roundScore+=dice;
			document.querySelector('#current-' + activePlayer).textContent=roundScore;
		}

		else
		{
			/*
			this function is repeated two times if instead of declaring an anonymous function two times in different events, 
			we declared this function below and will use it from here . This is called DRY -DO NOT REPEAT YOURSELF 
			*/
	        
	        /*

			//next player turn
			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;     //ternary operator instead of if else 
			roundScore = 0;

			document.getElementById('current-0').textContent = '0';
			document.getElementById('current-1').textContent = '0';

			//now to change the active player interface we need to do changes , so we remove and add the active class of the HTML to the current player.
			
			//document.querySelector('.player-panel-0').classList.remove('active');        //classList is used for performing the actions on classes
			//document.querySelector('.player-panel-1').classList.add('active');           //add and remove 

			document.querySelector('.player-panel-0').classList.toggle('active');          //toggle 
			document.querySelector('.player-panel-1').classList.toggle('active');

			//when player hits one again hide the dice

			document.querySelector('.dice').style.display='none';

			*/


			nextPlayer();                //instead of writing the above code we use nextPlayer function
		}


  }
	

});

document.querySelector('.btn-hold').addEventListener('click',function (){
   if(gamePlaying)
   {
	   	//1. add current score to global score

		score[activePlayer]+=roundScore;

		//2.update the UI and add the score to the global score on hold press
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
		



		//3.Check if player won the game, we replace the name of the player with WINNER 
		if(score[activePlayer]>=20){
			document.querySelector('#player-' + activePlayer).textContent = 'Winner!!';
			document.querySelector('.dice').style.display='none';
			document.querySelector('.player-panel-' + activePlayer).classList.add('winner');
			document.querySelector('.player-panel-' + activePlayer).classList.remove('active');

			//set te gamePlaying to FALSE
			gamePlaying = false;

		}

		else{

			//next  player 
			nextPlayer();
		}
   }
	

});


/*
this function is repeated two times if instead of declaring an anonymous function two times in different events, 
we declared this function below and will use it from here . This is called DRY -DO NOT REPEAT YOURSELF 
*/

function nextPlayer() {


		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;     //ternary operator instead of if else 
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		//now to change the active player interface we need to do changes , so we remove and add the active class of the HTML to the current player.
		
		//document.querySelector('.player-panel-0').classList.remove('active');        //classList is used for performing the actions on classes
		//document.querySelector('.player-panel-1').classList.add('active');           //add and remove 

		document.querySelector('.player-panel-0').classList.toggle('active');          //toggle 
		document.querySelector('.player-panel-1').classList.toggle('active');

		//when player hits one again hide the dice

		document.querySelector('.dice').style.display='none';
	

}

document.querySelector('.btn-new').addEventListener('click',init);     //init function is used without paranthesis because we use it is as callback function  

function init()                     //initialise the game
{
	//same as the  start of the code

	score=[0,0];
	activePlayer=0;             
	roundScore=0;
	gamePlaying = true;

	document.querySelector('.dice').style.display ='none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	//change the names of the player back to player 1 and player 2

	document.getElementById('player-0').textContent='Player 1';
	document.getElementById('player-1').textContent='Player 2';


	//remove the winner and active classes for the beginning of the game
	document.querySelector('.player-panel-0').classList.remove('winner');
	document.querySelector('.player-panel-1').classList.remove('winner');
	document.querySelector('.player-panel-0').classList.remove('active');
	document.querySelector('.player-panel-1').classList.remove('active');

	//ADD the active class to player 1 
	document.querySelector('.player-panel-0').classList.add('active');

}









































































