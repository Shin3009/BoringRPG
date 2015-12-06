/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Define class HERO inherited from CHARACTER
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: Constructor
 * @author: Tuan Nguyen
 * @param: name, hitPoint, attackPoint, attackRate
 * @return: none
 */
var Hero = function (name, hitPoint, speed, attackRate) {
	Character.call(this, name, hitPoint, speed, attackRate);
	
	this.EXP = 0;
	this.Money = 0;
	this.EXPNeedToLevelUp = 10;
	this.Skill_1 = null;
	this.Skill_2 = null;
	this.Skill_3 = null;
	this.Skill_4 = null;
}
/**
 * Inherit from parent
 */
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

/**
 * @brief: Check EXP when hero gain EXP from monster
 * @author: Tuan Nguyen
 * @param: none
 * @return: none
 */
Hero.prototype.CheckEXP = function () {
	if (this.EXP >= this.EXPNeedToLevelUp) {
		this.EXP -= this.EXPNeedToLevelUp;
		this.LevelUp();
	}
}

/**
 * @brief: Event level up of hero
 * @author: Tuan Nguyen
 * @param: none
 * @return: none
 */
Hero.prototype.LevelUp = function () {
	this.Level ++;
	this.EXPNeedToLevelUp = 10*this.Level*1.5;
}

/**
 * @brief: Restore full Hit Point
 * @author: Tuan Nguyen
 * @param: none
 * @return: none
 */
Hero.prototype.RestoreHitPoint = function () {
	this.getHeal(this.BaseHitPoint);
}

/**
 * @brief: Use skill
 * @author
 * @param 
 * @return 
 */
Hero.prototype.UseSkillTo = function () {
	
}