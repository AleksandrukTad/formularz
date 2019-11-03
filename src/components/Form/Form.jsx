import React from "react";
import { TextField } from "../TextField";
import { Button } from "../Button";

export function Form() {
  return (
    <form>
      <TextField labelText="Imię" />
      <TextField labelText="Nazwisko" />
      <TextField labelText="Email" type="email" />
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