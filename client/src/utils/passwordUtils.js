export const generatePassword = (options) => {
  const {
    length = 16,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true,
    excludeAmbiguous = false,
    rareSymbols = false,
    manualExclusion = ''
  } = options;

  let chars = '';
  // Default sets
  let lower = 'abcdefghijklmnopqrstuvwxyz';
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let num = '0123456789';
  let sym = '!@#$%^*'; // matching the stitch UI label

  if (rareSymbols) {
    sym += '+}[,~_=&?-]'; 
  }

  if (excludeAmbiguous) {
    lower = lower.replace(/[ol]/g, '');
    upper = upper.replace(/[OIl]/g, '');
    num = num.replace(/[01]/g, '');
  }

  if (manualExclusion) {
    const toExclude = new RegExp(`[${manualExclusion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g');
    lower = lower.replace(toExclude, '');
    upper = upper.replace(toExclude, '');
    num = num.replace(toExclude, '');
    sym = sym.replace(toExclude, '');
  }

  if (lowercase) chars += lower;
  if (uppercase) chars += upper;
  if (numbers) chars += num;
  if (symbols) chars += sym;

  if (chars.length === 0) return '';

  let result = '';
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  // Ensure at least one character of each selected type if length allows
  let requiredChars = [];
  if (lowercase && lower.length > 0) requiredChars.push(lower[array[0] % lower.length]);
  if (uppercase && upper.length > 0) requiredChars.push(upper[array[1] % upper.length]);
  if (numbers && num.length > 0) requiredChars.push(num[array[2] % num.length]);
  if (symbols && sym.length > 0) requiredChars.push(sym[array[3] % sym.length]);

  for (let i = requiredChars.length; i < length; i++) {
    result += chars[array[i] % chars.length];
  }

  result = result + requiredChars.join('');
  
  // Final shuffle
  let finalResult = result.split('');
  for (let i = finalResult.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalResult[i], finalResult[j]] = [finalResult[j], finalResult[i]];
  }

  return finalResult.join('');
};

export const calculateStrength = (password) => {
  if (!password || password.length === 0) return { label: 'Weak', score: 0, percent: 5, gradient: 'from-error to-error', color: 'bg-error' };
  
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { label: 'Weak', score, percent: 25, gradient: 'from-error to-error', color: 'bg-error' };
  if (score <= 4) return { label: 'Medium', score, percent: 50, gradient: 'from-error to-tertiary', color: 'bg-tertiary' };
  if (score <= 6) return { label: 'Strong', score, percent: 75, gradient: 'from-error via-tertiary to-primary', color: 'bg-primary' };
  return { label: 'Very Strong', score, percent: 100, gradient: 'from-error via-tertiary to-primary', color: 'bg-primary' };
};
