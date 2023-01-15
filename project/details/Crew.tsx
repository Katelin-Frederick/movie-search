
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Button from '../../components/Button'

const Crew = ({ credits, details }) => {
  const router = useRouter()

  return (
    <div className="py-12">
      <h1 className="text-5xl text-white mb-6 text-center">{details.title}</h1>

      <Button
        type="button"
        className="text-black"
        onClick={() => router.push(`/details/movie/${details.id}`)}
      >
        Back to Details
      </Button>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl text-yellow-400 font-rockSalt mt-12 mb-8">Cast</h2>

          <table className="lg:mr-8">
            <thead>
              <th className="text-left text-yellow-400 text-xl p-4">Actor</th>
              <th className="text-left text-yellow-400 text-xl p-4">Character</th>
            </thead>
            <tbody className="text-white">
              {
                credits.cast.map((person, index) => (
                  <tr
                    className={clsx(
                      index % 2 === 0 ? 'bg-light-gray' : 'bg-gray'
                    )}
                  >
                    <td
                      className={clsx(
                        'p-4 border-r-2 border-lightest-gray',
                        index === 0 && 'rounded-tl-md',
                        index === credits.cast.length - 1 ? 'rounded-bl-md' : 'border-b-2 border-lightest-gray'
                      )}
                    >
                      {person.name}
                    </td>
                    <td
                      className={clsx(
                        'p-4',
                        index === 0 && 'rounded-tr-md',
                        index === credits.cast.length - 1 ? 'rounded-br-md' : 'border-b-2 border-lightest-gray'
                      )}
                    >
                      {person.character}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="flex flex-col">
          <h2 className="text-3xl text-yellow-400 font-rockSalt mt-12 mb-8">Crew</h2>

          <table>
            <thead>
              <th className="text-left text-yellow-400 text-xl p-4">Crew Member</th>
              <th className="text-left text-yellow-400 text-xl p-4">Title</th>
            </thead>
            <tbody className="text-white">
              {
                credits.crew.map((person, index) => (
                  <tr
                    className={clsx(
                      index % 2 === 0 ? 'bg-light-gray' : 'bg-gray'
                    )}
                  >
                    <td
                      className={clsx(
                        'p-4 border-r-2 border-lightest-gray',
                        index === 0 && 'rounded-tl-md',
                        index === credits.crew.length - 1 ? 'rounded-bl-md' : 'border-b-2 border-lightest-gray'
                      )}
                    >
                      {person.name}
                    </td>
                    <td
                      className={clsx(
                        'p-4',
                        index === 0 && 'rounded-tr-md',
                        index === credits.crew.length - 1 ? 'rounded-br-md' : 'border-b-2 border-lightest-gray'
                      )}
                    >
                      {person.job}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Crew
