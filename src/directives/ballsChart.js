angular.module('Dashboard').directive("ball", function() {
    return {
      restrict: 'E',
      scope: {
        value: '=',
        radio: '=',
        width: '=',
        height: '=',
        red: '='
      },
      template: "<canvas id='canvas' width='size.width' height='size.height'/>",
      link: function(scope, element, attrs) {
        scope.canvas = element.find('canvas')[0];
        scope.ctx = scope.canvas.getContext('2d');
  
        scope.canvas.width = scope.width;
        scope.canvas.height = scope.height;
        var ctx = scope.ctx;
        var radius = scope.radio;
        var redAlliance = scope.red;
  
        scope.size = {
          width: scope.width,
          height: scope.height
        };
  
        var width = scope.canvas.offsetWidth;
        var height = scope.canvas.offsetHeight;
        var centerX = width / 2;
        var centerY = height / 2;
  
        var onCell = '#97ae97';

        var onRobot = ctx.createRadialGradient(centerX-5, centerY-3, radius/8, centerX, centerY, radius);
        if(redAlliance){
          onRobot.addColorStop(0, '#ec0000');
          onRobot.addColorStop(1, '#b30909');
        }else{
          onRobot.addColorStop(0, '#302de6');
          onRobot.addColorStop(1, '#2220ab');
        }
        
        var without = ctx.createRadialGradient(centerX-5, centerY-3, radius/8, centerX, centerY, radius);
        without.addColorStop(0, '#EBEBEB');
        without.addColorStop(1, '#484848');
  
        function drawBall(value) {
          ctx.clearRect(0, 0, width, height);
            onCell = value ? onRobot : without;
            
            ctx.strokeStyle = ctx.fillStyle = onCell;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            if(!value){
              ctx.strokeStyle = ctx.fillStyle = 'rgba(0,0,0,0.2)';

              ctx.beginPath();
              ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
              ctx.fill();
              ctx.stroke();
            }

        }

        scope.$watch('value', function(newValue) {
          drawBall(newValue);
        });
      }
    };
  });
  