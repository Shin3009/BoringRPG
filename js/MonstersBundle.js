/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : This is where to storage monster type
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//
//  Below is bundle of normal monster
//
//////////////////////////////////////////////////////////////////////////////

//=================================================
//	RAT
//==================================================
/**
 * @brief: Constructor
 * @author: 
 * @param: 
 * @return: 
 */
var Rat = function (level) {
	Monster.call(
		this, 
		"Rat", // name
		Math.round(level*0.5*50), // hit point
		Math.round(level*1.5), // attack point
		Math.round(500), // speed
		Math.round(level*2.5), // exp gain
		Math.round(level*100) // money gain
	);
	this.Level = level
	this.Skill = null;
}
/**
 * Inherit from parent
 */
Rat.prototype = Object.create(Monster.prototype);
Rat.prototype.constructor = Rat;

//=================================================
//	GOLBIN
//==================================================
/**
 * @brief: Constructor
 * @author: 
 * @param: 
 * @return: 
 */
var Golbin = function (level) {
	Monster.call(
		this, 
		"Golbin", // name
		Math.round(level*0.5*20), // hit point
		Math.round(level*2), // attack point
		Math.round(level*1.5), // speed
		Math.round(level*2.5), // exp gain
		Math.round(level*100) // money gain
	);
	this.Level = level
	this.Skill = null;
}
/**
 * Inherit from parent
 */
Golbin.prototype = Object.create(Monster.prototype);
Golbin.prototype.constructor = Golbin;


//////////////////////////////////////////////////////////////////////////////
//
//  Below is bundle of special monster
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//
//  Below is bundle of BOSS
//
//////////////////////////////////////////////////////////////////////////////