import { useRef, useState } from "react";
import { setWith } from "lodash";

const setPathToPayload = (path, value, object) => {
  const result = { ...object };
  
  setWith(result, path, value);

  return result;
}

const valueOfType = ({ checked, type, value }) => {
  switch(type) {
    case "checkbox":
      return Boolean(checked);
    case "number":
      return Number(value);
    default:
      return value;
  }
} 

export function useForm() {
  const [errors, setErrors ] = useState({});
  const refs = useRef({});
  const refsRulesFuncs = useRef({});

  function registerRef(element, rulesFuncs) {
    if(!element || !element.name) return;

    const name = element.name;

    refs.current[name] = element;

    if(rulesFuncs) {
      refsRulesFuncs.current[name] = rulesFuncs;
    }

    return refs;
  }

  function register(refOrRulesFuncs) {

    if(Array.isArray(refOrRulesFuncs)) {
      return (ref) => registerRef(ref, refOrRulesFuncs);
    }

    registerRef(refOrRulesFuncs);
  }

  function handleSubmit() {
    let payload = {};
    Object.values(refs.current).forEach(element => {
      payload = setPathToPayload(
        element.name,
        valueOfType(element),
        payload
      )
    })
  }

  function validate(name) {
    const rules = refsRulesFuncs.current[name];

    if(!rules) return;

    const input = refs.current[name];
    if(!input) return;

    const valueKey = input.type === "checkbox" ? "checked" : "value";

    const errorMessages = 
      rules.map(fn => fn(input[valueKey])).filter(val => !!val);

    return errorMessages.length ? errorMessages : null;
  }

  function handleValidate() {
    let errorState = {};
    Object.keys(refs.current).forEach(key => {
      const validation = validate(key);
      
      errorState[key] = validation;
    });

    setErrors(errorState);

    return errorState;
  }

  return {
    errors,
    register,
    handleSubmit,
    handleValidate
  }
}