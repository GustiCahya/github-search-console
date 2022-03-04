export default function thousandSeparator(num) {
  return new Intl.NumberFormat().format(num)
}
