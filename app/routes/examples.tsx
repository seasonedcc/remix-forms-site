import { NavLink, Outlet } from 'remix'
import { Disclosure } from '@headlessui/react'
import { cx } from '~/helpers'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { $path } from 'remix-routes'

const navigation = [{ name: 'The simplest form', to: $path('/examples') }]

export default function Component() {
  return (
    <div className="min-h-[86.5vh] relative">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            {!open && (
              <div className={cx('bg-pink-700 absolute inset-y-0 p-1 w-10')}>
                <Disclosure.Button className="inline-flex items-center justify-center p-1 rounded-md text-pink-900 hover:text-white hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <MenuAlt2Icon className="block h-6 w-6" />
                </Disclosure.Button>
              </div>
            )}
            <Disclosure.Panel>
              <div className="w-[12rem] bg-pink-700 absolute inset-y-0 p-2">
                <div className="flex justify-end p-1">
                  <Disclosure.Button className="inline-flex items-center justify-center p-1 rounded-md text-pink-900 hover:text-white hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <XIcon className="block h-6 w-6" />
                  </Disclosure.Button>
                </div>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      cx(
                        isActive
                          ? 'bg-pink-900 text-white'
                          : 'text-gray-300 hover:bg-pink-900 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
            <div className={cx('pl-10', open && 'md:pl-[12rem]')}>
              <div className="flex flex-col space-y-8 text-gray-200 p-4 sm:p-8">
                <Outlet />
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  )
}
