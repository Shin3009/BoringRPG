/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Define class MONSTER inherited from CHARACTER
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: Constructor
 * @author: Tuan Nguyen 
 * @param: name, hitPoint, attackPoint, attackRate, expRelease, moneyRelease
 * @return: none
 */
var Monster = function (name, hitPoint, attackPoint, speed, expRelease, moneyRelease) {
	Character.call(this, name, hitPoint, attackPoint, speed);

	this.Skill = null;
	this.EXPRelease = expRelease;
	this.MoneyRelease = moneyRelease;
}
/**
 * Inherit from parent
 */
Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

/**
 * @brief: Event when monster is dead by hero
 * @author: Tuan Nguyen
 * @param: hero
 * @return: none
 */
Monster.prototype.DeadBy = function(hero) {
	hero.EXP += this.EXPRelease;
	hero.Money += this.MoneyRelease;
	hero.CheckEXP();
}