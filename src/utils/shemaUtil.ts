export function generateMenuItems(schema:any) {
   if (schema.type === 'Category' || schema.type === 'Categorization') {
      const menuItem:any = {
        label: schema.label,
      };
  
      const controlElement = schema.elements.find((element:any) => element.type === "Control");
      if (controlElement) {
        menuItem.value = controlElement.scope;
      }
  
      const childElements = schema.elements.filter((element:any)  => element.type === 'Category' || element.type === "Categorization");
      if (childElements.length > 0) {
        menuItem.children = childElements.flatMap((element:any)  => generateMenuItems(element)).filter(Boolean);
      }
  
      return menuItem;
    }
  
    return null;
 }
 