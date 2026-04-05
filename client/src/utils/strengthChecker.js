export const analyzePassword = (password) => {
  if (!password) {
    return {
      length: 0,
      lowercase: 0,
      uppercase: 0,
      digits: 0,
      symbols: 0,
      entropy: 0,
      crackTime: { value: '0', unit: 'seconds' },
      level: 'None',
      levelIndex: 0,
      color: 'bg-surface-container-high',
      bars: [false, false, false, false]
    };
  }

  const length = password.length;
  let lowercase = 0;
  let uppercase = 0;
  let digits = 0;
  let symbols = 0;

  for (let char of password) {
    if (/[a-z]/.test(char)) lowercase++;
    else if (/[A-Z]/.test(char)) uppercase++;
    else if (/[0-9]/.test(char)) digits++;
    else symbols++;
  }

  // Calculate pool size
  let pool = 0;
  if (lowercase > 0) pool += 26;
  if (uppercase > 0) pool += 26;
  if (digits > 0) pool += 10;
  if (symbols > 0) pool += 32;

  // Calculate entropy
  const entropy = pool === 0 ? 0 : Math.round(length * Math.log2(pool));

  // Estimate crack time
  // Assume generic hash rate 10B/sec
  const combinations = Math.pow(pool, length);
  const hashesPerSecond = 1e10; 
  const seconds = combinations / hashesPerSecond;

  let crackValue = '0';
  let crackUnit = 'seconds';
  
  if (pool === 0) {
      crackValue = '0'; crackUnit = 'seconds';
  } else if (seconds < 1) {
      crackValue = 'Instant'; crackUnit = '';
  } else if (seconds < 60) {
      crackValue = '< 1'; crackUnit = 'minute';
  } else if (seconds < 3600) {
      crackValue = `${Math.floor(seconds / 60)}`; crackUnit = 'minutes';
  } else if (seconds < 86400) {
      crackValue = `${Math.floor(seconds / 3600)}`; crackUnit = 'hours';
  } else if (seconds < 31536000) {
      crackValue = `${Math.floor(seconds / 86400)}`; crackUnit = 'days';
  } else if (seconds < 31536000000) {
      crackValue = `${Math.floor(seconds / 31536000)}`; crackUnit = 'years';
  } else {
      crackValue = '1,000+'; crackUnit = 'years';
  }

  let level = 'Weak';
  let levelIndex = 1;
  let color = 'bg-error';
  let bars = [true, false, false, false];

  if (entropy >= 80) {
    level = 'Exceptional';
    levelIndex = 4;
    color = 'bg-primary';
    bars = [true, true, true, true];
  } else if (entropy >= 60) {
    level = 'Strong';
    levelIndex = 3;
    color = 'bg-primary';
    bars = [true, true, true, false];
  } else if (entropy >= 40) {
    level = 'Medium';
    levelIndex = 2;
    color = 'bg-tertiary';
    bars = [true, true, false, false];
  } else {
    level = 'Weak';
    levelIndex = 1;
    color = 'bg-error';
    bars = [true, false, false, false];
  }

  return {
    length, lowercase, uppercase, digits, symbols,
    entropy, crackTime: { value: crackValue, unit: crackUnit }, level, levelIndex, color, bars
  };
};
