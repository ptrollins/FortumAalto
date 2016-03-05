angular.module('fortum')


    .controller('HomeCtrl', function ($scope, Apps, $stateParams, $cordovaGeolocation, $http, $cordovaFlashlight) {
        $scope.powerUsed = 10;
        var pieData = [
            {
                value: $scope.powerUsed,
                color:"#2EAF53"
            },
            {
                value : 100-$scope.powerUsed,
                color : "#97A2A2"
            }
        ];
        var myDoughnutChart = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(pieData,{percentageInnerCutout : 80});

        var isOn = false;
        $scope.lightIcon = 'img/off.png';
        $scope.lightOn = function (){
            window.plugins.flashlight.toggle();
            if (isOn) {
                isOn = false;
                $scope.lightIcon = 'img/off.png';
                $scope.powerUsed -= 10;
            }
            else {
                isOn = true;
                $scope.lightIcon = 'img/on.png';
                $scope.powerUsed += 10;
            }
            if ($scope.powerUsed <21){
                $scope.powerColor  = 'green';
            }else if ($scope.powerUsed >31){
                $scope.powerColor  = 'red';
            }
            else{
                $scope.powerColor  = 'yellow';
            }
            myDoughnutChart.segments[0].value = $scope.powerUsed;
            myDoughnutChart.update();
        };

        $scope.outletsUsed = 1;
        $scope.powerColor  = 'green';
        $scope.powerUp = function(){
            $scope.outletsUsed ++;
            $scope.powerUsed += 5;
            if ($scope.powerUsed <21){
                $scope.powerColor  = 'green';
            }else if ($scope.powerUsed >31){
                $scope.powerColor  = 'red';
            }
            else{
                $scope.powerColor  = 'yellow';
            }
            console.log($scope.powerUsed);
            myDoughnutChart.segments[0].value = $scope.powerUsed;
            myDoughnutChart.update();
        };

        var isOpen = false;
        $scope.windowIcon = 'img/close.png';
        $scope.windowOpen = function (){
            if (isOpen) {
                isOpen = false;
                $scope.windowIcon = 'img/close.png';
            }
            else {
                isOpen = true;
                $scope.windowIcon = 'img/open.png';
            }
        };

                $scope.thermo = 'img/thermo.png';
                $scope.dial = 'img/dial.png';
                $scope.outlet = 'img/green.png';


        windmill.init();

        $scope.calendar = Apps.getCalendar();

        //clientID: dj0yJmk9MDlOMEhEb0ZuVnRqJmQ9WVdrOWVYSkZUbTV6TjJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hNg--
        //client secret: 4f1ac092b9dd0d330dd607dbd3f658a1d16f8f08
        var temp = 0;
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;                                                       
                //change between metric and imperial for C or F
                var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=db13533861b4257bfc4d101bb252547e";
                console.log(weatherURL); 
                $http.get(weatherURL)
                    .then(function(result){
                        //weather = result;
                        temp = result.data.main.temp;
                        $scope.temp = temp - 273.15;
                    }, function(err) {
                        console.log(err);
                    });
            }, function(err) {
                console.log(err);
            });

        $scope.unittype = 'C';
        $scope.setTempUnit = function(){
            if ($scope.unittype == 'F'){
                $scope.unittype = 'C';
                $scope.temp = temp - 273.15;
            }else{
                $scope.unittype = 'F';
                $scope.temp = temp * 9/5 - 459.67;
            }
        };

    })

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
