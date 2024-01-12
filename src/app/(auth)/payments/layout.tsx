const PaymentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h1 className='text-center text-xl md:text-4xl font-bold uppercase'>MÓDULO DE PAGOS</h1>
      {children}
    </section>
  )
}
export default PaymentsLayout
