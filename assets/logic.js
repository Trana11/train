var config = {
  apiKey: "AIzaSyCpmE-UeWATzWgVOOtvW9wFEYrSgLcA2VY",
  authDomain: "bidding-ed85e.firebaseapp.com",
  databaseURL: "https://bidding-ed85e.firebaseio.com",
  projectId: "bidding-ed85e",
  storageBucket: "",
  messagingSenderId: "867060047977"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function() {
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("x");
  var frequency = $("#frequencyInput")
    .val()
    .trim();
  return false;
});

trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  $("#trainTable > tBody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      "<tr><td>" +
      destination +
      "</td><td>" +
      "<tr><td>" +
      frequency +
      "</td><td>" +
      "<tr><td>" +
      arrival +
      "</td><td>" +
      "<tr><td>" +
      minutes +
      "</td><td>"
  );
});
