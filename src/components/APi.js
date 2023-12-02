

export default function APi() {
  return (
      fetch(
          'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=437d77e8bd78473a85308f1fa6a90cc0'
      )
          .then(response => response.json())
  )
}
