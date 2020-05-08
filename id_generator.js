//
exports.createId = (idType, date, extraStringLength, extraStringType) => {
  		//define default options for id
  		var idOptions = [false, null, 8, 'fullAlphabetNumbers'];
  		//use value from args if are
      if (idType && typeof idType === 'string')
      {
      	idOptions[0] = idType;
      }
      if (date && date instanceof Date && !isNaN(date.valueOf()))
      {
      	idOptions[1] = date;
      }
      if (extraStringLength && typeof extraStringLength === 'number')
      {
      	idOptions[2] = extraStringLength;
      }
      if (extraStringType && typeof extraStringType === 'string')
      {
      	idOptions[3] = extraStringType;
      }
      return idGeneratorUtility.stringMixer(idOptions[0], idGeneratorUtility.getDateTimeObject(idOptions[1]), idGeneratorUtility.createNewString(idOptions[2], idOptions[3]));
  }

var idGeneratorUtility = {
	//create string of randoms with requested length and content type returned string
	createNewString: (customStringLength, typeOfReturnedString) => {
	//default value if no args or set if exist
	var stringOptions = {type: 'fullAlphabetNumbers', length: 5}
	if (typeOfReturnedString)
	{
	  stringOptions = {...stringOptions, type: typeOfReturnedString}
	}
	if (customStringLength)
	{
	  stringOptions = {...stringOptions, length: customStringLength}
	}
	//define new string based on collection and do randomizing process til the random string length equal to required
	var stringSeries = new String(idGeneratorUtility.defineStringCollection(stringOptions.type)),
	    stringLength = stringSeries.length,
	    randomizedString = String(),
	    randomizedStringLength = stringOptions.length;

	for(var i = 0; i<randomizedStringLength; i++) 
	{
	  var rand = Math.floor(Math.random()*stringLength);      
	  randomizedString += stringSeries[rand];
	};    
	return randomizedString;
	},
	//function return one of string collection
	  defineStringCollection: (type) =>{            
	    var stringCollections = {
	        lowerCaseAlphabet: 'abcdefghijklmnoprstuwxyz',
	        upperCaseAlphabet: 'ABCDEFGHIJKLMNOPRSTUWXYZ',
	        lowerCaseAlphabetNumbers: 'abcdefghijklmnoprstuwxyz0123456789',
	        upperCaseAlphabetNumbers: 'ABCDEFGHIJKLMNOPRSTUWXYZ0123456789',
	        fullAlphabet: 'abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ',
	        fullAlphabetNumbers: 'abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789',
	        numbers: '0123456789',
	        symbols: '.,!?-=+@#$%^&*()_',
	        numbersSymbols: '0123456789.,!?-=+@#$%^&*()_',
	        all: 'abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789.,!?-=+@#$%^&*()_'
	    };
	    //for requested type return one of stringCollection 
	    if (type && typeof type === "string")
	    {
	      let tempString = '';
	      for (let [key, value] of Object.entries(stringCollections)) {
	        if(key === type)
	        {
	          tempString = value;
	          return tempString;
	        }
	      }
	      //in situation when type is wrong return default fullAlphabetNumbers collection
	      if (tempString === '')
	      {
	        tempString = stringCollections.fullAlphabetNumbers;
	        return tempString;
	      }   
	    }
	  },
	  //
	  stringMixer: (idType, dateObject, extraString) =>
	  {
	  	//predefine prefixes for id
			const prefix = {
				message: 'm_',
				booking: 'b_',
				user: 'u_'
	  	};  
	  	var mixedString = '';
	  	if (idType)
	  	{
	  		for (let [key, value] of Object.entries(prefix)) {
	        if(key === idType)
	        {
	      		//add prefix if id type belong to {prefix} 
	          mixedString += value; 
	        }
	  		}
	  	}
	  	//when during id creating are date do part of id based on date time values
	    if (typeof dateObject === 'object')
	    {
	      for (let [key, value] of Object.entries(dateObject)) {
	        if(key === 'year')
	        {
	      		//take only last two digit from year value
	          let tempValue = String(value);
	          mixedString += tempValue.slice(2);  
	        }
	        else
	        {
	        	//leave the seconds use rest
	          if (key === 'month' || key === 'day' || key === 'hour' || key === 'minute')
	          {
	              mixedString += value;
	          }
	        }                    
	      }
	    }
	    mixedString += extraString;
	    return (mixedString);
	},
	//generate object of string for date value 
	getDateTimeObject: (date) =>
	{
	  if (date instanceof Date && !isNaN(date.valueOf()))
	  {
	      let hour = date.getHours();
	      hour = (hour < 10 ? "0" : "") + hour;

	      let minute = date.getMinutes();
	      minute = (minute < 10 ? "0" : "") + minute;

	      let second = date.getSeconds();
	      second = (second < 10 ? "0" : "") + second;

	      let year = date.getFullYear();

	      let month = date.getMonth() + 1;
	      month = (month < 10 ? "0" : "") + month;

	      let day = date.getDate();
	      day = (day < 10 ? "0" : "") + day;

	      let dateObject = {year, month, day, hour, minute, second}
	      return dateObject;
	  }
	  else
	  {
	     return false;
	  }
	},
}
