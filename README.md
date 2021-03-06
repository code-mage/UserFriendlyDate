﻿### UserFriendlyDate


#### Functionality
Given a Date Object, this can return a user friendly way of viewing the date as follows

1. In the Future
2. Tomorrow
3. Today
4. Yesterday
5. {x} days ago
6. {x} months ago
7. {x} years ago

The function takes into account if the time provided was given in UTC or in the current timeZone

#### To Come
In the future, I plan to add functionalities like

1. Just now
2. {x} minutes ago
3. {x} hours ago

#### How to use - 
```javascript
var date = new Date();
date.getUserFriendlyDate();
```

If the date you have is in localTime instead of UTC time, use this
```javascript
var date = new Date();
date.getUserFriendlyDate(true);
```

#### Samples - 
There is a list of tests that cover this functionality in detail. Feel free to go over them.
timeDiff.test.ts will cover basic functionality of the value returned. The Helper methos is exposed if you want to utilize it.
timezone.test.ts will cover other extensions, like providing time in UTC format, checking the functionaility against the current Time and directly testing the extension on the Date interface.
