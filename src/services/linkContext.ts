import { createContext } from 'react';
type Context = [string, React.Dispatch<React.SetStateAction<string>>]
const LinkContext = createContext<Context>(['/', state => state]);
export default LinkContext