import '@styles/globals.css';

const https = require('https');
https.globalAgent.options.rejectUnauthorized = false;

import Nav from '@components/Nav'
import Provider from "@components/Provider"

export const metadata = {
    title: "Promtopia",
    description: "Dsicover and share AI Prompts"
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
        <body>
        <Provider>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
        </Provider>
        </body>
    </html>
  )
}

export default Rootlayout