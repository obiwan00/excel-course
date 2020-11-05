import {storage} from '@core/utils';

function toHtml(storageName) {
  const state = storage(storageName)
  const tableId = storageName.split(':')[1]
  const date = new Date(state.lastEdit)
      .toLocaleDateString()
      .replace(/\//g, '.') // replace '/' to '.'
  const time = new Date(state.lastEdit).toLocaleTimeString()
  return `
  <li>
      <a class="db__record" href="#excel/${tableId}">
        <div class="db__title">${state.tableName}</div>
        <div class="db__date">${time} — ${date}</div>
      </a>
  </li>
  `
}

// excel:1234232324
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (keys.length === 0) {
    return `<h2 align="center">No any records</h2>`
  }

  return `
  <div class="db__list-header">
      <span>Name</span>
      <span>Last Edit</span>
  </div>
  <ul class="db__list">
       ${keys.map(toHtml).join('')} 
  </ul>
  `
}
