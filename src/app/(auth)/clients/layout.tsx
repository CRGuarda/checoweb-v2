const ClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h1 className='text-center text-xl md:text-4xl font-bold uppercase'>MÓDULO DE CLIENTES</h1>
      {children}
    </section>
  )
}
export default ClientsLayout
