/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : This is where to storage item type
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//
//  HALF POTION
//
//////////////////////////////////////////////////////////////////////////////
/**
 * @brief: Constructor
 * @author: 
 * @param: 
 * @return: 
 */
var HalfPotion = function (hero) {
	Item.call(this, "Half Potion", 17);

	this.ChangePriceBaseOn(hero);
}
/**
 * Inherit from parent
 */
HalfPotion.prototype = Object.create(Item.prototype);
HalfPotion.prototype.constructor = HalfPotion;

/**
 * @brief: 
 * @author: 
 * @param: 
 * @return: 
 */
HalfPotion.prototype.ChangePriceBaseOn = function (hero) {
	this.Price = Math.round((hero.HitPoint * this.BasePrice)/2);
}

/**
 * @brief: 
 * @author: 
 * @param: 
 * @return: 
 */
HalfPotion.prototype.BoughtAndUsedBy = function (hero) {
	// Call super
	isSuccess = Item.prototype.BoughtAndUsedBy.call(this, hero);
	if (isSuccess) {
		hero.getHeal(Math.round(hero.BaseHitPoint/2));
	}
	return isSuccess;
}