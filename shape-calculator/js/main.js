import {getInputList,listOfShapes,getArea} from './app.js';

// Global variables used from multiple functions
var ShapeFeaturesDiv = document.getElementById('shape_features');
var selectedShapeText = '';

// Load List of Shapes from app.js and Create Radio buttons to select each shape
document.addEventListener("DOMContentLoaded",function() {
    createShapeInputs();
});

/**
 * createShapeInputs creates radio buttons for multiple shapes and appends to DOM
 */
function createShapeInputs() {
    let ShapeSelectionDiv = document.getElementById('shape_selction');

    listOfShapes.forEach(element => {
        let radioInput = document.createElement('input');
        radioInput.setAttribute('name','shape');
        radioInput.setAttribute('type','radio');
        radioInput.setAttribute('id',element);
        radioInput.setAttribute('value',element);
    
        let labelTpl = document.createElement('label');
        labelTpl.setAttribute('for',element);
        labelTpl.innerHTML = element;
    
        let containerPara = document.createElement('p');
    
        containerPara.appendChild(radioInput);
        containerPara.appendChild(labelTpl);
        ShapeSelectionDiv.appendChild(containerPara);
    });

}

/**
 * createShapeFeaturesInputs creates input text boxes for features for selected shape
 * @param {*} listShapeFeatures 
 */
function createShapeFeaturesInputs(listShapeFeatures) {
    ShapeFeaturesDiv.innerHTML = '';

    listShapeFeatures.forEach(element => {
        let i = 1;

        let textInput = document.createElement('input');
        textInput.setAttribute('type','text');
        textInput.setAttribute('id',element);
        textInput.setAttribute('name',element);
        textInput.setAttribute('placeholder',element);
        textInput.setAttribute('value','');

        let labelTpl = document.createElement('label');
        labelTpl.setAttribute('for',element);
        labelTpl.style.fontWeight = 'bold';
        labelTpl.innerHTML = element;
        labelTpl.style.display = 'block';

        let containerPara = document.createElement('p');
    
        containerPara.appendChild(labelTpl);
        containerPara.appendChild(textInput);

        ShapeFeaturesDiv.appendChild(containerPara);
    });

}

/* Handle Reset Form Events */
/**
 * Callback function to clean up
 */
var resetToFirstStep = function() {
    // Suppress default behaviour
    event.preventDefault();

    // Display First Step
    document.getElementById('frm_shape_calculator_step_1').className = 'show';
    document.getElementById('frm_shape_calculator_step_2').className = 'hide';
    document.getElementById('frm_shape_calculator_step_3').className = 'hide';
    
    // Reset Shape Selection radios from Step 1
    let selectedShapeEle = document.querySelector('input[name="shape"]:checked');
    if( selectedShapeEle != null ) {
        selectedShapeEle.checked = false;
    }

    // Reset container for shape feature input text boxes from Step 2
    ShapeFeaturesDiv.innerHTML = '';

    // Reset textual placeholders from Step 3
    document.getElementById('selected_shape_features').innerHTML = '';
    document.getElementById('calculated_area').innerHTML = '';
    let listSelectedShapesEle = document.getElementsByClassName('selected_shape');
    for(let i=0; i<listSelectedShapesEle.length; i++ ){
        listSelectedShapesEle[i].innerHTML = '';
    }

    // Clear error messages from Step 1 and Step 2
    document.getElementById('step_1_message_placeholder').innerText = '';
    document.getElementById('step_2_message_placeholder').innerText = '';
};

// Register cleanup/reset callbacks
document.getElementById('step-1-cancel').addEventListener("click", resetToFirstStep );
document.getElementById('step-2-cancel').addEventListener("click", resetToFirstStep );
document.getElementById('step-3-submit').addEventListener("click", resetToFirstStep );

/**
 *  SubmitHandler for Step 1 for Shape Selection
 */
document.getElementById('step-1-submit').addEventListener("click", function() {
    event.preventDefault();
    // Get selected shape ( if any )
    let selectedShapeEle = document.querySelector('input[name="shape"]:checked');
    // Validation
    if(selectedShapeEle == null) {
        document.getElementById('step_1_message_placeholder').innerText = 'Please select a shape';
    } else {
        document.getElementById('step_1_message_placeholder').innerText = '';
        // Fill in placeholders on Step 2
        selectedShapeText = document.querySelector('input[name="shape"]:checked').value;
        let listSelectedShapesEle = document.getElementsByClassName('selected_shape');
        for(let i=0; i<listSelectedShapesEle.length; i++ ){
            listSelectedShapesEle[i].innerHTML = selectedShapeText;
        }
        //or
        // document.getElementById('selected_shape_step_2').innerText = selectedShapeText;
        // document.getElementById('selected_shape_step_3').innerText = selectedShapeText;
    
        // Collect input feature names for selected shape and Render Text boxes for each
        let listShapeFeatures = getInputList(selectedShapeText);
        createShapeFeaturesInputs(listShapeFeatures);

        // Show / Hide Steps
        document.getElementById('frm_shape_calculator_step_1').className = 'hide';
        document.getElementById('frm_shape_calculator_step_2').className = 'show';
        document.getElementById('frm_shape_calculator_step_3').className = 'hide';
    }
});

/**
 *  SubmitHandler for Step 2 for Shape Features Input
 */
document.getElementById('step-2-submit').addEventListener("click", function() {
    event.preventDefault();

    let listShapeFeatureInputs = ShapeFeaturesDiv.querySelectorAll("input[type='text']");
    let listShapeFeatures = [];
    let strShapeFeatures = '';
    let validationFlag = true;
    let validationMessage = '';

    // Check for Validation and Prepare variables for filling in placeholders on Step 3
    for(  let i=0; i<listShapeFeatureInputs.length; i++ ) {
        if( listShapeFeatureInputs[i].value.length > 0 && !isNaN( (listShapeFeatureInputs[i].value ) ) ) {
            listShapeFeatures[i] = parseFloat(listShapeFeatureInputs[i].value );
            if(strShapeFeatures.length>0) {
                strShapeFeatures += ', '
            }
            strShapeFeatures += listShapeFeatureInputs[i].name + ' of ' + listShapeFeatureInputs[i].value;
        } else {
            validationFlag = false;
            validationMessage.length > 0 ? validationMessage += ' and ' : '';
            validationMessage += listShapeFeatureInputs[i].name;
        }
    }

    // Print Validation Message ( if any )
    if(!validationFlag) {
        validationMessage = 'Please enter numeric value for ' + validationMessage;
        document.getElementById('step_2_message_placeholder').innerText = validationMessage;
    } else {
        // Step 2 Validation passed so fill in placeholders on Step 3 and display result of area on Step 3
        document.getElementById('step_2_message_placeholder').innerText = '';
        let area = getArea(selectedShapeText, listShapeFeatures);
        document.getElementById('selected_shape_features').innerHTML = strShapeFeatures;
        document.getElementById('calculated_area').innerHTML = area;
    
        document.getElementById('frm_shape_calculator_step_1').className = 'hide';
        document.getElementById('frm_shape_calculator_step_2').className = 'hide';
        document.getElementById('frm_shape_calculator_step_3').className = 'show';
    }

});