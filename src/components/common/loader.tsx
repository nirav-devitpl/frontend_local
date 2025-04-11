import { IconLoader } from '@tabler/icons-react'

/**
 * @memberof common
 * @name Loader
 * @description 
 * The `Loader` component displays a simple loading spinner
 * @returns {JSX.Element} - The rendered `Loader` component.
 */
export default function Loader() {
  return (
    <div className='w-full h-svh flex justify-center items-center bg-muted'>
      <IconLoader className='animate-spin' size={32} />
      <span className='sr-only'>loading</span>
    </div>
  )
}
