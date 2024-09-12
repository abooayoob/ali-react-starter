import { useMachine } from "@xstate/react";
import React from "react";
import { Button, Form, Input, Label, TextField } from "react-aria-components";
import { helloMachine } from "./hello-machine";

function App() {
  const [state, send] = useMachine(helloMachine);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({
      type: "got name",
      payload: { name: e.currentTarget.theinput.value },
    });
  };
  return (
    <div className="App">
      {state.matches("Show name") && (
        <div>
          <h1>Hello, {state.context.name}!</h1>
          <Button
            onPressUp={() => {
              send("clear name");
            }}
            className="h-fit rounded-sm border-2 border-slate-300 px-2 py-0 outline-none focus-visible:ring-1 focus-visible:ring-slate-300 pressed:bg-slate-600"
          >
            Clear name
          </Button>
        </div>
      )}

      {state.matches("Waiting for name") && (
        <Form className="flex items-end gap-2" onSubmit={handleSubmit}>
          <TextField
            className="flex flex-col items-baseline gap-1"
            name="theinput"
          >
            <Label className="text-sm">Your name</Label>
            <Input className="rounded-sm border-2 border-slate-300 bg-slate-100 px-2 outline-none focus-visible:ring-1 focus-visible:ring-slate-300 dark:border-slate-600 dark:bg-slate-600 dark:text-slate-200" />
          </TextField>
          <Button
            type="submit"
            className="h-fit rounded-sm  border-2 border-slate-300 px-2 py-0 outline-none focus-visible:ring-1 focus-visible:ring-slate-300 pressed:bg-slate-600"
          >
            Submit name
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
