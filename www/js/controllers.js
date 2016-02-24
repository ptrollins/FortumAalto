angular.module('fortum')


    .controller('HomeCtrl', function ($scope, Apps, $stateParams, $cordovaGeolocation, $http) {
        var isOn = false;
        $scope.lightIcon = 'off';
        $scope.lightbutton = 'darkgray';
        $scope.lightOn = function (){
                if (isOn) {
                    isOn = false;
                    $scope.lightbutton = 'darkgray';
                    $scope.lightIcon = 'off';
                }
                else {
                    isOn = true;
                    $scope.lightbutton = 'yellow';
                    $scope.lightIcon = 'on';
                }
        };

        var isOpen = false;
        $scope.windowIcon = 'close';
        $scope.windowbutton = 'darkgray';
        $scope.windowOpen = function (){
            if (isOpen) {
                isOpen = false;
                $scope.windowbutton = 'green';
                $scope.windowIcon = 'close';
            }
            else {
                isOpen = true;
                $scope.windowbutton = 'red';
                $scope.windowIcon = 'open';
            }
        };

        windmill.init();

        $scope.calendar = Apps.getCalendar();

        //clientID: dj0yJmk9MDlOMEhEb0ZuVnRqJmQ9WVdrOWVYSkZUbTV6TjJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1hNg--
        //client secret: 4f1ac092b9dd0d330dd607dbd3f658a1d16f8f08
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=db13533861b4257bfc4d101bb252547e";
                console.log(weatherURL);
                $http.get(weatherURL)
                    .then(function(result){
                        //weather = result;
                        $scope.temp = result.data.main.temp;
                        console.log($scope.temp);
                    }, function(err) {
                        console.log(err);
                    });
            }, function(err) {
                console.log(err);
            });

        //var data = [
        //    {
        //        value: 300,
        //        color:"#F7464A",
        //        highlight: "#FF5A5E",
        //        label: "Red"
        //    }];
        //var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);
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
