// DateTime.js

// Formats dates into mm/dd/yyy
const formatDate = (taskDate) => {
    const newDate = new Date(taskDate);
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getDate().toString().padStart(2, '0')}/${newDate.getFullYear()}`;
    return formattedDate;
};

// Finds the next date
const calculateNextDate = (startDate, frequency) => {
  const today = new Date();
  let daysToAdd;

  switch (frequency) {
    case 'Daily':
      daysToAdd = 1;
      break;
    case 'Twice per Day':
      daysToAdd = 0.5;
      break;
    case 'Every other Day':
      daysToAdd = 2;
      break;
    case 'Once per Week':
      daysToAdd = 7;
      break;
    case 'Once per Month':
      daysToAdd = 30;
      break;
    case 'Once per Year':
      daysToAdd = 365.25;
      break;
    default:
      daysToAdd = 0;
      break;
  }

  const firstDate = new Date(startDate);
  const diffInDays = (today - firstDate) / (1000 * 60 * 60 * 24);
  const nextDate = new Date(firstDate).setDate(firstDate.getDate() + Math.ceil(diffInDays / daysToAdd) * daysToAdd);
  const formattedNextDate = formatDate(nextDate)

  return formattedNextDate;
};


export {
  calculateNextDate,
  formatDate
};