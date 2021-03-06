/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : This is where to storage hero class
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//
//  Below is bundle of normal monster
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: KNIGHT
 * @author: 
 * @param: 
 * @return: 
 */
var Knight = function (name) {
	Hero.call(
		this, 
		name, // name
		100, // hit point
		5, // attack point
		500 // speed
	);

	this.Class = "Knight";
}
/**
 * Inherit from parent
 */
Knight.prototype = Object.create(Hero.prototype);
Knight.prototype.constructor = Knight;

/**
 * @brief 
 * @author
 * @param 
 * @return 
 */
Knight.prototype.LevelUp = function () {
 	Hero.prototype.LevelUp.apply(this);
 	this.BaseHitPoint += (this.Level*5);
 	this.AttackPoint += (this.Level*2);
 	//@REMEMBER: Restore Hit Point
 	this.RestoreHitPoint();
}