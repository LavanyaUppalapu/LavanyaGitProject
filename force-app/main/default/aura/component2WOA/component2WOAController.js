({
    Add : function(component, event, helper) 
    {
	    var fnumber = component.find("fnum").get("v.value");
        var snumber = component.find("snum").get("v.value");
        var Sum = parseInt(fnumber)+parseInt(snumber);
        
        component.find("Result").set("v.value", Sum);
	},
    Substract : function(component, event, helper)
    {
		var fnumber = component.find("fnum").get("v.value");
        var snumber = component.find("snum").get("v.value");
        var Sub = parseInt(fnumber)-parseInt(snumber);
        
        component.find("Result").set("v.value", Sub);
    },
    Multiply : function(component, event, helper)
    {
		var fnumber = component.find("fnum").get("v.value");
        var snumber = component.find("snum").get("v.value");
        var Mul = parseInt(fnumber)*parseInt(snumber);
        
        component.find("Result").set("v.value", Mul);
    },
 	Divide : function(component, event, helper)
    {
		var fnumber = component.find("fnum").get("v.value");
        var snumber = component.find("snum").get("v.value");
        var Div = parseInt(fnumber)/parseInt(snumber);
        
        component.find("Result").set("v.value", Div);
	}

})