function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i = 0; i < uiBathrooms.length; i++) {
      if(uiBathrooms[i].checked) {
          
          return parseInt(uiBathrooms[i].value);
      }
    }
    return -1; 
}
  
function getBedValue() {
    var uiBED = document.getElementsByName("uiBED");
    for(var i = 0; i < uiBED.length; i++) {
      if(uiBED[i].checked) {
          
          return parseInt(uiBED[i].value);
      }
    }
    return -1; 
}

function getLivValue() {
    var uiLIV = document.getElementsByName("uiLIV");
    for(var i = 0; i < uiLIV.length; i++) {
      if(uiLIV[i].checked) {
        
          return parseInt(uiLIV[i].value);
      }
    }
    return -1; 
}
  
function onClickedGetPrice() {
    console.log("Estimate price button clicked");
    var sqm = document.getElementById("uiSqm");
    var livingrooms = getLivValue();
    var bedrooms = getBedValue();
    var bathrooms = getBathValue();
    var loc = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
   
    if (!sqm || !sqm.value) {
        alert("Please enter area in square meters");
        return;
    }
    
    if (loc.value === "" || loc.value === "Choose a Location") {
        alert("Please select a location");
        return;
    }
    
    
    console.log("Sending request with values:", {
        sqm: parseFloat(sqm.value),
        livingrooms: livingrooms,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        loc: loc.value
    });
  
    var url = "/api/get_price"; 
    
    $.ajax({
        url: url,
        type: "POST",
        data: {
            sqm: parseFloat(sqm.value),
            livingrooms: livingrooms,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            loc: loc.value
        },
        success: function(data, status) {
            console.log("Success:", data);
            estPrice.innerHTML = "<h2>" + data.price + " Pounds</h2>";
        },
        error: function(xhr, status, error) {
            console.error("Error:", status, error);
            console.log("Response:", xhr.responseText);
            estPrice.innerHTML = "<h2>Error: Could not estimate price</h2>";
        }
    });
}
  
function onPageLoad() {
    console.log("document loaded");
    var url = "/api/get_loc"; 
    $.ajax({
        url: url,
        type: "GET",
        success: function(data, status) {
            console.log("got response for get_loc request");
            if(data && data.locations) {
                var locations = data.locations;
                var uiLocations = document.getElementById("uiLocations");
                $('#uiLocations').empty();
         
                $('#uiLocations').append('<option value="" disabled="disabled" selected="selected">Choose a Location</option>');
                for(var i in locations) {
                    var opt = new Option(locations[i], locations[i]);
                    $('#uiLocations').append(opt);
                }
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading locations:", status, error);
        }
    });
}
  
window.onload = onPageLoad;