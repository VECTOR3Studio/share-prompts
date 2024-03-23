import '@styles/globals.css';

export const metadata = {
    title: "Promtopia",
    description: "Dsicover and share AI Prompts"
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout