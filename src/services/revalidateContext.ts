import { createContext } from 'react';
type Context = { current: null | (() => void) }
const RevalidateContext = createContext<Context>({ current: null });
export default RevalidateContext
export const RevalidateProvider = RevalidateContext.Provider