// Stable singleton context — lives in its own module so HMR reloads of
// AuthContext.jsx never recreate it, preventing "useAuth outside Provider" crashes.
import { createContext } from 'react';
const AuthContext = createContext(undefined);
export default AuthContext;
