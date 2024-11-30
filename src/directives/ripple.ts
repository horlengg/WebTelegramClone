const createRippleEffectOnButton = (event:MouseEvent,binding:any)=>{ 
    const el = event.currentTarget as HTMLElement 
    const rect = el.getBoundingClientRect(); 
    let x = event.clientX - rect.left;   
    let y = event.clientY - rect.top;   
    const effectElement = document.createElement("span");  
    effectElement.classList.add("ripple-effect");   
    effectElement.style.left = x + "px";   
    effectElement.style.top = y + "px";   
    let arg = binding.arg;   
    if(arg === "color") effectElement.style.backgroundColor = binding.value;   
    el.appendChild(effectElement);   
    // after 600ms remove this effect loader  
    setTimeout(()=>{   
        effectElement.remove();   
    },600)   
} 
 
export default  {   
    mounted : function(el:HTMLElement,binding:any){   
        if(!el) throw new Error("DOM element is required"); 
        el.style.position = "relative";   
        el.style.overflow = "hidden";   
        el.addEventListener("click",(event:MouseEvent) => {   
            createRippleEffectOnButton(event,binding); 
        })   
    } 
       
} 
 
