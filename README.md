# angular-elevator

angular-elevator is an AngularJs directive that enables us to interact with Elevator.js easily.

# How to use it

Include Elevator.js script in your HTML file.
Include angular-elevator also in your HTML file.

```html
<!doctype html>
<html lang="en" ng-app="demoapp">
<head>
  <title>Angular Elevator Js Test</title>
  <link rel="stylesheet" type="text/css" href="css/angular-elevator.css">

  <script src="vendor/angular/angular.min.js"></script>
  <script src="js/elevator.js"></script>
</head>
<body>
</body>
</html>
```

Include the angular-elevator directive dependency on your angular module:

```javascript
var app = angular.module("demoapp", ["ngElevator"]);
```

Finally, you must include the markup directive on your HTML page as an Element, like this:

```html
<elevator></elevator>
```

Or as an attribute:

```html
<div elevator>
```
