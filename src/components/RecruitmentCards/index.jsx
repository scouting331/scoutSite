/**
 * @file index.jsx
 * @description A comprehensive recruitment layout displaying dynamic, thematic unit registration cards.
 * Embeds an autoplaying, privacy-enhanced YouTube video above a responsive layout of localized 
 * registration card nodes linking to official Scouting America (BeAScout) rosters.
 * 
 * @module SignUpCards
 * @requires React
 */

import PackPng from '@site/static/img/pack-icon.png'; 
import GirlsPng from '@site/static/img/troop-icon.png';
import BoysPng from '@site/static/img/troop-icon.png';

/**
 * Static schema mapping thematic branding variables and registration links for local Scouting units.
 * @type {Array<{title: string, age: string, link: string, bgColor: string, buttonColor: string, badgeBg: string, imgSrc: string, altText: string}>}
 */
const units = [
  {
    title: "Cub Scout Pack 303",
    age: "Grades K - 5 (Co-ed)",
    link: "https://beascout.scouting.org/list/?zip=46112&program[]=pack&miles=20&unitID=284097",
    bgColor: "var(--cub-scouts-blue)",
    buttonColor: "var(--cub-scouts-gold)",
    badgeBg: "var(--ifm-hover-overlay)",
    imgSrc: PackPng,
    altText: "Cub Scout Pack 303 Emblem"
  },
  {
    title: "Girls Troop 331",
    age: "Ages 11 - 17",
    link: "https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=358986",
    bgColor: "var(--scouts-bsa-olive)", // Official Scouts BSA Olive Green
    buttonColor: "var(--scouts-bsa-tan)",
    badgeBg: "var(--ifm-hover-overlay)",
    imgSrc: GirlsPng,
    altText: "Girls Troop 331 Emblem"
  },
  {
    title: "Boys Troop 303",
    age: "Ages 11 - 17",
    link: "https://beascout.scouting.org/list/?gad_source=1&gad_campaignid=23532089962&zip=46112&program%5B%5D=scoutsBSA&unitID=84066",
    bgColor: "var(--scouts-bsa-olive)", // Official Scouts BSA Olive Green
    buttonColor: "var(--scouts-bsa-tan)",
    badgeBg: "var(--ifm-hover-overlay)",
    imgSrc: BoysPng,
    altText: "Boys Troop 303 Emblem"
  },
];

/**
 * Renders a stylized, interactive unit call-to-action block with custom brand backgrounds 
 * and hover-driven CSS transforms.
 * 
 * @component
 * @private
 * @param {Object} props - Component properties.
 * @param {string} props.title - Full name of the scouting division (e.g., "Girls Troop 331").
 * @param {string} props.age - Targeted youth demographic range description.
 * @param {string} props.link - Direct fallback registration endpoint on BeAScout.org.
 * @param {string} props.bgColor - Hex/RGBA primary card panel background style rule.
 * @param {string} props.buttonColor - Hex/RGBA palette override for the submission anchor button.
 * @param {string} props.badgeBg - Translucent style rule for the target demographic badge tag.
 * @param {string} props.imgSrc - Resolved system file path pointing to the unit's patch emblem.
 * @param {string} props.altText - Accessibility reader description for the branding image asset.
 * @returns {React.JSX.Element} A flexible card node equipped with interactive mouseover scaling filters.
 */
function UnitCard({ title, age, link, bgColor, buttonColor, badgeBg, imgSrc, altText}) {
    return (
        <div style={{
            background: bgColor,
            color: 'var(--scouting-america-white)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 'var(--global-box-shadow)',
            flex: '1 1 280px',
            maxWidth: '330px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={imgSrc} alt={altText} style={{ width: '55px', height: '55px', objectFit: 'contain', marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--scouting-america-white)', fontSize: '1.35rem', margin: '0 0 0.4rem 0', fontWeight: '700', letterSpacing: '-0.025em' }}>
                    {title}
                </h3>
                <span style={{ 
                    display: 'inline-block', 
                    backgroundColor: badgeBg, 
                    color: 'var(--scouting-america-white)',
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.8rem', 
                    fontWeight: '600', 
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {age}
                </span>
            </div>
            
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    width: '100%',
                    display: 'block',
                    backgroundColor: buttonColor,
                    color: 'var(--scouting-america-dark-gray)',
                    fontWeight: '700',
                    padding: '0.8rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    boxShadow: 'var(--global-box-shadow)',
                    transition: 'transform 0.15s ease, filter 0.15s ease',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.filter = 'brightness(1.08)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.filter = 'brightness(1)';
                }}
            >
                Join {title.includes('Pack') ? 'Pack 303' : title.split(' ').slice(1).join(' ')}
            </a>
        </div>
    );
}

/**
 * Primary layout assembly housing the responsive media iframe grid layout and flexbox card grid loop.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.youtubeId - The unique 11-character hash string pointing to a targeted YouTube source video.
 * @returns {React.JSX.Element} An onboarding section combining marketing video frames and deep-linked register utilities.
 */
export default function SignUpCards({ youtubeId }) {
    return (
        
        <div style={{ margin: '2.5rem auto', maxWidth: '1100px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* 1. Video Player Container */}
            <div style={{
                width: '100%',
                maxWidth: '850px',
                margin: '0 auto 2.5rem auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--global-box-shadow)',
                backgroundColor: 'var(--ifm-color-black)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                        src= {`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0`}
                        title="Scouting America Recruitment Video" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

            {/* 2. Unified Grid Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Ready to Register?</h2>
                <p style={{ color: 'var(--ifm-color-emphasis-600)', margin: 0 }}>Select your unit below to sign up online today.</p>
            </div>

            {/* 3. Three-Card Flexbox Grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', width: '100%' }}>
                {units.map((unit, idx) => (
                    <UnitCard key={idx} {...unit} />
                ))}
            </div>

        </div>
    );
}
