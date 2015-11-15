/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Define CHARACTER class for MONSTER and HERO inherit
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: Constructor
 * @author: Tuan Nguyen
 * @param: name, hitPoint, attackPoint, attackRate
 * @return: none
 */
var Character = function (name, hitPoint, attackPoint, speed) {
	this.Name = name;
	this.BaseHitPoint = hitPoint;
	this.HitPoint = hitPoint;
	this.HitPointPercent = 100;
	this.AttackPoint = attackPoint;
	this.Speed = speed;
	this.Status = null;
	this.StatusDuration = 0;
	this.StatusBaseDuration = 0;
	this.StatusDurationPercent = 0;
	this.BasicSkill = null;
	this.Level = 1;
	this.ActionRate = undefined;
};

/**
 * @brief: Heal character HitPoint with number of healPoint
 * @author: Tuan Nguyen
 * @param: healPoint
 * @return: none
 */
Character.prototype.getHeal = function (healPoint) {
	this.HitPoint += healPoint;
	if (this.HitPoint > this.BaseHitPoint) {
		this.HitPoint = this.BaseHitPoint;
	}
	this.HitPointPercent = (this.HitPoint*100)/this.BaseHitPoint;
};

/**
 * @brief: Character get damage with number of damagePoint
 * @author: Tuan Nguyen
 * @param: damagePoint
 * @return: none
 */
Character.prototype.getDamage = function (damagePoint) {
	this.HitPoint -= damagePoint;
	if (this.HitPoint < 0) {
		this.HitPoint = 0;
	}
	this.HitPointPercent = (this.HitPoint*100)/this.BaseHitPoint;
};

/**
 * @brief: Deal a damage to another character with current charater AttackPoint
 * @author: Tuan Nguyen
 * @param: character
 * @return: none
 */
Character.prototype.Attack = function (character) {
	character.getDamage(this.AttackPoint);
};

/**
 * @brief 
 * @author
 * @param 
 * @return 
 */
Character.prototype.getStatus = function (type, duration) {
	this.Status = type;
	this.StatusBaseDuration = this.StatusDuration = duration;
	this.StatusDurationPercent = 100;
};

/**
 * @brief 
 * @author
 * @param 
 * @return 
 */
Character.prototype.reduceStatusDuration = function () {
	this.StatusDuration --;
	this.StatusDurationPercent = (this.StatusDuration*100)/this.StatusBaseDuration;
};