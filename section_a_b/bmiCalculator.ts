export const calculateBMI = (heightInCm: number, massInKg: number): string => {
  const bmi: number = massInKg / (heightInCm / 100) ** 2;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

interface Arguments {
  heightInCm: number;
  massInKg: number;
}
export const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      massInKg: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
