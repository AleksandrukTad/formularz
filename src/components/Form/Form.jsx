import React from "react";
import { useForm } from "../../hooks/useForm";
import { TextField } from "../TextField";
import { Button } from "../Button";

function isRequired({ message = "Error"}) {
  return (value) => {
    return !value ? message : ""; 
  }
}

export function Form() {
  const { errors, register, handleSubmit, handleValidate } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();

    const submitErrors = handleValidate();

    if(!submitErrors) {
      const payload = handleSubmit();
      console.log(payload);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={register} name="yesno" type="checkbox" />
      <TextField labelText="Imię" register={register([isRequired({ message: "imie musi istniec" })])} name="name" />
      {errors["name"] && <p> {errors["name"]}</p>}
      <TextField labelText="Nazwisko" register={register([isRequired({ message: "nazwisko musi istniec" })])} name="surname" />
      {errors["surname"] && <p> {errors["surname"]}</p>}
      <TextField labelText="Email" type="email" register={register([isRequired({ message: "email musi istniec" })])} name="email" />
      {errors["name"] && <p> {errors["name"]}</p>}
      <div className="Form_ButtonWrapper">
        <Button 
          type="submit"
          variant="cancel"
        >
          Anuluj
        </Button>
        <Button 
          type="submit"
          variant="success"
        >
          Dodaj
        </Button>
      </div>
    </form>
  )
}