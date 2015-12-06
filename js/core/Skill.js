/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : Define SKILL class
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief: Constructor
 * @author: Tuan Nguyen
 * @param: name, skillType
 * @return: none
 */
var Skill = function (name, skillType) {
	this.Name = name;
	this.Type = skillType;
	
	if (skillType == BUFFSKILL) {
		this.TypeName = BUFFSKILLNAME;
	}
	else {
		this.TypeName = PASSSKILLNAME;
	}
}

/**
 * @brief: Use skill 
 * @author: Tuan Nguyen
 * @param: none 
 * @return: none 
 */
Skill.prototype.Use = function () {
	
}