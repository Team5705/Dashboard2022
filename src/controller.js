/* ONLY FOR TESTING *

app.controller("sendAuto", ["$scope", function ($scope) {
    $scope.autoState = false;
    $scope.updateA = function () {
      if (!NetworkTables.isRobotConnected()) {
        alert('Error: Robot is not connected!');
        return;
      }
      $scope.autoState = !$scope.autoState;
      NetworkTables.putValue("/data/autoState", $scope.autoState);
      console.log("Auto state: " + $scope.autoState);
    };
  },
]);

/* END ONLY FOR TESTING */

/* FMS INFO */
NetworkTables.addKeyListener("/FMSInfo/EventName", (key, value) => {
  scp.updateService.onValueChanged("fms/eventName", value);
  scp.$apply();
});
NetworkTables.addKeyListener("/FMSInfo/IsRedAlliance", (key, value) => {
  scp.updateService.onValueChanged("fms/isRedAlliance", value);
  scp.$apply();
});
NetworkTables.addKeyListener("/FMSInfo/MarchNumber", (key, value) => {
  scp.updateService.onValueChanged("fms/matchNumber", value);
  scp.$apply();
});
NetworkTables.addKeyListener("/FMSInfo/StationNumber", (key, value) => {
  scp.updateService.onValueChanged("fms/stationNumber", value);
  scp.$apply();
});



// Key Listeners

/* Streams */

NetworkTables.addKeyListener("/CameraPublisher/limelight/streams", (key, value) => {
    var stream = value[0].replace("mjpg:","");

    console.log(stream);

    scp.updateService.onValueChanged("cameras/limelight", stream);
    scp.$apply();

    updateCameras(scp);
  }
);

  NetworkTables.addKeyListener("/CameraPublisher/USB Camera 0/streams", (key, value) => {
      var stream = value[1].replace("mjpg:","");

      console.log(stream);
  
      scp.updateService.onValueChanged("cameras/usb", stream);
      scp.$apply();

      updateCameras(scp);
      updateCameras(scp);
    }
  );
  

/* Vision */
// NetworkTables.addKeyListener("/limelight/camMode", (key, value) => {
//   scp.updateService.onValueChanged("vision/camMode", roundVal(value));
//   scp.$apply();
//   console.log("Cam mode: " + value);
// });
NetworkTables.addKeyListener("/SmartDashboard/tX", (key, value) => {
  scp.updateService.onValueChanged("vision/x", roundVal(value));
  scp.$apply();
});
NetworkTables.addKeyListener("/SmartDashboard/tY", (key, value) => {
  scp.updateService.onValueChanged("vision/y", roundVal(value));
  scp.$apply();
});
NetworkTables.addKeyListener("/SmartDashboard/Area", (key, value) => {
  scp.updateService.onValueChanged("vision/area", roundVal(value));
  scp.$apply();
});
NetworkTables.addKeyListener("/SmartDashboard/Distance", (key, value) => {
  scp.updateService.onValueChanged("vision/xDistance", roundVal(value));
  scp.$apply();
});
NetworkTables.addKeyListener("/SmartDashboard/targetVisible", (key, value) => {
  scp.updateService.onValueChanged("vision/targetVisible", value);
  scp.$apply();
});
  
/* Automodes */
  
  NetworkTables.addKeyListener( "/SmartDashboard/autoMode/options", (key, value) => {
      console.log(value);
      scp.updateService.onValueChanged("autoMode/availableModes", value);
      scp.$apply();
    }
  );
  
  /* Shooter */
  NetworkTables.addKeyListener("/SmartDashboard/shooterSpeed", (key,value) => {
    scp.updateService.onValueChanged('motors/shooterSpeed', roundVal(value));
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/hoodAngle", (key, value) => {
    scp.updateService.onValueChanged("sensors/hoodAngle", value);
    scp.$apply();
  });

  /* Conveyor */
  NetworkTables.addKeyListener("/SmartDashboard/conveyorSpeed", (key,value) => {
    scp.updateService.onValueChanged('motors/conveyorSpeed', roundVal(value));
    scp.$apply();
  });

  /* Intake */
  NetworkTables.addKeyListener("/SmartDashboard/intakeDeployed", (key, value) => {
    scp.updateService.onValueChanged("pneumatics/intake", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/intakeSpeed", (key,value) => {
    scp.updateService.onValueChanged('motors/intakeSpeed', roundVal(value));
    scp.$apply();
  });

  
  /* Game info */
  NetworkTables.addKeyListener("/SmartDashboard/Time", (key, value) => {
    var elapsedTime = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + (value % 60).toFixed(1);
    scp.updateService.onValueChanged("match/time", elapsedTime);
    scp.$apply();
  });
  
  /* Motors data */
  /* Left Drive */
  NetworkTables.addKeyListener("/SmartDashboard/encoder_L", (key,value) => {
    scp.updateService.onValueChanged('motors/leftEncoder', roundVal(value));
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/positionL", (key,value) => {
    scp.updateService.onValueChanged('motors/leftPosition', roundVal(value));
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/rateL", (key,value) => {
    scp.updateService.onValueChanged('motors/leftRate', roundVal(value));
    scp.$apply();
  });
  /* Right Drive */
  NetworkTables.addKeyListener("/SmartDashboard/encoder_R", (key,value) => {
    scp.updateService.onValueChanged('motors/rightEncoder', roundVal(value));
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/positionR", (key,value) => {
    scp.updateService.onValueChanged('motors/rightPosition', roundVal(value));
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/rateR", (key,value) => {
    scp.updateService.onValueChanged('motors/rightRate', roundVal(value));
    scp.$apply();
  });

  /* Sensors data */
  NetworkTables.addKeyListener("/SmartDashboard/1", (key, value) => {
    scp.updateService.onValueChanged("sensors/switch1", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/2", (key, value) => {
    scp.updateService.onValueChanged("sensors/switch2", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/gyro", (key, value) => {
    scp.updateService.onValueChanged("sensors/gyroAngle", roundVal(value));
    scp.$apply();
  });
  
  NetworkTables.addKeyListener("/SmartDashboard/navX-MXP_Calibrated", (key, value) => {
    scp.updateService.onValueChanged("sensors/isGyroCalibrated", value);
    scp.$apply();
  });

/* Power Usage by Device */
  NetworkTables.addKeyListener("/SmartDashboard/powerFrontLeft", (key, value) => {
    scp.updateService.onValueChanged("power/powerFrontLeft", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerFrontRight", (key, value) => {
    scp.updateService.onValueChanged("power/powerFrontRight", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerBackLeft", (key, value) => {
    scp.updateService.onValueChanged("power/powerBackLeft", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerBackRight", (key, value) => {
    scp.updateService.onValueChanged("power/powerBackRight", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerIntake", (key, value) => {
    scp.updateService.onValueChanged("power/powerIntake", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerConveyor1", (key, value) => {
    scp.updateService.onValueChanged("power/powerConveyor1", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerConveyor2", (key, value) => {
    scp.updateService.onValueChanged("power/powerConveyor2", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerShooter1", (key, value) => {
    scp.updateService.onValueChanged("power/powerShooter1", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerShooter2", (key, value) => {
    scp.updateService.onValueChanged("power/powerShooter2", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerHood1", (key, value) => {
    scp.updateService.onValueChanged("power/powerHood1", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerHood2", (key, value) => {
    scp.updateService.onValueChanged("power/powerHood2", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerRio", (key, value) => {
    scp.updateService.onValueChanged("power/powerRio", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/powerPcm", (key, value) => {
    scp.updateService.onValueChanged("power/powerPcm", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/batteryVoltage", (key, value) => {
    scp.updateService.onValueChanged("power/batteryVoltage", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/totalPowerUsage", (key, value) => {
    scp.updateService.onValueChanged("power/totalPowerUsage", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/rioCpu", (key, value) => {
    scp.updateService.onValueChanged("power/rioCpu", value);
    scp.$apply();
  });
  NetworkTables.addKeyListener("/SmartDashboard/rioRam", (key, value) => {
    scp.updateService.onValueChanged("power/rioRam", value);
    scp.$apply();
  });


addEventListener("error", (ev) => {
  ipc.send("windowError", { mesg: ev.message, file: ev.filename, lineNumber: ev.lineno,});
});

/* Function to round 3 decimals */
let roundVal = (value) => {
  return parseFloat(Math.round(value * 1000) / 1000).toFixed(3);
}