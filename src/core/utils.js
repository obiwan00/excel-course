// Pure function
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// export function camelCase(string) {
//   if (typeof string !== 'string') {
//     return ''
//   }
//   console.log('input srt: ', string)
//   console.log(
//       'out srt: ',
//       string.split(/[_/-]/g)
//           .map((el, index) => {
//             if (index) return capitalize(el)
//             return el
//           })
//           .join('')
//   )
//   return string.split(/[_/-]/g)
//       .map((el, index) => {
//         if (index) return capitalize(el)
//         return el
//       })
//       .join('')
// }
