/*-----------------------------------------------------------------------*/
/*                                                                       */
/* Name:         : Mithila DeSilva                                       */
/* zenit Account : int222_142c07                                         */
/* Assignment    : 3-2													 */
/* Date          : Aug 3rd 2014        			                         */
/*                                                                       */
/*-----------------------------------------------------------------------*/

/*----------------------validateOrder() function-------------------------*/
/*                                                                       */
/* The validateOrder() is called once the visitor completes the pizza    */
/* order form and then clicks on the "PLACE YOUR ORDER" submit button.   */
/*                                                                       */
/*-----------------------------------------------------------------------*/
function validateOrder() {

	var errMessage= "";

	errMessage= validateName(errMessage);
	errMessage= validateClient(errMessage);
	errMessage= validatePhone(errMessage);
	errMessage= validateDOB(errMessage);
	errMessage= validateSize(errMessage);
	errMessage= validateCheese(errMessage);
	errMessage= validateSauce(errMessage);
	validateToppings();
	
	if (errMessage !== "") {          
	  showErrors(errMessage);        
	  return false; 
    }
    
    else {
	  clearErrors(); 
	  validateHidden();                         
	  return true;                
    }
    
} // End of validateOrder()


/*--------------------calculatePizzaPrice() function---------------------*/
/*                                                                       */
/* The calculatePizzaPrice() is called:                                  */
/*                                                                       */
/*  - when the visitor checks or unchecks any one of the toppings        */
/*  - when the visitor selects a pizza size/crust                        */
/*  - when the visitor checks on unchecks the "Double Your Order"        */
/*                                                                       */
/*  - when the visitor submits the form and all entries are valid        */
/*                                                                       */
/*-----------------------------------------------------------------------*/
function calculatePizzaPrice() {
	var total= 0;
	var total1= 0;
	var total2= 0;
	
	total2= 1.89 * validateToppings();
	total1= pizzaSize();
	total= total1+total2;
	
	if (document.onlineOrder.doubleOrder.checked === true) {
		total = (total* 2) * 0.85;
	}
	
	total *= 1.13;
	
	document.getElementById("price").value= "$" + total.toFixed(2);
	

} // End of calculatePizzaPrice()


/*----------------------validateName() function--------------------------*/
/*                                                                       */
/*	- Validates the Name												 */
/*                                                                       */
/*-----------------------------------------------------------------------*/											
function validateName(errMessage) {
	var name= document.getElementById("surname").value;
	name= name.trim();
	var nameLength= name.length;
	var countAlpha= 0;
	var dash= 0;
	var apostrophe= 0;
	var nonAlpha= 0;
	
	//Counts the alphabetic characters in the name
	for (var i=0; i < nameLength; i++) {		
		if ( (name[i] >="a" && name[i] <="z") || (name[i] >="A" && name[i] <="Z")) {
			countAlpha++;
		}
		else {
			if(name[i] !="\-" && name[i] != "\'") {
				nonAlpha++;
			}
		}
	}
	
	//Confirms name is not empty
	if (nameLength === 0) {
		errMessage+= "<p><mark>Name</mark><br /> - The name field can not be left empty or just blank characters <br /></p>";
	}
	
	//Checks if a alphabetic character is before and after a - or '
	for (var i=0; i < nameLength; i++) {	
		if (name[i] === "\-" && (name[i-1] >"a" || name[i-1] <"z" || name[i+1] >"A" || name[i+1] <"Z" || name[i+1] === "\-")){
			errMessage+= "<p><mark>Name</mark><br /> - A dash(-) must have a alphabetical character before and after <br /></p>";
			break;
		}
		if (name[i] === "\'" && (name[i-1] <"a" || name[i-1] >"z") && (name[i+1] <"A" || name[i+1] >"Z") && name[i+1] === "\'"){
			errMessage+= "<p><mark>Name</mark><br /> - An apostrophe(') must have a alphabetical character before and after <br /></p>";
			break;
		}
		if (name[0] === "\'" || name[0] === "\-") {
			errMessage+= "<p><mark>Name</mark><br /> - 1st character must be alphabetical <br /></p>";
			break;
		}
		//Counts the dashes
		if (name[i] === "\-") {
			dash++;
		}
		//Only 1 - allowed
		if (dash > 1) {
			errMessage+= "<p><mark>Name</mark><br /> - Only 1 dash(-) allowed <br /></p>";
			break;
		}
		//Counts the apostrophes
		if (name[i] === "\'") {
			apostrophe++;
		}
		//Only 1 ' allowed
		if (apostrophe > 1) {
			errMessage+= "<p><mark>Name</mark><br /> - Only 1 apostrophe(') allowed <br /></p>";
			break;
		}
		if (countAlpha < 4) {
			errMessage+= "<p><mark>Name</mark><br /> - Minimum 4 alphabetic characters required <br /></p>";
			break;
		}
		//No Numbers allowed
		if (name[i] >= "1" && name[i] <= "9") {
			errMessage+= "<p><mark>Name</mark><br /> - Numbers are not allowed in the name Field <br /></p>";
			break;
		}
		//No spaces Allowed
		if (name[i] === " ") {
			errMessage+= "<p><mark>Name</mark><br /> - Spaces are not allowed between the name <br /></p>";
			break;
		}
		//NonAlpha not allowed
		if (nonAlpha > 0) {
			errMessage+= "<p><mark>Name</mark><br /> - Non Alphabetical characters not allowed <br /></p>";
			break;
		}		
	}

	return errMessage;
}


/*----------------------validateClient() function-------------------------*/
//Validates the Acc No
function validateClient(errMessage) {
	var accNo= document.getElementById("client").value;
	var accLength= accNo.length;
		
	//Calculates the total for position 4-7
	var total1= parseInt(accNo[3]) + parseInt(accNo[4]) + parseInt(accNo[5]) + parseInt(accNo[6]);
	
	//Calculates the total for position 9-12
	var total2= parseInt(accNo[8]) + parseInt(accNo[9]) + parseInt(accNo[10]) + parseInt(accNo[11]);
	
	//gets the difference in total(positive and negative value)
	var difference= total1 - total2;
	var difference1= (difference - difference) - difference;
	
	//Calculates the difference between pos 4 and 10
	var posValue= parseInt(accNo[3]) - parseInt(accNo[9]);
	var posValue1= (posValue - posValue) - posValue;
	
	
	do { 
		//Confirms Acc No is not empty
		if (accLength=== 0) {
			errMessage += "<p><mark>Account No.</mark><br /> - Account Number can not be empty <br /></p>";
			break;
		}
		//Confirms position 1-3 matches the expected area codes 
		if (accNo.substring(0,3) != "416" && accNo.substring(0,3) != "647" && accNo.substring(0,3) != "437" &&
			accNo.substring(0,3) != "905" && accNo.substring(0,3) != "289" && accNo.substring(0,3) != "365") {
			errMessage+= "<p><mark>Account No.</mark><br /> - Position 1 to 3 must have one of the following: 416, 647, 437, 905, 289 or 365 <br /></p>";
			break;
		} 
		//Checks position 4-7 is numeric
		//else {
		if (!(accNo.charAt(3) >= 0 && accNo.charAt(3) <= 9 && accNo.charAt(4) >= 0 && accNo.charAt(4) <= 9 &&
			  accNo.charAt(5) >= 0 && accNo.charAt(5) <= 9 && accNo.charAt(6) >= 0 && accNo.charAt(6) <= 9)) {
			errMessage += "<p><mark>Account No.</mark><br /> - Position 4 to 7 must be numeric <br /></p>";
			break;
		} 	 
		//Confirms position 8 is a dash
		if (accNo.charAt(7) != "-") {
			errMessage += "<p><mark>Account No.</mark><br /> - Position 8 must be a dash(-) <br /></p>";
			break;
		} 
		//Checks position 9-12 is numeric
		if (!(accNo.charAt(8) >= 0 && accNo.charAt(8) <= 9 && accNo.charAt(9) >= 0 && accNo.charAt(9) <= 9 &&
			  accNo.charAt(10) >= 0 && accNo.charAt(10) <= 9 && accNo.charAt(11) >= 0 && accNo.charAt(11) <= 9)) {
			errMessage += "<p><mark>Account No.</mark><br /> - Position 9 to 12 must be numeric <br /></p>";
			break;
		}		
		//Checks if positions 4-7 sum is greater than position 9-12 sum
		if (total1 <= total2) {
			errMessage+= "<p><mark>Account No.</mark><br /> - The sum of positions 4,5,6,7 must be greater than the sum of positions 9,10,11,12 <br /></p>";
			break;
		}
		//Confirms if the difference matches the 3rd position of Acc No.
		if(posValue != accNo.charAt(2) && posValue1 != accNo.charAt(2)) {
			errMessage+= "<p><mark>Account No.</mark><br /> - The value difference between position 4 and position 10 - (positive or negative) must be equal to the value in position 3 <br /></p>";
			break;
		}
		else {
			break;
		}
	} while (accLength !==0);

	return errMessage;
}


/*----------------------validatePhone() function--------------------------*/
//Validates the Phone Number
function validatePhone(errMessage) {
	var phoneNo = document.getElementById("phone").value;
	var accnt= document.getElementById("client").value;
	var phoneNoLength = phoneNo.length;
	
	//Adds the positions together
	var exchange= phoneNo.charAt(4) + phoneNo.charAt(5) + phoneNo.charAt(6);
	var accntFirst3= accnt.charAt(0) + accnt.charAt(1) + accnt.charAt(2);
	var phoneFirst3= phoneNo.charAt(0) + phoneNo.charAt(1) + phoneNo.charAt(2);
	var phoneLast4= phoneNo.charAt(8) + phoneNo.charAt(9) + phoneNo.charAt(10) + phoneNo.charAt(11);
	//Makes sure it is divisible by 7
	var validExchange= (exchange - 507) % 7;
		
	do {
		//Confirms Phone No is not empty
		if (phoneNoLength === 0) {
			errMessage+= "<p><mark>Phone No.</mark><br /> -Phone No. field can not be empty <br /></p>";
			break;
		}		
		//Confirms the area codes are valid
		if (phoneNo.substring(0,3) != "416" && phoneNo.substring(0,3) != "647" && phoneNo.substring(0,3) != "437" &&
			phoneNo.substring(0,3) != "905" && phoneNo.substring(0,3) != "289" && phoneNo.substring(0,3) != "365") {
			errMessage += "<p><mark>Phone No.</mark><br /> - Allowable area codes 'nnn'-nnn-nnnn are 416, 647, 437, 905, 289 and 365 <br /></p>";
			break;
		}
		//Makes sure position 4 and 8 is a dash
		if (phoneNo.charAt(3) != "-" || phoneNo.charAt(7) != "-") {
			errMessage+= "<p><mark>Phone No.</mark><br /> - Position 4 and 8 must be a dash <br /></p>";
			break;
		}
		//Confirms position 5-7 is numeric
		if (!(phoneNo.charAt(4) >= 0 && phoneNo.charAt(4) <= 9 && phoneNo.charAt(5) >= 0 && phoneNo.charAt(5) <= 9 &&
			  phoneNo.charAt(6) >= 0 && phoneNo.charAt(6) <= 9)) {				
			errMessage += "<p><mark>Phone No.</mark><br /> - Position 5 to 7 must be numeric <br /></p>";
			break;
		}
		//Confirms position 9-12 is numeric
		if (!(phoneNo.charAt(8) >= 0 && phoneNo.charAt(8) <= 9 && phoneNo.charAt(9) >= 0 && phoneNo.charAt(9) <= 9 &&
			  phoneNo.charAt(10) >= 0 && phoneNo.charAt(10) <= 9 && phoneNo.charAt(11) >= 0 && phoneNo.charAt(11) <= 9)) {
			errMessage += "<p><mark>Phone No.</mark><br /> - Position 9 to 12 must be numeric <br /></p>";
			break;
		}
		//Confirms exchange is greater than 507 and less than 759
		if (exchange < 507 || exchange > 759) {
			errMessage += "<p><mark>Phone No.</mark><br /> - The exchange part nnn-'nnn'-nnnn in the phone number must be more than or equal to 507 and less than 759 <br /></p>"
			break;
		}
		if (validExchange != 0) {
			errMessage += "<p><mark>Phone No.</mark><br /> - The exchange part nnn-'nnn'-nnnn in the phone number must be a multiple of seven starting from 507 and ending with 759 inclusive.<br /></p>";
			break;
		}
		//Checks if last 4 digits is equal to 0
		if (phoneLast4 === "0000") {
			errMessage += "<p><mark>Phone No.</mark><br /> - Last 4 digits can not be all 0's <br /></p>";;
			break;
		}
		//Matches the area code with the first 3 digits of Account No.
		if (accntFirst3 != phoneFirst3)	{
			errMessage += "<p><mark>Phone No.</mark><br /> - The area code ('nnn'-nnn-nnnn) in phone number must match the first three (3) positions in client account number <br /></p>";
			break;
		}
		else {
			break;
		}
	} while ( phoneNoLength != 0);
	
	return errMessage;
}


/*----------------------validateDOB() function--------------------------*/
//DOB validate
function validateDOB(errMessage) {
	var bday= document.getElementById("dob").value;
	var bdayLength= bday.length;
	var curDate = new Date();
	var curYear = curDate.getFullYear();
	
	//extracts the month and year from Date function
	var bdayMonth= bday.charAt(0) + bday.charAt(1) + bday.charAt(2);
	var bdayYear= bday.charAt(3) + bday.charAt(4) + bday.charAt(5) + bday.charAt(6);
	//calculates the difference with cur year
	var yearDifference= curYear - bdayYear;
	
	//Confirms DOB field is not empty
	if (bdayLength === 0) {
		errMessage+= "<p><mark> Date Of Birth </mark> - Date of Birth filed can not be empty <br /></p>";
	}
	else {
		//Valid options month
		if (!(bdayMonth === "jan"|| bdayMonth === "JAN" || bdayMonth === "feb" || bdayMonth === "FEB" &&
			  bdayMonth === "mar"|| bdayMonth === "MAR" || bdayMonth === "apr" || bdayMonth === "APR" &&
			  bdayMonth === "may"|| bdayMonth === "MAY" || bdayMonth === "jun" || bdayMonth === "JUN" &&
			  bdayMonth === "jul"|| bdayMonth === "JUL" || bdayMonth === "aug" || bdayMonth === "AUG" &&
			  bdayMonth === "sep"|| bdayMonth === "SEP" || bdayMonth === "oct" || bdayMonth === "OCT" &&
			  bdayMonth === "nov"|| bdayMonth === "NOV" || bdayMonth === "dec" || bdayMonth === "DEC")) {
			errMessage+= "<p><mark> Date Of Birth </mark> - Month must be in all simple or capital letters <br /></p>";
		}
		//Confirms the year is numeric
		if (!(bday.charAt(3) >= 0 && bday.charAt(3) <= 9 && bday.charAt(4) >= 0 && bday.charAt(4) <= 9 &&
			  bday.charAt(5) >= 0 && bday.charAt(5) <= 9 && bday.charAt(6) >= 0 && bday.charAt(6) <= 9)) {
			errMessage += "<p><mark>Date Of Birth</mark><br /> - Year(Position4-7) must be numeric <br /></p>";
		} 
		//Confirms Year is numeric and at least years less than current year
		if (yearDifference < 18) {
			errMessage+= "<p><mark> Date Of Birth </mark> - Year must be and at least 18 years less than the current year  <br /></p>";
		}
	}

	return errMessage;
}


/*----------------------pizzaSize() function--------------------------*/
//Gets the pizza Size selected and returns the price
function pizzaSize() {
	var noOfOptions= document.onlineOrder.sizecrust.length;
	var size= "";
	var price= 0;
    
    //Tracks the option selected
    for (var i= 0; i < noOfOptions; i++) {      
		if (document.onlineOrder.sizecrust[i].selected === true) { 
			size= document.onlineOrder.sizecrust[i].text;
			break;		
		}
	}
		
	//Calculates the price for the Pizza size
	size= size.substring(0,2);
	if (size === "Sm") {
		price = 10.55;
	}
	else {
		if (size === "Me") {
			price = 14.25;
		}
		if (size === "La") {
			price = 21.50;
		}
		if (size === "X-") {
			price = 25.00;
		}
	}
		
	return price;
}


/*----------------------validateSize) function--------------------------*/
//Size validation function
function validateSize(errMessage) {
	var noOfOptions= document.onlineOrder.sizecrust.length;
	var sizeSelected = document.onlineOrder.sizecrust.selectedIndex;
        
    //Loops through size list and confirms at least one selected and its above 0th element
    for (var i= 0; i < noOfOptions; i++) {      
		if (sizeSelected <= 0) { 
			errMessage += "<p><mark> Pizza Size & Crust </mark><br /> - You must select a pizza size <br /></p>"; 
			break;	
		}	
	} 	

	return errMessage;
}


/*----------------------validateCheese() function--------------------------*/
//Cheese validator
function validateCheese(errMessage) {
	var noOfOptions= document.onlineOrder.cheese.length;
	var selected= 0;
	
	//Grabs the number of options available
	for (var i =0; i < noOfOptions; i++) {
		if (document.onlineOrder.cheese[i].checked === true) {
			selected++;
		}
	}
	
	//Confirms a cheese is selected
	if (selected === 0) {
		errMessage+= "<p><mark> Cheese </mark><br /> - A cheese must be selected <br /></p>";
	}
	
	return errMessage;
}


/*----------------------validateSauce() function--------------------------*/
//Sauce validator
function validateSauce(errMessage) {
	var noOfOptions= document.onlineOrder.sauce.length;
	var selected= 0;
	
	//Grabs the number of options available
	for (var i =0; i < noOfOptions; i++) {
		if (document.onlineOrder.sauce[i].checked === true) {
			selected++;
		}
	}
	
	//Checks if one is selected
	if (selected === 0) {
		errMessage+= "<p><mark> Sauce </mark><br /> - A sauce must be selected <br /></p>";
	}
	
	return errMessage;
}


/*----------------------validateToppings() function--------------------------*/
//Counts the toppings selected
function validateToppings() {
	var noOfOptions= document.onlineOrder.toppings.length;
	var selected= 0;
	
	//Loops through the options and counts the ones selected
	for (var i =0; i < noOfOptions; i++) {
		if (document.onlineOrder.toppings[i].checked === true) {
			selected++;
		}
	}
	
	
	//var toppingCost= selected * 1.89;
	
	return selected;
}


/*----------------------validateHidden() function--------------------------*/
//Updates the hidden info
function validateHidden() {
	
	calculatePizzaPrice();
	
	//Sets the hDouble value to 1 or 2
	if (document.onlineOrder.doubleOrder.checked === true) {
		document.onlineOrder.hDouble.value= 2;
	}
	else {
		document.onlineOrder.hDouble.value= 1;
	}
	
	//Changes the values of the functions
	document.onlineOrder.hPizzaPrice.value = pizzaSize() * document.onlineOrder.hDouble.value;
	document.onlineOrder.hToppings.value = validateToppings();	
	document.onlineOrder.hToppingsCost.value = (document.onlineOrder.hToppings.value * 1.89) * document.onlineOrder.hDouble.value;
	
	//Calculates the regular cost or double cost
	if (document.onlineOrder.hDouble.value=== 1) {
		document.onlineOrder.hSubTotal.value= document.onlineOrder.hPizzaPrice.value + document.onlineOrder.hToppingsCost.value;
	}
	else {
		document.onlineOrder.hSubTotal.value= (((parseFloat(document.onlineOrder.hPizzaPrice.value)  + parseFloat(document.onlineOrder.hToppingsCost.value)) * 0.85)).toFixed(2);
	}	
	
	//Changes the values of the functions
	document.onlineOrder.hHst.value = (parseFloat(document.onlineOrder.hSubTotal.value) * 0.13).toFixed(2);
	document.onlineOrder.hFinalTotal.value = (parseFloat(document.onlineOrder.hHst.value) + parseFloat(document.onlineOrder.hSubTotal.value)).toFixed(2);
	document.onlineOrder.hJsActive.value= "Yes";
	
	return true;		
}


/*----------------------showErrors() function--------------------------*/
//outputs the errors on to the screen
function showErrors(errMessage) {
	//messages += "<p> - Hover over the field title to see the rules</p>";
	document.getElementById('errors').innerHTML = errMessage;
}


/*----------------------clearErrors() function--------------------------*/
//Clears all the errors section
function clearErrors() {
	document.getElementById('errors').innerHTML = " ";
}



