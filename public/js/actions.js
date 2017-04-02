function cancelAddCustomer(){

    window.location.href = '/customers';
}

function confirmAction(){
    var confirmed = confirm("Are you sure you want to delete this item?");
    return confirmed;
}

function validateForm(form)   
{  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value))  
    {  
	if(validatePhone(form.phone.value)){
	    if(form.fax && form.fax.value && form.fax.value.length>0){
		return validatePhone(form.fax.value);
	    }else if(form.mobile && form.mobile.value && form.mobile.value.length>0){
		return validatePhone(form.mobile.value);
	    }else{
		return true;
	    }
	    
	}

    }else{  
	event.preventDefault(); 
	alert("You have entered an invalid email address!");  
	return false;
    }  
} 

function validatePhone(value){
    if(/^\({0,1}\d{3}\){0,1}\s{0,1}[\s-\.]{0,1}\d{3}[\s-\.]{0,1}\d{4}$/.test(value)){	 
	return true; 
    }
    else{
	event.preventDefault(); 
	alert("You have entered an invalid phone/fax number!");  
	return false; 
    }
}
