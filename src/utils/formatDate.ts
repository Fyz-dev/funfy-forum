export const timePassed = (date: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return 'now';
  } else if (minutes < 60) {
    return `${minutes} min. ago`;
  } else if (hours < 24) {
    return `${hours} hr. ago`;
  } else if (days === 1) {
    return `${days} day ago`;
  } else if (days < 29) {
    return `${days} days ago`;
  } else if (months === 0) {
    return '1 mo. ago';
  } else if (months < 12) {
    return `${months} mo. ago`;
  } else if (years === 1) {
    return `${years} year ago`;
  } else {
    return `${years} years ago`;
  }
};

export const formatDateFull = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatDateShort = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatDateShortToParts = (date: Date) => {
  const [month, day, year] = formatDateShort(date).split(' ');

  return {
    month,
    day: parseInt(day),
    year: parseInt(year),
  };
};
