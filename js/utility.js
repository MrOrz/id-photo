exports.isBirthdayFormatCorrect = function(birthdayArray){
  return birthdayArray.length === 3 &&
         birthdayArray[0] && birthdayArray[1] && birthdayArray[2]
};

exports.getPinFromBirthday = function(birthdayArray){
  return padWith0(birthdayArray[0]) + padWith0(birthdayArray[1]) + padWith0(birthdayArray[2]);
}

function padWith0(str){
  str = "" + str;
  while(str.length < 2) {
    str = "0" + str;
  }
  return str;
}
