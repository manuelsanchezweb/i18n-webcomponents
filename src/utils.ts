export function flattenObject(
  obj: any,
  parentKey: string = '',
  result: { [key: string]: string } = {}
): { [key: string]: string } {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}-${key}` : key

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], newKey, result)
    } else {
      result[camelToKebab(newKey)] = obj[key]
    }
  }
  return result
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
