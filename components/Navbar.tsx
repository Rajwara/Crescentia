/** Navigation used on every page except the home hero. */
const LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "COLLECTION", href: "/#Menu" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar({ current }: { current?: string }) {
  return (
    <section className="navbar-section">
      <div className="w-layout-blockcontainer navbar-container w-container">
        <div className="navbar-block">
          <div data-w-id="80de3bb5-c660-c932-10cc-5c5b1a1795c5" className="navbar-menu-icon">
            <div className="navbar-menu-line _1" />
            <div className="navbar-menu-line _2" />
          </div>
          <div className="navbar-menu-block">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={current === l.href ? "page" : undefined}
                className={`navbar-link${i === 0 ? " first" : ""}${i === LINKS.length - 1 ? " last" : ""}${
                  current === l.href ? " is-current" : ""
                }`}
              >
                ({l.label})
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
