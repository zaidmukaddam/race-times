import Layout from '@components/Layout'
import { ExternalLink } from 'react-feather'

const Page = () => {

  const tools = [
    {
      name: 'Figma',
      use: 'Quick sketching',
      link: 'https://figma.com/',
    }, {
      name: 'Next.js',
      use: 'Front-end',
      link: 'https://nextjs.org/',
    }, {
      name: 'Tailwind CSS',
      use: 'Styling',
      link: 'https://tailwindcss.com/',
    }, {
      name: 'Framer Motion',
      use: 'Animation',
      link: 'https://www.framer.com/motion/',
    }, {
      name: 'Ergast Developer API',
      use: 'Data',
      link: 'http://ergast.com/mrd/',
    }
  ]

  return (
    <Layout>
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-600">
        <div className="flex flex-col w-full px-6 py-12 max-w-screen-lg mx-auto">
          <h1 className="text-3xl md:text-5xl font-black">About</h1>
        </div>
      </div>
      <div className="px-4 py-12 layout">
        <h4 className="font-bold my-4 text-lg">Race Times is a project to help fellow Formula 1 fans figure out the time for an upcoming grand prix in your local time.</h4>
        <p>Race Times is open-source and built using a few helpful tools:</p>
        <ul className="my-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {
            tools.map((item,i) => (
              <li>
                <a className="button flex button-block justify-between px-4 py-2 items-center" href={item.link} target="_blank">
                  <ExternalLink size={16}/>
                  <div className="flex flex-col flex-1 pl-4">
                    <strong>{item.name}</strong>
                    <span className="text-xs lg:text-sm font-mono font-normal mt-1 text-mono-black-60 dark:text-mono-white-60">{item.use}</span>
                  </div>
                </a>
              </li>
            ))
          }
        </ul>
        <p>Want to contribute?</p>
        <a className="link" href="https://github.com/zaidmukaddam/race-times">Contribute on GitHub</a>
      </div>
    </Layout>
  )
}

export default Page
