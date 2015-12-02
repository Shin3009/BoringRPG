/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Main game @ POWERED BY ANGULAR JS
//
//////////////////////////////////////////////////////////////////////////////

(function(){
	var isAutoHit = false;
	var monsterLevel = 1;
	var isStop = false;
	var firstStart = true;
	
	var gameApp = angular.module('gamePlay', ['ngAnimate']);

	gameApp.controller('GameController', function ($scope, $interval, $animate, $timeout) {
		//////////////////////////////////////////////////////////////////////////////
		//
		//  DEFINE VARIABLE
		//
		//////////////////////////////////////////////////////////////////////////////
		
		var gameTime;
		var animAttack, animReverseAttack, compareFirst, compareSecond, compare, firstMonster, secondMonster;
		var TimeOutSlot = [];
		var flag = 0;
		var newTurn = 1;
		var numberOfCharacter = 3;

		//Display button
		$scope.StopGameDis = false;
		$scope.HitMonsterDis = false;
		$scope.SpawMonsterDis = false;
		$scope.FightDis = true;

		$scope.turnPos = 0;
		$scope.flag = 0;
		$scope.newTurn = 1;
		$scope.count = 0;
		$scope.monsterIndex = 0;
		$scope.choseMonsterID = 0;
		$scope.waitingForUser = 0;

		$scope.TurnSlotManage = [0,0,0,0];
		$scope.errorLog = null;
		$scope.gameStage = 1;
		$scope.monstersPool = [];
		$scope.spawnRemaining = 10;
		$scope.hero = new Knight('Shin');
		$scope.potion = new HalfPotion($scope.hero);

		//////////////////////////////////////////////////////////////////////////////
		//
		//  ACTION FUNCTION
		//
		//////////////////////////////////////////////////////////////////////////////
		/**
		 * @brief: Buy poition to heal Hero hit point
		 * @author: Tuan Nguyen
		 * @param: type
		 * @return: none
		 */
		$scope.buyPotion = function (type) {
			isSuccess = $scope.potion.BoughtAndUsedBy($scope.hero);
			if (!isSuccess) {
				$scope.errorLog = "You don't have enought money !";
			}
		};

		/**
		 * @brief: Buy poition to heal Hero hit point
		 * @author: Tuan Nguyen
		 * @param: type
		 * @return: none
		 */
		$scope.choseMonster = function (key) {
		 	$scope.choseMonsterID = key;
		 	$scope.hitSelectedMonster(key);
		 	$scope.waitingForUser = 1;
		}

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.stopGame = function () {
			isStop = true;
			$scope.changeStagePause();
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.startFight = function () {
			isStop = false;
			if (firstStart) {
				$scope.spawnMonster();
				$scope.spawnMonster();
				$scope.spawnMonster();
				firstStart = false;
			}
			TimeOutSlot = [];
			TimeOutSlot.push($scope.monstersPool[1]);
			TimeOutSlot.push($scope.hero);
			TimeOutSlot.push($scope.monstersPool[0]);
			TimeOutSlot.push($scope.monstersPool[2]);
			numberOfCharacter = 3;

			console.log(TimeOutSlot);

			if (angular.isDefined(gameTime)) {
				return;
			}
			// $scope.gameMainLoop();
			gameTime = $interval (function () {
				$scope.gameMainLoop();
			}, 100);
		};

		//////////////////////////////////////////////////////////////////////////////
		//
		//  CHECKING FUNCTION
		//
		//////////////////////////////////////////////////////////////////////////////
		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.checkDeadMonster = function (monster) {
			if (isStop) {
				return;
			}
			if (monster.HitPoint <= 0) {
				tempHeroLevel = $scope.hero.Level;
				monster.DeadBy($scope.hero);
				deadMonster = $scope.monstersPool.pop();
				$scope.stopMonsterInterval(deadMonster);
				delete deadMonster;
				if ($scope.hero.Level > tempHeroLevel) {
					$scope.heroIsLevelUp();
				}

			}
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.checkDeadMonsters = function () {
			if (isStop) {
				return;
			}
			angular.forEach($scope.monstersPool, function (monster, key) {
				if (monster.HitPoint <= 0) {
					var monsterIndexInSlot = TimeOutSlot.indexOf(monster);
					tempHeroLevel = $scope.hero.Level;
					monster.DeadBy($scope.hero);
					deadMonster = $scope.monstersPool.splice(key, 1);
					
					delete deadMonster;
					TimeOutSlot.splice(monsterIndexInSlot, 1);
					numberOfCharacter--;

					if ($scope.hero.Level > tempHeroLevel) {
						$scope.heroIsLevelUp();
					}
				}
			});
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.checkDeadHero = function () {
			if (isStop) {
				return;
			}
			if ($scope.hero.HitPoint <= 0) {
				$scope.stopGame();
			}
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.heroIsLevelUp = function () {
			if (isStop) {
				return;
			}
			$scope.potion.ChangePriceBaseOn($scope.hero);
		};

		//////////////////////////////////////////////////////////////////////////////
		//
		//  AUTO RUN FUNCTION
		//
		//////////////////////////////////////////////////////////////////////////////
		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.spawnMonster = function () {
			if (isStop) {
				return;
			}
			monster = new Rat(monsterLevel);
			$scope.monstersPool.push(monster);
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.hitMonster = function () {
			if (isStop) {
				return;
			}
			if ($scope.monstersPool.length > 0) {
				monster = $scope.monstersPool[0];
				$scope.animateAttack();
				$scope.hero.Attack(monster);
				$scope.checkDeadMonsters(monster);
				if ($scope.monstersPool.length <= 0) {
					$scope.gameStage ++;
					if ($scope.gameStage%5 == 0) {
						monsterLevel ++;
					}
					$scope.spawnMonster();
					$scope.spawnMonster();
					$scope.spawnMonster();

					$scope.stopGame();
				}
			}
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.hitSelectedMonster = function (monsterKeyIndex) {
			monster = $scope.monstersPool[monsterKeyIndex];
			$scope.animateSelectAttack(monsterKeyIndex);
			$scope.hero.Attack(monster);
			$scope.checkDeadMonsters(monster);
			if ($scope.monstersPool.length <= 0) {
				$scope.gameStage ++;
				if ($scope.gameStage%5 == 0) {
					monsterLevel ++;
				}
				$scope.spawnMonster();
				$scope.spawnMonster();
				$scope.spawnMonster();

				$scope.stopGame();
			}
		};
		
		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.animateAttack = function () {
			if (isStop) {
				return;
			}
			var character = angular.element(document.querySelector('#characterID'));
			var monster = angular.element(document.querySelector('#monster0'));
			$animate.addClass(character, 'attack', function() {
				$animate.removeClass(character, 'attack');
			});
			animAttack = $timeout (function() {
				$animate.addClass(monster, 'shake', function() {
					$animate.removeClass(monster, 'shake');
				});
			}, 200);
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.animateSelectAttack = function (monsterKeyIndex) {
			var character = angular.element(document.querySelector('#characterID'));
			var monsterID = '#monster' + monsterKeyIndex;
			var monster = angular.element(document.querySelector(monsterID));
			$animate.addClass(character, 'attack', function() {
				$animate.removeClass(character, 'attack');
			});
			animAttack = $timeout (function() {
				$animate.addClass(monster, 'shake', function() {
					$animate.removeClass(monster, 'shake');
				});
			}, 200);
		};
		
		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.animateReverseAttack = function (eleMonster) {
			if (isStop) {
				return;
			}
			var character = angular.element(document.querySelector('#characterID'));
			
			$animate.addClass(eleMonster, 'reverseAttack', function() {
				$animate.removeClass(eleMonster, 'reverseAttack');
			});
			animReverseAttack = $timeout (function() {
				$animate.addClass(character, 'shake', function() {
					$animate.removeClass(character, 'shake');
				});
			}, 200);
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.getHitFrom = function (monster, monsterIndex) {
			if (isStop) {
				return;
			}
			eleMonster = angular.element(document.querySelector('#monster' + monsterIndex));
			$scope.animateReverseAttack(eleMonster);
			monster.Attack($scope.hero);
			$scope.checkDeadHero();
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.compareSpeed = function (monster, monsterIndex) {
			if (isStop) {
				return;
			}
			if ($scope.hero.Speed >= monster.Speed) {
				$scope.hitMonster();
				compareFirst = $timeout (function() {
					$scope.getHitFrom(monster, monsterIndex);
				}, 700);
			}
			else {
				$scope.getHitFrom(monster, monsterIndex);
				compareSecond = $timeout (function() {
					$scope.hitMonster();
				}, 700);
			}
		};

		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.changeStagePause = function () {
			if (angular.isDefined(gameTime)) {
				$interval.cancel(gameTime);
				gameTime = undefined;
			}
			if (angular.isDefined(animAttack)) {
				$interval.cancel(animAttack);
				animAttack = undefined;
			}
			if (angular.isDefined(animReverseAttack)) {
				$interval.cancel(animReverseAttack);
				animReverseAttack = undefined;
			}
			if (angular.isDefined(compareFirst)) {
				$interval.cancel(compareFirst);
				compareFirst = undefined;
			}
			if (angular.isDefined(compareSecond)) {
				$interval.cancel(compareSecond);
				compareSecond = undefined;
			}
			if (angular.isDefined(compare)) {
				$interval.cancel(compare);
				compare = undefined;
			}
			if (angular.isDefined(firstMonster)) {
				$interval.cancel(firstMonster);
				firstMonster = undefined;
			}
			if (angular.isDefined(secondMonster)) {
				$interval.cancel(secondMonster);
				secondMonster = undefined;
			}
		};

		//////////////////////////////////////////////////////////////////////////////
		//
		//  MAIN FUNCTION
		//
		//////////////////////////////////////////////////////////////////////////////
		/**
		 * @brief 
		 * @author
		 * @param 
		 * @return 
		 */
		$scope.gameMainLoop = function () {
			if ($scope.newTurn == 1) {
				$scope.TurnSlotManage[$scope.turnPos] = 1;
				$scope.newTurn = 0;
			}

			if ($scope.TurnSlotManage[$scope.turnPos]) {
				$scope.flag = 1;
				if (TimeOutSlot[$scope.turnPos] instanceof Monster) {
					TimeOutSlot[$scope.turnPos].TimeOut = $timeout(function() {
						if (TimeOutSlot[$scope.turnPos] instanceof Monster) {
							var monsterIndex = $scope.monstersPool.indexOf(TimeOutSlot[$scope.turnPos]);
							$scope.monsterIndex = monsterIndex;
							$scope.getHitFrom(TimeOutSlot[$scope.turnPos], monsterIndex);
						}
						else {
							$scope.hitMonster();
						}
						$scope.flag = 0;
					}, 1000);
					$scope.TurnSlotManage[$scope.turnPos] = 0;
				}
				else {
					if ($scope.waitingForUser) {
						TimeOutSlot[$scope.turnPos].TimeOut = $timeout(function() {
							$scope.flag = 0;
						}, 200);
						$scope.TurnSlotManage[$scope.turnPos] = 0;
						$scope.waitingForUser = 0;
					}
				}
			}
			if ($scope.flag == 0) {
				$scope.turnPos ++;
				$scope.newTurn = 1;
				if ($scope.turnPos > numberOfCharacter) {
					$scope.turnPos = 0;
				}
			}
			$scope.count ++;
		};


		//Stop game interval when destroy angular
		$scope.$on('$destroy', function() {
			$scope.stopGame();
		});
	});
})();