# angular-elevator

angular-elevator is an AngularJs directive that enables us to interact with Elevator.js easily.

# How to use it

Include Elevator.js script in your HTML file.

```
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

```
var app = angular.module("demoapp", ["ngElevator"]);
```

Finally, you must include the markup directive on your HTML page as an Element, like this:

```
<elevator></elevator>
```

Or as an attribute:

```
<div elevator>
```
