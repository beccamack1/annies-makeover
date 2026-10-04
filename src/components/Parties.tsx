/* ==========================================================
   BIRTHDAY PARTIES. The packages are in src/data/parties.ts.
   ========================================================== */
import { partyPackages, partyRoom } from '../data/parties'
import { email, telLink } from '../data/shop'

export default function Parties() {
  const subject = encodeURIComponent('Birthday party at Annie’s')

  return (
    <section className="section parties scallop" id="parties">
      <div className="parties-intro">
        <p className="eyebrow">parties</p>
        <h2>Birthday parties at Annie’s</h2>
        <p>
          Our party space fits up to {partyRoom.guests} guests and rents for {partyRoom.rent}.{' '}
          <strong>{partyRoom.freeHours}</strong>
        </p>
        <div className="parties-actions">
          <a className="btn" href={`mailto:${email}?subject=${subject}`}>Email us to book</a>
          <a className="btn btn-ghost" href={telLink(partyRoom.bookingPhone)}>Call {partyRoom.bookingPhone}</a>
        </div>
      </div>

      <div className="packages">
        {partyPackages.map((pack) => (
          <article key={pack.name} className="package">
            <h3>{pack.name}</h3>
            <p className="package-price">{pack.price} <span>{pack.per}</span></p>
            <ul>
              {pack.gets.map((thing) => <li key={thing}>{thing}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
