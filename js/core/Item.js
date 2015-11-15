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
 * @brief 
 * @author
 * @param 
 * @return 
 */
var Item = function (name, startBasePrice) {
	this.Name = name;
	this.Price = startBasePrice;
	this.BasePrice = startBasePrice;
}

/**
 * @brief 
 * @author
 * @param 
 * @return 
 */
Item.prototype.BoughtAndUsedBy = function (hero) {
	isSuccess = false;
	if (hero.Money >= this.Price) {
		hero.Money -= this.Price;
		isSuccess = true;
	}
	return isSuccess;
}