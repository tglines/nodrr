howLongAgo = function(d1){
  var d2 = new Date();
  var diff = d2 - d1;
  var sec_diff = Math.floor(diff/1000);
  var min_diff = Math.floor(diff/1000/60);
  var hrs_diff = Math.floor(diff/1000/60/60);
  var days_diff = Math.floor(diff/1000/60/60/24);

  if(sec_diff==1)
    return sec_diff + ' second';
  else if(sec_diff<60)
    return sec_diff + ' seconds';               
  else if(min_diff==1)
    return min_diff + ' minute';
  else if(min_diff<60)
    return min_diff + ' minutes';
  else if(hrs_diff==1)
    return hrs_diff + ' hour';
  else if(hrs_diff<24)
    return hrs_diff + ' hours';
  else if(days_diff==1)
    return days_diff + ' day';
  else
    return days_diff + ' days';
}
