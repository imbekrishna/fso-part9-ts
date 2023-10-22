interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const getArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not many arguments');

  const target = Number(args[2]);
  const hours = args.slice(3).map((e) => Number(e));

  if (isNaN(target) || hours.some((e) => isNaN(e))) {
    throw new Error('Arguments should be numbers');
  }
  return {
    hours,
    target,
  };
};

export const calculateExercise = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((h) => h > 0).length;
  const average: number = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= target;
  let rating: number;
  let ratingDescription: string;

  const targetPer: number = average / target;

  if (targetPer >= 1) {
    rating = 4;
    ratingDescription = 'well done';
  } else if (targetPer > 0.8) {
    rating = 3;
    ratingDescription = 'getting there';
  } else if (targetPer > 0.5) {
    rating = 2;
    ratingDescription = 'not too bad';
  } else {
    rating = 1;
    ratingDescription = 'are you even trying?';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
