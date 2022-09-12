export default function dateFilter(value) {
  return new Date(value).toLocaleDateString('ru-RU')
}