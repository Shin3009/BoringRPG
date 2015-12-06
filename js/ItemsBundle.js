/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : This is where to storage item type
//
//////////////////////////////////////////////////////////////////////////////

//==================================================
//	HALF POITION
//==================================================
/**
 * @brief: Constructor
 * @author: Tuan Nguyen
 * @param: Hero hero
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
 * @brief: Change price of poition base on her HP
 * @author: Tuan Nguyen
 * @param: Hero hero
 * @return: none
 */
HalfPotion.prototype.ChangePriceBaseOn = function (hero) {
	this.Price = Math.round((hero.HitPoint * this.BasePrice)/2);
}

/**
 * @brief: Inherit and overload from class Item
 * @author: Tuan Nguyen
 * @param: Hero hero
 * @return: none
 */
HalfPotion.prototype.BoughtAndUsedBy = function (hero) {
	// Call super
	isSuccess = Item.prototype.BoughtAndUsedBy.call(this, hero);
	if (isSuccess) {
		hero.getHeal(Math.round(hero.BaseHitPoint/2));
	}
	return isSuccess;
}