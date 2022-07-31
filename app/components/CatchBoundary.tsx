import {
  Link,
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-page-container">
          <div className="inner-container">
            <div className="status">
              <h2>Status: {caught.status}</h2>
            </div>
            <div className="body">
              <div className="message">
                <span>{caught.data}</span>
              </div>
              <div className="link">
                <Link to="/">Home</Link>
              </div>
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
