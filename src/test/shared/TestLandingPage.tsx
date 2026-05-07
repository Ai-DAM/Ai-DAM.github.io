import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import CustomCursor from "../../components/CustomCursor";
import companyIcon from "../assets/Header/Company.svg";
import contactIcon from "../assets/Header/Contact.svg";
import experienceIcon from "../assets/Header/EXPERIENCE.svg";
import danceIcon from "../assets/Header/K-me Dance.svg";
import visionAiIcon from "../assets/Header/K-me VisionAI.svg";
import logoIcon from "../assets/Header/K-me_Logo.svg";

const headerButtons = [
  {
    label: "K-me Dance",
    icon: danceIcon,
    href: "/test/k-me-dance/",
    top: "35.4%",
    right: "34.375%",
    width: "5.208333%",
    aspectRatio: "75 / 20",
  },
  {
    label: "K-me VisionAI",
    icon: visionAiIcon,
    href: "/test/k-me-visionai/",
    top: "35%",
    right: "22.430556%",
    width: "6.041667%",
    aspectRatio: "87 / 20",
  },
  {
    label: "EXPERIENCE",
    icon: experienceIcon,
    href: "/test/experience/",
    top: "35%",
    right: "11.805556%",
    width: "5.138889%",
    aspectRatio: "74 / 20",
  },
  {
    label: "Contact",
    icon: contactIcon,
    href: "/test/contact/",
    top: "35%",
    right: "3.333333%",
    width: "3.75%",
    aspectRatio: "54 / 20",
  },
] as const;

const companyButton = {
  label: "Company",
  icon: companyIcon,
  top: "35%",
  right: "45%",
  width: "4.097222%",
  aspectRatio: "59 / 20",
} as const;

const companySubmenuItems = [
  { label: "What is K-me", href: "/test/company-what-is-k-me/" },
  { label: "Business", href: "/test/company-business/" },
  { label: "Introduction", href: "/test/company_Introduction/" },
] as const;

const logoButtonStyle: CSSProperties = {
  left: "2.847222%",
  top: "35%",
  width: "5.625%",
  aspectRatio: "81 / 25",
};

const PAGE_TRANSITION_STORAGE_KEY = "kme-test-page-transition";
const PAGE_TRANSITION_DURATION_MS = 220;
const TEST_LOGO_HOME_HREF = "/test/company-what-is-k-me/";

type PositionedHeaderItem = {
  top: string;
  right: string;
  width: string;
  aspectRatio: string;
};

function getHeaderButtonStyle(button: PositionedHeaderItem): CSSProperties {
  return {
    right: button.right,
    top: button.top,
    width: button.width,
    aspectRatio: button.aspectRatio,
  };
}

type TestLandingPageProps = {
  backgroundImage?: string;
  backgroundAlt?: string;
  customMedia?: ReactNode;
  children?: ReactNode;
};

export default function TestLandingPage({ backgroundImage, backgroundAlt, customMedia, children }: TestLandingPageProps) {
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCompanyMenuOpen, setMobileCompanyMenuOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const companyMenuRef = useRef<HTMLDivElement | null>(null);
  const companyCloseTimeoutRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  function clearCompanyCloseTimeout() {
    if (companyCloseTimeoutRef.current !== null) {
      window.clearTimeout(companyCloseTimeoutRef.current);
      companyCloseTimeoutRef.current = null;
    }
  }

  useEffect(() => {
    if (!companyMenuOpen && !mobileMenuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setCompanyMenuOpen(false);
        setMobileMenuOpen(false);
        setMobileCompanyMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCompanyMenuOpen(false);
        setMobileMenuOpen(false);
        setMobileCompanyMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [companyMenuOpen, mobileMenuOpen]);

  useEffect(() => () => clearCompanyCloseTimeout(), []);

  useEffect(() => {
    try {
      window.sessionStorage.removeItem(PAGE_TRANSITION_STORAGE_KEY);
    } catch {
      // ignore storage failures
    }

    const raf = window.requestAnimationFrame(() => {
      setContentVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(raf);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  function closeMenus() {
    clearCompanyCloseTimeout();
    setCompanyMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileCompanyMenuOpen(false);
  }

  function navigateWithContentTransition(href: string) {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    closeMenus();
    setContentVisible(false);

    try {
      window.sessionStorage.setItem(PAGE_TRANSITION_STORAGE_KEY, "1");
    } catch {
      // ignore storage failures
    }

    transitionTimerRef.current = window.setTimeout(() => {
      window.location.assign(href);
    }, PAGE_TRANSITION_DURATION_MS);
  }

  function handleInternalAnchorClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const nextUrl = new URL(href, window.location.origin);

    if (nextUrl.origin !== window.location.origin) {
      return;
    }

    if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search && nextUrl.hash === window.location.hash) {
      closeMenus();
      return;
    }

    event.preventDefault();
    navigateWithContentTransition(nextUrl.toString());
  }

  function handlePageClickCapture(event: React.MouseEvent<HTMLElement>) {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const anchor = target.closest("a[href]");

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    if (anchor.target && anchor.target !== "_self") {
      return;
    }

    if (anchor.hasAttribute("download")) {
      return;
    }

    handleInternalAnchorClick(event as React.MouseEvent<HTMLAnchorElement>, anchor.href);
  }

  function handleLogoClick() {
    navigateWithContentTransition(TEST_LOGO_HOME_HREF);
  }

  function openDesktopCompanyMenu() {
    clearCompanyCloseTimeout();
    setCompanyMenuOpen(true);
  }

  function closeDesktopCompanyMenu() {
    clearCompanyCloseTimeout();
    companyCloseTimeoutRef.current = window.setTimeout(() => {
      setCompanyMenuOpen(false);
      companyCloseTimeoutRef.current = null;
    }, 140);
  }

  return (
    <main className="kme-test-page" onClickCapture={handlePageClickCapture}>
      <CustomCursor />

      <header ref={headerRef} className="kme-test-header" aria-label="K-me header">
        <div className="kme-test-header__inner">
          <button
            aria-label="K-me home"
            className="kme-test-header__button kme-test-header__button--logo"
            style={logoButtonStyle}
            type="button"
            onClick={handleLogoClick}
          >
            <img alt="K-me logo" className="kme-test-header__icon" src={logoIcon} />
          </button>

          <button
            aria-expanded={mobileMenuOpen}
            aria-label="Open navigation menu"
            className="kme-test-header__mobile-toggle"
            type="button"
            onClick={() => {
              setMobileMenuOpen((value) => !value);
              setCompanyMenuOpen(false);
            }}
          >
            <span className="kme-test-header__mobile-toggle-line" />
            <span className="kme-test-header__mobile-toggle-line" />
            <span className="kme-test-header__mobile-toggle-line" />
          </button>

          <div
            ref={companyMenuRef}
            className="kme-test-header__company kme-test-header__desktop-item"
            style={getHeaderButtonStyle(companyButton)}
            onMouseEnter={openDesktopCompanyMenu}
            onMouseLeave={closeDesktopCompanyMenu}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                closeDesktopCompanyMenu();
              }
            }}
          >
            <button
              aria-expanded={companyMenuOpen}
              aria-haspopup="menu"
              aria-label="Company"
              className="kme-test-header__button"
              type="button"
              onFocus={openDesktopCompanyMenu}
            >
              <img alt="Company" className="kme-test-header__icon" src={companyIcon} />
            </button>

            {companyMenuOpen && (
              <div className="kme-test-header__submenu" role="menu" aria-label="Company pages">
                {companySubmenuItems.map((item) => (
                  <a
                    key={item.href}
                    className="kme-test-header__submenu-link"
                    href={item.href}
                    role="menuitem"
                    onClick={(event) => handleInternalAnchorClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {headerButtons.map((item) => (
            <a
              key={item.label}
              aria-label={item.label}
              className="kme-test-header__button kme-test-header__desktop-item"
              href={item.href}
              style={getHeaderButtonStyle(item)}
              onClick={(event) => handleInternalAnchorClick(event, item.href)}
            >
              <img alt={item.label} className="kme-test-header__icon" src={item.icon} />
            </a>
          ))}

          {mobileMenuOpen && (
            <div className="kme-test-header__mobile-panel" role="dialog" aria-label="Site navigation">
              <button
                aria-expanded={mobileCompanyMenuOpen}
                className="kme-test-header__mobile-link kme-test-header__mobile-link--toggle"
                type="button"
                onClick={() => setMobileCompanyMenuOpen((value) => !value)}
              >
                <span>Company</span>
                <span className="kme-test-header__mobile-caret">{mobileCompanyMenuOpen ? "−" : "+"}</span>
              </button>

              {mobileCompanyMenuOpen && (
                <div className="kme-test-header__mobile-submenu">
                  {companySubmenuItems.map((item) => (
                    <a
                      key={item.href}
                      className="kme-test-header__mobile-sublink"
                      href={item.href}
                      onClick={(event) => handleInternalAnchorClick(event, item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {headerButtons.map((item) => (
                <a
                  key={item.href}
                  className="kme-test-header__mobile-link"
                  href={item.href}
                  onClick={(event) => handleInternalAnchorClick(event, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className={["kme-test-page__media", contentVisible ? "kme-test-page__media--visible" : ""].filter(Boolean).join(" ")}>
        {customMedia ? (
          customMedia
        ) : (
          <>
            {backgroundImage ? <img className="kme-test-page__image" src={backgroundImage} alt={backgroundAlt ?? ""} /> : null}
            {children ? <div className="kme-test-page__overlay">{children}</div> : null}
          </>
        )}
      </div>
    </main>
  );
}
