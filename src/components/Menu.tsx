/* ==========================================================
   THE MENU, for whichever shop the visitor picks.
   The treats and prices are in src/data/menu.ts.
   ========================================================== */
import { menus, type MenuItem } from '../data/menu'
import { storeById, stores } from '../data/shop'
import { matches } from '../lib/search'
import { useLocation } from '../store/location'
import { useMenu } from '../store/menu'

export default function Menu() {
  const { storeId, setStore } = useLocation()
  const { category, query, glutenFreeOnly, setCategory, setQuery, toggleGlutenFree } = useMenu()
  const store = storeById(storeId)
  const categories = menus[storeId]
  // if this shop doesn't have the open tab (croffles are 380 & Coit only), show the first one
  const current = categories.find((c) => c.id === category) ?? categories[0]

  // Searching or "gluten-free only" looks through the whole menu
  const filtering = query.trim() !== '' || glutenFreeOnly
  const results = categories.flatMap((c) =>
    c.items
      .filter((item) => !glutenFreeOnly || item.tags?.includes('gluten-free'))
      .filter((item) => matches(`${item.name} ${item.desc ?? ''} ${c.label}`, query))
      .map((item) => ({ item, section: c.label })),
  )

  return (
    <section className="section menu scallop" id="menu">
      <div className="section-head">
        <p className="eyebrow">the menu</p>
        <h2>Everything we make, <span className="hand">with prices</span></h2>
        <p>Each shop has its own menu. Pick yours:</p>
      </div>

      <div className="store-switch" role="radiogroup" aria-label="Which shop">
        {stores.map((s) => (
          <button
            key={s.id}
            role="radio"
            aria-checked={s.id === storeId}
            aria-label={`${s.name}, ${s.street}`}
            className={s.id === storeId ? 'active' : ''}
            onClick={() => setStore(s.id)}
          >
            <strong>{s.name}</strong>
            <span>{s.street}</span>
          </button>
        ))}
      </div>

      <div className="menu-tools">
        <label className="search">
          <span className="sr-only">Search the menu</span>
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Search: matcha, cheesecake, taro…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className={glutenFreeOnly ? 'chip active' : 'chip'} aria-pressed={glutenFreeOnly} onClick={toggleGlutenFree}>
          🌾 Gluten-free only
        </button>
      </div>

      {!filtering && (
        <div className="tabs" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === current.id}
              className={c.id === current.id ? 'tab active' : 'tab'}
              onClick={() => setCategory(c.id)}
            >
              <span aria-hidden="true">{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>
      )}

      {filtering ? (
        <p className="menu-note">
          {results.length === 0
            ? `Nothing found at ${store.name}. Try another word, or switch shops above.`
            : `${results.length} ${results.length === 1 ? 'treat' : 'treats'} at ${store.name}`}
          {glutenFreeOnly && ' · Macaron shells are made with gluten-free almond flour, too. Ask the shop about fillings.'}
        </p>
      ) : (
        (current.note || current.sizeNote) && (
          <p className="menu-note">
            {current.note} {current.sizeNote && <span className="size-note">{current.sizeNote}</span>}
          </p>
        )
      )}

      {/* key replays the fade-in when the tab or shop changes */}
      <div className="menu-grid" role="tabpanel" key={storeId + current.id + filtering}>
        {filtering
          ? results.map(({ item, section }, i) => <Item key={section + item.name} item={item} section={section} index={i} />)
          : current.items.map((item, i) => <Item key={item.name} item={item} index={i} />)}
      </div>

      <div className="menu-foot">
        <p>
          Prices are from the {store.name} online ordering page and may change.
          Drink prices are for a medium unless shown.
        </p>
        <a className="btn" href={store.orderUrl} target="_blank" rel="noopener">
          Order from {store.name} →
        </a>
      </div>
    </section>
  )
}

function Item({ item, section, index }: { item: MenuItem; section?: string; index: number }) {
  return (
    <article className="menu-item" style={{ animationDelay: Math.min(index, 12) * 40 + 'ms' }}>
      <div className="menu-pic">
        {item.photo
          ? <img src={item.photo} alt="" loading="lazy" width="140" height="140" />
          : <span aria-hidden="true">{item.emoji}</span>}
      </div>
      <div className="menu-body">
        <h3><span>{item.name}</span><span className="price">{item.price}</span></h3>
        {section && <p className="menu-section">{section}</p>}
        {item.desc && <p>{item.desc}</p>}
        {item.sizes && (
          <ul className="sizes">
            {item.sizes.map((size) => <li key={size}>{size}</li>)}
          </ul>
        )}
        {item.tags?.map((tag) => (
          <span key={tag} className={'tag tag-' + tag}>{tag === 'gluten-free' ? 'Gluten-free' : 'Caffeine-free'}</span>
        ))}
      </div>
    </article>
  )
}
