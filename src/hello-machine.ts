import { createMachine, assign } from "xstate";

export const helloMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHV1cAXAqAAgDMB7AJzv3VTAGIomr2nMAG0ADAF1EoAA5NY1XE3xSQAD0QAmAJwkNGgOxat+gGxaT+gCxaAzJYA0IAJ6IAtDZskAHOcuiTojai+hoAjF42AKwAvtGOaFh4hKQAythMAO6CXNyYADZg6GwcXGKSSCCy8jRKKuoIll4koeahoYF+XqGRWl6OLgjdOl6W1nbtLfqBGrFxIPhMEHAqCTgExCpVCrUV9a7hTZFdfhqWkaFjof1uoWG6LTYtkdoaNibdsfEYa8nklDT4ejMYpCTZybbKXY3PwkI4XUSnc6Xa4ICIkfRvcKhEJHKZeEyfECrJLEEhpTLZMBg6qKSGgerYkzonq3c5edmWC4otEY95dHFePFeWbRIA */
    id: `hello`,
    context: {
      name: "",
    },
    schema: {
      context: {} as {
        name: string;
      },
      events: {} as
        | { type: "got name"; payload: { name: string } }
        | { type: "clear name" },
    },

    tsTypes: {} as import("./hello-machine.typegen").Typegen0,

    states: {
      "Waiting for name": {
        on: {
          "got name": {
            target: "Show name",
            actions: "assign name",
          },
        },
      },

      "Show name": {
        on: {
          "clear name": {
            target: "Waiting for name",
            actions: "clear name",
          },
        },
      },
    },

    initial: "Waiting for name",
  },
  {
    actions: {
      "assign name": assign({
        name: (_context, event) => event.payload.name,
      }),
      "clear name": assign({
        name: (_context, _event) => "",
      }),
    },
  },
);
