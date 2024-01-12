import Swal, { SweetAlertOptions } from 'sweetalert2'

export const useAlerts = () => {
  const customAlert = async (options: SweetAlertOptions) =>
    Swal.fire({
      icon: 'warning',
      confirmButtonColor: '#49a080',
      heightAuto: false,
      ...options,
    })

  return {
    customAlert,
  }
}
