/////////////////////////////////////////////////////////////////////////////
//
//  NGUYEN VAN MINH TUAN  @ AUTO RPG
//
//////////////////////////////////////////////////////////////////////////////
//
//  Description    : 
//
//////////////////////////////////////////////////////////////////////////////

/**
 * @brief 
 * @author
 * @param 
 * @return 
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
 * @brief 
 * @author
 * @param 
 * @return 
 */
Skill.prototype.Use = function () {
	
}