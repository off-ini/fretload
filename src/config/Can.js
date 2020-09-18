import { createCanBoundTo } from "@casl/react"
import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import ability from "./ability"


export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export default createCanBoundTo(ability)