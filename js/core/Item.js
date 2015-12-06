/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Define class ITEM
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: Constructor
 * @author: Tuan Nguyen
 * @param: name, startBasePrice
 * @return: none
 */
var Item = function (name, startBasePrice) {
	this.Name = name;
	this.Price = startBasePrice;
	this.BasePrice = startBasePrice;
}

/**
 * @brief: Bought and use item
 * @author: Tuan Nguyen
 * @param: hero
 * @return: bool isSuccess
 */
Item.prototype.BoughtAndUsedBy = function (hero) {
	isSuccess = false;
	if (hero.Money >= this.Price) {
		hero.Money -= this.Price;
		isSuccess = true;
	}
	return isSuccess;
}