import { createContext, useState } from "react";

// this is the context file where we will create the context and will export it so that we can use it in other components and will also create a provider component that will wrap the App component and will provide the state and setState function to the child components so that we can access the state and setState function in the child components without prop drilling
export const TaskContext = createContext({
    taskList: [],
    setTaskList: () => {},
});