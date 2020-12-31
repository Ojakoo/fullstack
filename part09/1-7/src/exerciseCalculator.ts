interface ReturnData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
} 

const calculateExercises = (exerciseHours: Array<number> ): ReturnData => {
  const returnObject = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: 2,
    average: 0
  }

  let sum = 0;

  //count training days and sum
  exerciseHours.forEach( dailyHours => {
    returnObject.periodLength = returnObject.periodLength + 1; 
    if ( dailyHours > 0 ) {
      returnObject.trainingDays = returnObject.trainingDays + 1;
      sum += dailyHours;
    }
  })

  //set average
  if ( returnObject.periodLength > 0 ) {
    returnObject.average = sum / returnObject.periodLength;
  }

  //check target, set rating and description
  if ( returnObject.average < 1 ) {
    returnObject.rating = 1;
    returnObject.ratingDescription = 'bad and should be better';
  } else if ( returnObject.average < 2) {
    returnObject.rating = 2;
    returnObject.ratingDescription = 'not too bad but could be better';
  } else {
    returnObject.rating = 3;
    returnObject.ratingDescription = 'good';    
  }

  //check success
  if ( returnObject.rating >= returnObject.target ) {
      returnObject.success = true;
  }
    
  return returnObject;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));