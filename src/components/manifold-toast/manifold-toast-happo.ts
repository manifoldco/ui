export const basic = () => {
    const plan = document.createElement('manifold-toast');
  
    document.body.appendChild(plan);
    };

export const error = () => {
    const plan = document.createElement('manifold-toast');
    plan.setAttribute("alert-type", "error");
  
    document.body.appendChild(plan);
  };
    
export const warning = () => {
    const plan = document.createElement('manifold-toast');
    plan.setAttribute("alert-type", "warning");
  
    document.body.appendChild(plan);
  };

  export const success = () => {
    const plan = document.createElement('manifold-toast');
    plan.setAttribute("alert-type", "success");
  
    document.body.appendChild(plan);
  };

  export const dismissable = () => {
    const plan = document.createElement('manifold-toast');
    plan.setAttribute("dismissable", "true");
  
    document.body.appendChild(plan);
  };
  