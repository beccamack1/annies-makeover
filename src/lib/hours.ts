import type { Store } from '../data/shop'

// The shops are in Frisco, so always use Texas time,
// even if someone visits the site from somewhere else.
const TIMEZONE = 'America/Chicago'

function texasNow(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// "9 PM", "10:30 AM"
export function friendlyTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const hour = h % 12 || 12
  return `${hour}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`
}

// { open: true, text: 'Open now · until 9 PM' }
export function openStatus(store: Store, now = new Date()) {
  const { day, minutes } = texasNow(now)
  const today = store.hours[day]
  const opens = toMinutes(today.open)
  const closes = toMinutes(today.close)
  if (minutes >= opens && minutes < closes) {
    return { open: true, text: `Open now · until ${friendlyTime(today.close)}` }
  }
  if (minutes < opens) {
    return { open: false, text: `Closed · opens ${friendlyTime(today.open)}` }
  }
  const tomorrow = store.hours[(day + 1) % 7]
  return { open: false, text: `Closed · opens ${friendlyTime(tomorrow.open)} tomorrow` }
}
