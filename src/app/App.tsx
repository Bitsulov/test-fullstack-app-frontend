import { InitProvider } from "./providers/InitProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { StoreProvider } from "./providers/StoreProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<Router>
            <StoreProvider>
                <QueryProvider>
                    <InitProvider>
                        <RouterProvider />
                    </InitProvider>
                </QueryProvider>
            </StoreProvider>
        </Router>
	)
}

export default App;
