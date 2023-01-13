({
	Add : function(component, event, helper) 
    {
		var Sum = parseInt(component.get("v.firstValue"))+parseInt(component.get("v.secondValue"));
        component.set("v.result",Sum);
	},
    Substract : function(component, event, helper)
    {
		var Substract = parseInt(component.get("v.firstValue"))-parseInt(component.get("v.secondValue"));
        component.set("v.result",Substract);	
    },
    Multiply : function(component, event, helper)
    {
		var Multiply = parseInt(component.get("v.firstValue"))*parseInt(component.get("v.secondValue"));
        component.set("v.result",Multiply);	
    },
 	Divide : function(component, event, helper)
    {
		var Divide = parseInt(component.get("v.firstValue"))/parseInt(component.get("v.secondValue"));
        component.set("v.result",Divide);
	}
	
})