import { Button, Spinner } from 'flowbite-react'


export default function AppButton({children , isLoading , ...props}) {
  return (
    <Button {...props} >
        { isLoading && <Spinner size="sm" aria-label="Info spinner example" className="me-3" light />}
        {children}</Button>
  )
}
