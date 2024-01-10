import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"


  
function MessageBox({ people, setPerson }:any) {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person:any) => (
          <li key={person.email} className="hover:bg-gray-50 cursor-pointer rounded-md flex justify-between gap-x-6 py-5 px-2" onClick={() => setPerson(person.email)}>
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )
  }
  
export default function InboxList({ people, setPerson }:any) {
    return (
        <div className="px-4 py-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            {/* Searchbox  */}
            <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="block w-full pl-1 rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

      </div>
      <MessageBox people={people} setPerson={setPerson}/>
        </div>
    )
}