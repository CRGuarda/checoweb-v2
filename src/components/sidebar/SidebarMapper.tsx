import Link from 'next/link'
import { ArrowIcon, ClientIcon, DocumentsIcon, SearchIcon } from '../icons/Icons'
import { useSidebarContext } from '@/components/contexts/SidebarProvider'
import { useToggle } from '@/hooks/useToggle'

const sidebarItems = [
  {
    name: 'Clientes',
    icon: <ClientIcon className='h-6 w-6 mb-1' />,
    path: '#',
    submenu: [{ name: 'Consultar', icon: <SearchIcon className='h-6 w-6 mb-1' />, path: '/clients/search' }],
  },
  {
    name: 'Pagos',
    icon: <DocumentsIcon className='h-6 w-6 mb-1' />,
    path: '#',
    submenu: [
      { name: 'Consultar', icon: <SearchIcon className='h-6 w-6 mb-1' />, path: '/payments/search' },
      { name: 'Registrar', icon: <DocumentsIcon className='h-6 w-6 mb-1' />, path: '/payments/register' },
    ],
  },
  {
    name: 'Perfil?',
    icon: <DocumentsIcon className='h-6 w-6 mb-1' />,
    path: '/profile',
  },
]

export const SidebarMapper = () => {
  const { toggleOpen } = useSidebarContext()
  const { isMatchedKey, setKey } = useToggle()
  return (
    <ul className='text-primary font-bold flex flex-col gap-4'>
      {sidebarItems.map(({ name, icon, submenu, path }, index) => {
        if (submenu) {
          return (
            <div
              key={index}
              className='flex flex-col gap-2 cursor-pointer p-4 hover:bg-indigo-300 rounded-md'
              onClick={() => setKey(name)}
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-3 mt-1.5'>
                  {icon}
                  {name}
                </div>
                <ArrowIcon className={`h-4 w-4 mx-2 ${isMatchedKey(name) && 'rotate-90'}`} />
              </div>
              {isMatchedKey(name) &&
                submenu.map((subItem, subItemIndex) => (
                  <Link
                    key={subItemIndex}
                    href={subItem.path}
                    className='flex gap-3 items-center underline-offset-8 hover:underline ms-5'
                    onClick={() => toggleOpen()}
                  >
                    {subItem.icon}
                    {subItem.name}
                  </Link>
                ))}
            </div>
          )
        }
        return (
          <Link
            href={path}
            key={index}
            className='flex gap-3 items-center underline-offset-8 hover:underline hover:bg-indigo-300 p-4 rounded-md'
            onClick={() => toggleOpen()}
          >
            {icon}
            {name}
          </Link>
        )
      })}
    </ul>
  )
}
