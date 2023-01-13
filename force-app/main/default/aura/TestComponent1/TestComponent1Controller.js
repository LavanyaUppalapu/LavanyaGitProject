({
	addition : function(component, event, helper) {
	    var firstNumber = component.find("fnumber").get("v.value");
        var secondNumber = component.find("snumber").get("v.value");
        var Sum = parseInt(firstNumber)+parseInt(secondNumber); 
        component.find("result").set("v.value", Sum);
	
	}
})