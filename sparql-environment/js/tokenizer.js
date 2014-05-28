var tokenizer = {};
tokenizer.reservedWords = ["SELECT","WHERE","GROUP",""];
tokenizer.tokenize = function () {
	this.variables = [];
	this.tokens = this.queryString.split(' ');
	this.currentTokenIndex = 0;
	if (!this.matchQueryUnit()) {
		this.error('Error with Match Query');
	}
	this.inform(this.variables);
}
tokenizer.nextToken = function () {
	this.currentTokenIndex++;
	var token = this.tokens[this.currentTokenIndex];
	this.inform('nextToken: '+token+' ['+this.currentTokenIndex+']');
	return token;
}
tokenizer.currentToken = function () {
	var token = this.tokens[this.currentTokenIndex];
	this.inform('currentToken: '+token+' ['+this.currentTokenIndex+']');
	return token;
}
tokenizer.matchQueryUnit = function () {
	var token = this.currentToken();
	if (this.matchPrologue(token)) {
		token = this.nextToken();
	}
	
	if (!this.matchSelectQuery()) {
		//if (!this.matchConstructQuery(token)) {
		//	if (!this.matchDescribeQuery(token)) {
		//		if (!this.matchAskQuery(token)) {
					this.error('No select, construct, or describe, or ask');
					return false;
		//		}
		//	}
		//}
	}
}

tokenizer.matchPrologue = function (token) { //TO-DO Implement
	return false;
}

tokenizer.matchSelectQuery = function () {
	if (this.matchSelectClause()) {
		//TO-DO datasetClause
		if (this.matchWhereClause()) {
			
		}
		return true;
	}
	return false;
}
tokenizer.matchSubSelect = function () {
	//TO-DO 
	this.matchSelectQuery();
}

//'SELECT' ( 'DISTINCT' | 'REDUCED' )? ( ( Var | ( '(' Expression 'AS' Var ')' ) )+ | '*' )
tokenizer.matchSelectClause = function () {
	
	var token = this.currentToken();
	if (token == "SELECT") {
		this.inform('did match selectClause');
		token = this.nextToken();
		if (token == 'DISTINCT' || token == 'REDUCED') {
			token = this.nextToken();
		}
		
		if (token == '*') {
			return true;
		}
		var stillLookingAtVariables = true;
		var limit = 10;
		while (stillLookingAtVariables && limit > 0) {
			if (this.matchVar(token)) {
				this.inform('found variable: '+token);
				token = this.nextToken();
			} else if (token == '(') {
				token = this.nextToken();
				if (this.matchExpression(token)) {
					
				}
				token = this.nextToken();
				if (token != "AS") {
					this.error('No AS in SelectClause expression as variable')
					return;
				}
				token = this.nextToken();
				this.matchVar(token);
				token = this.nextToken();
				if (token != ")") {
					this.error('No Closing ) in expression as variable')
					return;
				}
				token = this.nextToken();
			} else {
				stillLookingAtVariables = false;
			}
			limit--;
		}
		return true;
	}
	return false;
}

tokenizer.matchWhereClause = function () {
	var token = this.currentToken();
	this.inform('matchWhereClause: '+token);
	if (token == "WHERE") {
		this.inform("In Where Clause");
		if (this.nextToken() == "{") {
			if (this.matchSubSelect() || this.matchGroupPatternSub()) {
				
			}
			if (this.nextToken() != "}") {
				this.error('No closing bracket in where clause');
			}
		}
		return true;
	}
	return false;
}

tokenizer.matchGroupPatternSub = function () {
	
}

tokenizer.matchVar = function (token) {
	var firstChar = token.charAt(0);
	if (firstChar == '?' || firstChar == '$') { //? ::= VAR1 , $ ::= VAR2
		this.variables.push(token);
		return true;
	}
	return false;
}

tokenizer.matchExpression = function (token) {
	//TO-DO
	return false;
	//Skip to ConditionOrExpression
	if (this.matchConditionalAndExpression(token)) {
		token = this.nextToken();
		var limit = 10;
		while (token == "||" && limit > 0) {
			token = this.nextToken();
			this.matchConditionalAndExpression(token);
			limit--;
		}
		return true;
	}
	return false;	
}
tokenizer.matchConditionalAndExpression = function (token) {
	return true;
}

tokenizer.error = function(message) {
	console.log('TOK ERR: '+message);
}
tokenizer.inform = function(message) {
	console.log('TOK INF: '+message);
}