import { Disclosure, Popover } from '@headlessui/react'
import { cx } from '~/helpers'
import { MenuAlt2Icon, MenuAlt3Icon, XIcon } from '@heroicons/react/outline'
import { RemixNavLinkProps } from '@remix-run/react/components'
import UINavLink from '~/ui/nav-link'
import React from 'react'

type SidebarType = 'disclosure' | 'popover'

type NavProps = {
  type?: SidebarType
  close?: Function
} & JSX.IntrinsicElements['nav']

function Nav({ children, type = 'disclosure', close, ...props }: NavProps) {
  const Panel = type === 'disclosure' ? Disclosure.Panel : Popover.Panel
  const Button = type === 'disclosure' ? Disclosure.Button : Popover.Button
  const Icon = type === 'disclosure' ? MenuAlt3Icon : XIcon

  return (
    <Panel as="nav" {...props}>
      <div className="w-[12rem] bg-pink-600 absolute inset-y-0 p-2">
        <div className="flex justify-end p-1">
          <Button className="inline-flex items-center justify-center p-1 rounded-md text-pink-900 hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <Icon className="block h-6 w-6" />
          </Button>
        </div>
        <div className="-mt-4 flex flex-col space-y-2">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child

            if (child.type === NavLink) {
              return React.cloneElement(child, { type, close })
            }

            return child
          })}
        </div>
      </div>
    </Panel>
  )
}

function NavTitle({ className, ...props }: JSX.IntrinsicElements['h4']) {
  return (
    <h4 className={cx('text-pink-900 font-medium', className)} {...props} />
  )
}

type NavLinkProps = {
  type?: SidebarType
  close?: Function
} & RemixNavLinkProps

function NavLink({
  className,
  type = 'disclosure',
  close = () => {},
  ...props
}: NavLinkProps) {
  return (
    <UINavLink
      className={({ isActive }) =>
        cx(
          isActive ? 'bg-pink-900' : 'hover:bg-pink-700',
          typeof className === 'function' ? className({ isActive }) : className,
        )
      }
      onClick={type === 'popover' ? () => close() : undefined}
      {...props}
    />
  )
}

type ContentProps = { open?: boolean } & JSX.IntrinsicElements['div']

function Content({ children, open = false, ...props }: ContentProps) {
  return (
    <div className={cx('pl-10', open && 'md:pl-[12rem]')} {...props}>
      {children}
    </div>
  )
}

function Closed({ type }: { type: SidebarType }) {
  const Button = type === 'disclosure' ? Disclosure.Button : Popover.Button

  return (
    <div className={cx('bg-pink-600 absolute inset-y-0 p-1 w-10')}>
      <div className="h-full relative">
        <Button className="sticky top-0 inline-flex items-center justify-center p-1 rounded-md text-pink-900 hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <MenuAlt2Icon className="block h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

type MapChildren = {
  children: React.ReactNode
  type: SidebarType
  open: boolean
  close: Function
}

function mapChildren({ children, type, open, close }: MapChildren) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    if (child.type === Nav) {
      return React.cloneElement(child, { type, close })
    }

    if (child.type === Content) {
      return React.cloneElement(child, { open })
    }

    return child
  })
}

function SidebarRoot({
  children,
  className,
  ...props
}: JSX.IntrinsicElements['div']) {
  return (
    <>
      <Disclosure
        as="div"
        defaultOpen
        className={cx('hidden md:block', className)}
        {...props}
      >
        {({ open, close }) => (
          <>
            {!open && <Closed type="disclosure" />}
            {mapChildren({ children, type: 'disclosure', open, close })}
          </>
        )}
      </Disclosure>
      <Popover as="div" className={cx('md:hidden', className)} {...props}>
        {({ open, close }) => (
          <>
            {!open && <Closed type="popover" />}
            {mapChildren({ children, type: 'popover', open, close })}
          </>
        )}
      </Popover>
    </>
  )
}

const Sidebar = Object.assign(SidebarRoot, { Nav, NavTitle, NavLink, Content })

export default Sidebar
