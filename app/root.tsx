import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'

import type { MetaFunction, LinksFunction } from 'remix'
import styles from './styles/app.css'
import highlightStyles from 'highlight.js/styles/a11y-dark.css'
import favicon from './favicon.png'
import social from './social.png'
import ExternalLink from './ui/external-link'
import TopBar from './ui/top-bar'

export const meta: MetaFunction = () => {
  return {
    author: 'Seasoned',
    'og:type': 'website',
    'og:image': social,
    'og:site_name': 'Remix Forms',
  }
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: favicon,
      type: 'image/png',
    },
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: highlightStyles },
  ]
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased h-full w-full overflow-x-hidden overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-600 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500">
        <TopBar />
        <div className="min-h-[86.5vh]">
          <Outlet />
        </div>
        <div className="bg-gradient-to-r from-black to-gray-800 text-center text-white p-4">
          Built with ❤️💪🏼 by{' '}
          <ExternalLink href="https://seasoned.cc">Seasoned</ExternalLink>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
