# Node.js id-generator

Id generator module. Ready to use as a part of REST API for simple booking systems and temp id create.

## Getting Started


```
const idGenerator = require('./id-generator.js');

idGenerator.createId(idType, date, extraStringLength, extraStringType);
```

where

* idType = String 

```
['user', 'booking', 'message'] for prefix 'u_', 'b_', 'm_'

false for id without prefix
```


* date = Date 
```
used for create id based on date

false for id base only on extraString
```


* extraStringLength = Number
```
define length of generated extraString

0 or false for default = 8
```


* extraStringType = String
```
define collection name based on extraString is generate

['lowerCaseAlphabet', 'upperCaseAlphabet', 'lowerCaseAlphabetNumbers', 
'upperCaseAlphabetNumbers', 'fullAlphabet', 'fullAlphabetNumbers', 
'numbers', 'symbols']

false for default = fullAlphabetNumbers

```

## Examples

```
idType: false,
date: Fri May 08 2020 17:31:53 GMT+0200 (GMT+02:00),
extraStringLength: 4,
extraStringType: upperCaseAlphabetNumbers

output: 2005081731T28I
```

```
idType: booking,
date: Fri May 08 2020 17:31:53 GMT+0200 (GMT+02:00),
extraStringLength: 4,
extraStringType: numbers

output: b_20050817317089
```

```
idType: message,
date: Fri May 08 2020 17:31:53 GMT+0200 (GMT+02:00),
extraStringLength: 0, //0 or false generate extraString with default length = 8
extraStringType: numbers

output: m_200508173102165403
```

```
idType: booking,
date: false,
extraStringLength: 0,
extraStringType: fullAlphabet

output: b_hgRdbNiH
```

```
idType: false,
date: false,
extraStringLength: 0,
extraStringType: numbers

output: 09616981
```


## Author

* **Damian Laskowski** - [ddlaskowski](https://github.com/ddlaskowski)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

