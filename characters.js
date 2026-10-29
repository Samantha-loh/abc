// Cute Cartoon Characters & Map Shapes inspired by Dan's Countries & Stack the Countries
// High-vibrancy SVG characters with cute googly eyes, smiles, and animations

export function getCharacterSvg(type = 'earth', size = 180) {
  // Returns SVG string for the requested character
  switch (type) {
    case 'earth':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <defs>
            <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#64D2FF"/>
              <stop offset="50%" stop-color="#0A84FF"/>
              <stop offset="100%" stop-color="#0040DD"/>
            </radialGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#0066FF" flood-opacity="0.4"/>
            </filter>
          </defs>
          <!-- Earth Globe -->
          <circle cx="100" cy="100" r="82" fill="url(#earthGrad)" filter="url(#softGlow)"/>
          
          <!-- Green Continents -->
          <path d="M 50 65 Q 70 45 95 50 Q 110 55 105 75 Q 90 90 70 85 Q 50 85 50 65 Z" fill="#30D158" opacity="0.95"/>
          <path d="M 120 70 Q 145 60 160 80 Q 155 105 130 115 Q 115 100 120 70 Z" fill="#30D158" opacity="0.95"/>
          <path d="M 75 110 Q 95 105 105 125 Q 100 150 80 155 Q 65 145 75 110 Z" fill="#30D158" opacity="0.95"/>
          <path d="M 130 135 Q 150 130 155 150 Q 140 160 128 150 Z" fill="#30D158" opacity="0.95"/>

          <!-- Adorable Googly Eyes -->
          <g class="character-eyes">
            <!-- Left Eye -->
            <ellipse cx="78" cy="92" rx="14" ry="18" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
            <circle cx="82" cy="94" r="7.5" fill="#1C1C1E" class="eye-pupil"/>
            <circle cx="85" cy="89" r="3.2" fill="#FFFFFF"/>
            <!-- Right Eye -->
            <ellipse cx="122" cy="92" rx="14" ry="18" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
            <circle cx="126" cy="94" r="7.5" fill="#1C1C1E" class="eye-pupil"/>
            <circle cx="129" cy="89" r="3.2" fill="#FFFFFF"/>
          </g>

          <!-- Rosy Cheeks -->
          <ellipse cx="60" cy="110" rx="8" ry="5" fill="#FF453A" opacity="0.5"/>
          <ellipse cx="140" cy="110" rx="8" ry="5" fill="#FF453A" opacity="0.5"/>

          <!-- Cheerful Smile -->
          <path d="M 85 115 Q 100 132 115 115" stroke="#1C1C1E" stroke-width="3.5" fill="#FF375F" stroke-linecap="round"/>
        </svg>
      `;

    case 'africa':
      return `
        <svg viewBox="0 0 200 220" width="${size}" height="${size}" class="cartoon-char animate-float">
          <defs>
            <filter id="africaShadow">
              <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#FF9F0A" flood-opacity="0.35"/>
            </filter>
          </defs>
          <!-- Stylized Africa Continent Shape with friendly patchwork colors -->
          <path d="M 50 45 C 75 35 130 35 155 50 C 170 70 175 100 150 120 C 135 140 125 175 105 195 C 95 200 85 190 85 170 C 80 145 65 130 50 115 C 30 100 35 60 50 45 Z" 
                fill="#FFD60A" stroke="#FF9F0A" stroke-width="4" filter="url(#africaShadow)"/>
          
          <!-- Madagascar Friend -->
          <path d="M 165 145 C 170 140 178 150 175 170 C 172 185 166 185 163 175 C 160 165 162 150 165 145 Z" fill="#FF9F0A" stroke="#D97706" stroke-width="2"/>
          <circle cx="168" cy="158" r="2.5" fill="#1C1C1E"/>
          <circle cx="172" cy="158" r="2.5" fill="#1C1C1E"/>
          <path d="M 168 165 Q 170 168 172 165" stroke="#1C1C1E" stroke-width="1.2" fill="none"/>

          <!-- Googly Eyes -->
          <g class="character-eyes">
            <ellipse cx="85" cy="85" rx="14" ry="17" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
            <circle cx="89" cy="87" r="7" fill="#1C1C1E"/>
            <circle cx="92" cy="83" r="3" fill="#FFFFFF"/>
            <ellipse cx="120" cy="85" rx="14" ry="17" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
            <circle cx="124" cy="87" r="7" fill="#1C1C1E"/>
            <circle cx="127" cy="83" r="3" fill="#FFFFFF"/>
          </g>
          <!-- Cheeks & Happy Smile -->
          <circle cx="70" cy="98" r="6" fill="#FF453A" opacity="0.4"/>
          <circle cx="135" cy="98" r="6" fill="#FF453A" opacity="0.4"/>
          <path d="M 92 102 Q 102 118 113 102" stroke="#1C1C1E" stroke-width="3" fill="#FF375F" stroke-linecap="round"/>
          <!-- Little Safari Star -->
          <path d="M 140 65 L 143 73 L 151 73 L 145 78 L 147 86 L 140 81 L 133 86 L 135 78 L 129 73 L 137 73 Z" fill="#FF453A"/>
        </svg>
      `;

    case 'antarctica':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <!-- Ice Cap Shape -->
          <path d="M 35 110 C 30 75 70 50 110 50 C 150 50 175 75 165 115 C 160 145 125 155 100 150 C 70 155 40 140 35 110 Z" 
                fill="#E0F7FA" stroke="#4DD0E1" stroke-width="4"/>
          <!-- Little Penguin buddy -->
          <ellipse cx="150" cy="85" rx="12" ry="16" fill="#1C1C1E"/>
          <ellipse cx="150" cy="88" rx="8" ry="11" fill="#FFFFFF"/>
          <polygon points="148,85 152,85 150,89" fill="#FF9F0A"/>
          <circle cx="147" cy="80" r="1.5" fill="#1C1C1E"/>
          <circle cx="153" cy="80" r="1.5" fill="#1C1C1E"/>

          <!-- Googly Eyes with Earmuffs -->
          <path d="M 68 85 C 68 60 132 60 132 85" stroke="#FF2D55" stroke-width="5" fill="none"/>
          <circle cx="68" cy="85" r="10" fill="#FF2D55"/>
          <circle cx="132" cy="85" r="10" fill="#FF2D55"/>
          <ellipse cx="85" cy="95" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
          <circle cx="89" cy="97" r="6.5" fill="#1C1C1E"/>
          <circle cx="92" cy="93" r="2.8" fill="#FFFFFF"/>
          <ellipse cx="115" cy="95" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
          <circle cx="119" cy="97" r="6.5" fill="#1C1C1E"/>
          <circle cx="122" cy="93" r="2.8" fill="#FFFFFF"/>
          <!-- Cute Smile -->
          <path d="M 94 112 Q 100 122 106 112" stroke="#1C1C1E" stroke-width="3" fill="#FF375F" stroke-linecap="round"/>
        </svg>
      `;

    case 'italy':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <!-- Boot Shape of Italy -->
          <path d="M 70 40 L 105 50 L 120 90 L 140 120 L 165 140 L 155 160 L 125 155 L 120 135 L 100 110 L 80 85 Z" 
                fill="#34C759" stroke="#248A3D" stroke-width="4"/>
          <!-- Sicily Soccer Ball kicking -->
          <circle cx="170" cy="175" r="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="3"/>
          <polygon points="170,165 178,172 175,181 165,181 162,172" fill="#1C1C1E"/>
          
          <!-- Boot Eyes -->
          <ellipse cx="98" cy="75" rx="10" ry="13" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="101" cy="76" r="5" fill="#1C1C1E"/>
          <ellipse cx="118" cy="78" rx="10" ry="13" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="121" cy="79" r="5" fill="#1C1C1E"/>
          <path d="M 104 94 Q 112 102 118 94" stroke="#1C1C1E" stroke-width="2.5" fill="#FF375F" stroke-linecap="round"/>
          <text x="75" y="180" font-family="sans-serif" font-weight="bold" font-size="20">🍕</text>
        </svg>
      `;

    case 'japan':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <!-- Mount Fuji with Snow Peak and Red Sun -->
          <circle cx="100" cy="65" r="35" fill="#FF3B30" opacity="0.9"/>
          <!-- Fuji Mountain -->
          <polygon points="100,60 40,165 160,165" fill="#0A84FF" stroke="#0055D4" stroke-width="3"/>
          <polygon points="100,60 75,105 90,100 100,108 112,100 125,105" fill="#FFFFFF"/>
          <!-- Eyes -->
          <ellipse cx="88" cy="125" rx="10" ry="14" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="91" cy="126" r="5.5" fill="#1C1C1E"/>
          <circle cx="93" cy="123" r="2.2" fill="#FFFFFF"/>
          <ellipse cx="112" cy="125" rx="10" ry="14" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="115" cy="126" r="5.5" fill="#1C1C1E"/>
          <circle cx="117" cy="123" r="2.2" fill="#FFFFFF"/>
          <path d="M 94 142 Q 100 148 106 142" stroke="#1C1C1E" stroke-width="2.5" fill="#FF375F" stroke-linecap="round"/>
          <circle cx="78" cy="135" r="5" fill="#FF453A" opacity="0.6"/>
          <circle cx="122" cy="135" r="5" fill="#FF453A" opacity="0.6"/>
          <text x="145" y="165" font-size="24">🚅</text>
        </svg>
      `;

    case 'ocean':
    case 'pacific':
    case 'arctic':
    case 'indianocean':
    case 'southernocean':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38E54D"/>
              <stop offset="40%" stop-color="#00D2FF"/>
              <stop offset="100%" stop-color="#0066FF"/>
            </linearGradient>
          </defs>
          <!-- Happy Water Droplet / Wave Body -->
          <path d="M 100 35 C 145 80 165 115 165 140 C 165 175 135 185 100 185 C 65 185 35 175 35 140 C 35 115 55 80 100 35 Z" 
                fill="url(#oceanGrad)" stroke="#0040DD" stroke-width="3"/>
          <!-- Little playful whale spout / splash on top -->
          <path d="M 95 30 Q 85 15 75 20 Q 88 28 95 30 Z" fill="#64D2FF"/>
          <path d="M 105 30 Q 115 15 125 20 Q 112 28 105 30 Z" fill="#64D2FF"/>
          <!-- Friendly Big Eyes -->
          <ellipse cx="80" cy="120" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
          <circle cx="84" cy="122" r="7" fill="#1C1C1E"/>
          <circle cx="87" cy="118" r="3" fill="#FFFFFF"/>
          <ellipse cx="120" cy="120" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2.5"/>
          <circle cx="124" cy="122" r="7" fill="#1C1C1E"/>
          <circle cx="127" cy="118" r="3" fill="#FFFFFF"/>
          <!-- Big open joyful mouth -->
          <path d="M 88 142 Q 100 160 112 142 Z" fill="#FF375F" stroke="#1C1C1E" stroke-width="2"/>
          <!-- Floating bubbles -->
          <circle cx="50" cy="90" r="7" fill="#E0F7FA" opacity="0.7"/>
          <circle cx="150" cy="80" r="9" fill="#E0F7FA" opacity="0.7"/>
        </svg>
      `;

    case 'australia':
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <!-- Australia Continent Outline -->
          <path d="M 50 85 C 55 65 85 75 110 55 C 135 60 155 75 160 100 C 165 125 155 145 130 155 C 105 165 75 155 60 145 C 45 130 40 105 50 85 Z" 
                fill="#FF9F0A" stroke="#D97706" stroke-width="4"/>
          <!-- Kangaroo ears on top -->
          <ellipse cx="80" cy="55" rx="8" ry="16" fill="#FF9F0A" stroke="#D97706" stroke-width="2" transform="rotate(-15, 80, 55)"/>
          <ellipse cx="120" cy="55" rx="8" ry="16" fill="#FF9F0A" stroke="#D97706" stroke-width="2" transform="rotate(15, 120, 55)"/>
          <!-- Eyes -->
          <ellipse cx="85" cy="100" rx="11" ry="15" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="88" cy="102" r="6" fill="#1C1C1E"/>
          <circle cx="91" cy="98" r="2.5" fill="#FFFFFF"/>
          <ellipse cx="115" cy="100" rx="11" ry="15" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="118" cy="102" r="6" fill="#1C1C1E"/>
          <circle cx="121" cy="98" r="2.5" fill="#FFFFFF"/>
          <!-- Smile -->
          <path d="M 92 120 Q 100 130 108 120" stroke="#1C1C1E" stroke-width="2.5" fill="#FF375F" stroke-linecap="round"/>
          <text x="135" y="150" font-size="22">🦘</text>
        </svg>
      `;

    default:
      // Generic cheerful cartoon geography mascot with vibrant badge
      return `
        <svg viewBox="0 0 200 200" width="${size}" height="${size}" class="cartoon-char animate-float">
          <defs>
            <linearGradient id="charGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF5E3A"/>
              <stop offset="50%" stop-color="#FF2A68"/>
              <stop offset="100%" stop-color="#FF5964"/>
            </linearGradient>
          </defs>
          <rect x="40" y="40" width="120" height="120" rx="35" fill="url(#charGrad)" stroke="#FFFFFF" stroke-width="4"/>
          <!-- Eyes -->
          <ellipse cx="80" cy="90" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="83" cy="92" r="6.5" fill="#1C1C1E"/>
          <circle cx="86" cy="88" r="2.8" fill="#FFFFFF"/>
          <ellipse cx="120" cy="90" rx="13" ry="16" fill="#FFFFFF" stroke="#1C1C1E" stroke-width="2"/>
          <circle cx="123" cy="92" r="6.5" fill="#1C1C1E"/>
          <circle cx="126" cy="88" r="2.8" fill="#FFFFFF"/>
          <!-- Cheeks & Smile -->
          <circle cx="65" cy="105" r="6" fill="#FFD60A" opacity="0.8"/>
          <circle cx="135" cy="105" r="6" fill="#FFD60A" opacity="0.8"/>
          <path d="M 88 115 Q 100 130 112 115" stroke="#1C1C1E" stroke-width="3" fill="#FFFFFF" stroke-linecap="round"/>
          <!-- Little Explorer Cap -->
          <path d="M 70 42 Q 100 20 130 42 Z" fill="#FFD60A"/>
        </svg>
      `;
  }
}
