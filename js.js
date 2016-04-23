/////////////////////////////////////////////////////
// Define global variable(s)

// An array of objects with properties: title, contents
var buttonDefinitions = [];


/////////////////////////////////////////////////////
// Functions

// Purpose: Read in input and store valid input in the array "buttonDefinitions".
var readInputAndStoreInButtonDefinitions = function() {
  buttonDefinitions = [];
  var input = document.getElementById('inputTextArea').value;
  // Split the input based on the pattern ***\n.
  var inputArray = input.split('***\n');
  var title;
  var contents;
  // This regexp finds the first line of the multi-line string
  var myRegexp = /(^.*\n)(.*)/;
  var splitInputArray;
  // We loop through each section of the input separated by pattern ***\n
  // If the title or contents are blank we ignore it.
  for (var i = 0; i < inputArray.length; i++) {
    splitInputArray = inputArray[i].split('\n');
    title = splitInputArray[0];
    if (splitInputArray.length == 1) {
      contents = "";
    } else {
      contents = inputArray[i].replace(myRegexp,"$2").trim();
    }
    if (title != "" && contents != "") {
      buttonDefinitions.push({
        title: title, contents: contents
      });
    }
  }
};

// Purpose: Remove all buttons.  Useful for removing all buttons before creating new ones.
var removeButtons = function() {
  var buttonContainer = document.getElementById('buttonContainer');
  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }  
};

// Purpose: Read the buttonDefinitions array and create buttons on the DOM
// The title is shown to the user and the buttons hold the contents in the value attribute.
var createButtons = function() {
  var buttonElement;
  var text;
  for (var i = 0; i < buttonDefinitions.length; i++) {
    buttonElement = document.createElement("button");
    text = document.createTextNode(buttonDefinitions[i].title);
    buttonElement.appendChild(text);
    buttonElement.setAttribute('value',buttonDefinitions[i].contents);
    buttonElement.className = "buttonElement";
    document.getElementById("buttonContainer").appendChild(buttonElement);
  }
};

// Purpose: Print the output into the box.  Called when a button is clicked.
var printOutput = function(contents) {
  var output = document.getElementById('outputTextArea').value;
  var newOutput;
  if (output.trim() == '') {
    newOutput = output.concat(contents);
  } else {
    newOutput = output.concat('\n').concat(contents);
  }
  document.getElementById('outputTextArea').value = newOutput;
};

/////////////////////////////////////////////////////
// jQuery and listeners

$(document).ready(function() {
  $('#inputTextArea').blur(function() {
    readInputAndStoreInButtonDefinitions();
    removeButtons();
    createButtons();
    $('.buttonElement').click(function() {
      printOutput($(this).val());
    })
  });
});