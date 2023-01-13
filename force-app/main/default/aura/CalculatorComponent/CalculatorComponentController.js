({
	handleClick : function(component, event, helper) 
    {
      var Sum = parseInt(component.get("v.firstNumber"))+parseInt(component.get("v.secondNumber"));
        var eventObj = $A.get("e.c:CalculatorApplicationEvent");
        eventObj.setParams({"sumresult":Sum});
        eventObj.fire();  
		
	}
})