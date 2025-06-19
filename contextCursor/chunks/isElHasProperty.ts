import propNames from "../propNames";

const isElHasProperty = (el: HTMLElement, property: string) => {
  const attr = el.getAttribute(propNames.dataAttr);
  if (attr && attr.includes(property)) {
    return true;
  } else {
    return false;
  }
};

export default isElHasProperty;
