//Hide Australia initially
document.getElementById("Aus_Map_Div").style.display = "none";

//Toggle visibility on dropdown value change
function onChangeCountry(element) {

  var e = document.getElementById(element.id);
  var selectedVal = e.options[e.selectedIndex].text;

  if(selectedVal === "US"){
    //US selected
    document.getElementById("Usa_Map_Div").style.display = "block";
    document.getElementById("Aus_Map_Div").style.display = "none";

  } else if(selectedVal === "Australia") {
    //Australia selected
    document.getElementById("Usa_Map_Div").style.display = "none";
    document.getElementById("Aus_Map_Div").style.display = "block";
  }
}

!function() {

var CSP = {},
    FAILURE = 'FAILURE',
    stepCounter = 0;

  var previousKey = "";
  var assigmentCount = 0 ;
CSP.solve = function solve(csp,method,heuristic,country) {
	//assigmentCount = assigments;
  // Solves a constraint satisfaction problem.
  // `csp` is an object that should have the properties:
  //    `variables`  : object that holds variable names and their domain.
  //    `constraints`: list of constraints where each element is an 
  //                   array of [head node, tail node, constraint function]
  //    `cb`: callback function for visualizing assignments. It is passed in
  //          an "assigned" object, an "unassigned" object, and `csp`.
  //    `timeStep`: milliseconds between invocations of `cb`.
  csp.timeStep = csp.timeStep || 1;
  var result="";
  if(method === 'DFS' && heuristic === 'Heu'){
    result = backtrack_with_heuristics({}, csp.variables, csp);
	console.log("Assigment value is: "+assigmentCount);
  }else if(method === 'DFS' && heuristic === 'WHeu'){
    if(country === 'US'){
      result = backtrack_without_heuristicsUS({}, csp.variables, csp);
    }else{
      result = backtrack_without_heuristicsAus({}, csp.variables, csp);
    }
	console.log("Assigment value is: "+assigmentCount);
  }else if(method === 'FC' && heuristic === 'Heu'){
    result = forwardCheckingWithHeuristic({}, csp.variables, csp);
	console.log("Assigment value is: "+assigmentCount);
  }else if(method === 'FC' && heuristic === 'WHeu'){
    if(country === 'US'){
      result = forwardCheckingWithoutHeuristicUS({}, csp.variables, csp);
    }else{
      result = forwardCheckingWithoutHeuristicAus({}, csp.variables, csp);
    }
	console.log("Assigment value is: "+assigmentCount);
  }else if(method === 'FCS' && heuristic === 'Heu'){
    result = backtrack_forward_checking_with_singleton_heuristic({}, csp.variables, csp);
	console.log("Assigment value is: "+assigmentCount);
  }else if(method === 'FCS' && heuristic === 'WHeu'){
    if(country === 'US'){
      result = forwardCheckSingletonWithoutHeuristicUS({}, csp.variables, csp);
    }else{
      result = forwardCheckSingletonWithoutHeuristicAus({}, csp.variables, csp);
    }
	console.log("Assigment value is: "+assigmentCount);
	
  }else{
  console.log("no option.")
  }

  console.log("result: "+result);
  if (result == FAILURE) { return result; }
  // Unwrap values from array containers.
  for (var key in result) {
    result[key] = result[key][0];
  }
  return result;
};

//Function for DFS with Heuristic
function backtrack_with_heuristics(_assigned, unassigned, csp) {
    // Backtracking search.
	
    // Copying assigned in necessary because we modify it. Without copying
    // the object over, modifying assigned would also change values for old
    // assigned objects (which are used in callbacks).
    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectUnassignedVariable(unassigned),
        values = orderValues(nextKey, assigned, unassigned, csp);
    delete unassigned[nextKey];
	
    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var newUnassigned = {}, newAssigned = {};
      newUnassigned = unassigned;
      newAssigned = assigned;
      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      var result = backtrack_with_heuristics(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }

    return FAILURE;
  };

//Function for DFS without Heuristic for US
  function backtrack_without_heuristicsUS(_assigned, unassigned, csp) {
    // Backtracking search.

    // Copying assigned in necessary because we modify it. Without copying
    // the object over, modifying assigned would also change values for old
    // assigned objects (which are used in callbacks).
    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectVariableWithoutHeuristicUS(unassigned);
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var newUnassigned = {}, newAssigned = {};
      newUnassigned = unassigned;
      newAssigned = assigned;
      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      var result = backtrack_with_heuristics(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }

    return FAILURE;
  };

  ////Function for DFS with Heuristic for Australia
  function backtrack_without_heuristicsAus(_assigned, unassigned, csp) {
    // Backtracking search.

    // Copying assigned in necessary because we modify it. Without copying
    // the object over, modifying assigned would also change values for old
    // assigned objects (which are used in callbacks).
    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectVariableWithoutHeuristicAus(unassigned,assigned,previousKey);
    previousKey = nextKey;
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var newUnassigned = {}, newAssigned = {};
      newUnassigned = unassigned;
      newAssigned = assigned;
      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      var result = backtrack_with_heuristics(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }

    return FAILURE;
  };

  ////Function for forward checking with Heuristic
function forwardCheckingWithHeuristic(_assigned, unassigned, csp) {
  // Backtracking search.
  
  // Copying assigned in necessary because we modify it. Without copying
  // the object over, modifying assigned would also change values for old
  // assigned objects (which are used in callbacks).
  var assigned = {};
  for (var key in _assigned) {
    assigned[key] = _assigned[key];
  }

  if (finished(unassigned)) {
    return assigned;
  } // Base case.


  var nextKey = selectUnassignedVariable(unassigned), values = orderValues(nextKey, assigned, unassigned, csp);
  console.log("values :"+ values);
  delete unassigned[nextKey];

  for (var i = 0; i < values.length; i++) {
    stepCounter++;
    assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	assigmentCount++;
    var consistent = enforceConsistency(assigned, unassigned, csp);
    var newUnassigned = {}, newAssigned = {};
    for (var key in consistent) {
      if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
      else { newUnassigned[key] = consistent[key].slice(); }
    }
    if (csp.cb) {
      setTimeout(
          // Need a closure to fix values of newAssigned and newUnassigned.
          // Otherwise, _every_ call of the callback takes the on values of the last iteration.
          (function (newAssigned, newUnassigned) {
             return function () {
               csp.cb(newAssigned, newUnassigned, csp);
             };
          })(newAssigned, newUnassigned),
          stepCounter * csp.timeStep
        );
    }
    if (anyEmpty(consistent)) {
      continue;
    } // Empty domains means failure.
    var result = forwardCheckingWithHeuristic(newAssigned, newUnassigned, csp);
    if (result !== FAILURE) { return result; }
  }

  return FAILURE;
}

//Function for Forward checking without Heuristic
  function forwardCheckingWithoutHeuristicUS(_assigned, unassigned, csp) {
    // Backtracking search.

    // Copying assigned in necessary because we modify it. Without copying
    // the object over, modifying assigned would also change values for old
    // assigned objects (which are used in callbacks).
    var assigned = {};
    for (var key in _assigned) {
      assigned[key] = _assigned[key];
    }

    if (finished(unassigned)) {
      return assigned;
    } // Base case.

    var nextKey = selectVariableWithoutHeuristicUS(unassigned);
    previousKey = nextKey;
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var consistent = enforceConsistency(assigned, unassigned, csp);
      var newUnassigned = {}, newAssigned = {};
      for (var key in consistent) {
        if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
        else { newUnassigned[key] = consistent[key].slice(); }
      }
      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () {
                csp.cb(newAssigned, newUnassigned, csp);
              };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      if (anyEmpty(consistent)) {
        continue;
      } // Empty domains means failure.

      var result = forwardCheckingWithoutHeuristicUS(newAssigned, newUnassigned, csp);
      if (result !== FAILURE) { return result; }
    }

    return FAILURE;
  }

  //Function for Propagation with Singleton without Heuristic for US
  function forwardCheckSingletonWithoutHeuristicUS(_assigned, unassigned, csp) {

    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectVariableWithoutHeuristicUS(unassigned);
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var consistent = enforceConsistency(assigned, unassigned, csp);
      var newUnassigned = {}, newAssigned = {};
      var newUnassignedTemp = {}, newAssignedTemp = {};
      for (var key in consistent) {
        if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
        else { newUnassigned[key] = consistent[key].slice(); }
      }
      //Code for propagation through singleton starts here
      newAssignedTemp = Object.assign({},newAssigned);
      newUnassignedTemp = Object.assign({},newUnassigned);
      for (var key in newUnassigned) {
        if (newUnassigned[key].length == 1) {
          newAssignedTemp[key]= newUnassigned[key];
          delete newUnassignedTemp[key];
          var consistent = enforceConsistency(newAssignedTemp, newUnassignedTemp, csp);
          for (var keys in consistent) {
            if (assigned[keys]) { newAssigned[keys] = newAssigned[keys].slice(); }
            else { newUnassigned[keys] = consistent[keys].slice(); }
          }
        }
      }
      //Code for propagation through singleton ends here

      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      if (anyEmpty(consistent)) { continue; } // Empty domains means failure.
      var result = forwardCheckSingletonWithoutHeuristicUS(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }
    return FAILURE;
  }

  //Function for Propagation with Singleton without Heuristic for Australia
  function forwardCheckSingletonWithoutHeuristicAus(_assigned, unassigned, csp) {

    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectVariableWithoutHeuristicAus(unassigned,assigned,previousKey);
    previousKey = nextKey;
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var consistent = enforceConsistency(assigned, unassigned, csp);
      var newUnassigned = {}, newAssigned = {};
      var newUnassignedTemp = {}, newAssignedTemp = {};
      for (var key in consistent) {
        if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
        else { newUnassigned[key] = consistent[key].slice(); }
      }
      //Code for propagation through singleton starts here
      newAssignedTemp = Object.assign({},newAssigned);
      newUnassignedTemp = Object.assign({},newUnassigned);
      for (var key in newUnassigned) {
        if (newUnassigned[key].length == 1) {
          newAssignedTemp[key]= newUnassigned[key];
          delete newUnassignedTemp[key];
          var consistent = enforceConsistency(newAssignedTemp, newUnassignedTemp, csp);
          for (var keys in consistent) {
            if (assigned[keys]) { newAssigned[keys] = newAssigned[keys].slice(); }
            else { newUnassigned[keys] = consistent[keys].slice(); }
          }
        }
      }
      //Code for propagation through singleton ends here

      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      if (anyEmpty(consistent)) { continue; } // Empty domains means failure.
      var result = forwardCheckSingletonWithoutHeuristicAus(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }
    return FAILURE;
  }

  //Function for Propagation with Singleton with Heuristic
  function backtrack_forward_checking_with_singleton_heuristic(_assigned, unassigned, csp) {
    // Backtracking search with forward checking with singleton

    var assigned = {};
    for (var key in _assigned) { assigned[key] = _assigned[key]; }

    if (finished(unassigned)) { return assigned; } // Base case.
    var nextKey = selectUnassignedVariable(unassigned),
        values = orderValues(nextKey, assigned, unassigned, csp);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var consistent = enforceConsistency(assigned, unassigned, csp);
      var newUnassigned = {}, newAssigned = {};
      var newUnassignedTemp = {}, newAssignedTemp = {};
      for (var key in consistent) {
        if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
        else { newUnassigned[key] = consistent[key].slice(); }
      }
      //Code for propagation through singleton starts here
      newAssignedTemp = Object.assign({},newAssigned);
      newUnassignedTemp = Object.assign({},newUnassigned);
      for (var key in newUnassigned) {
        if (newUnassigned[key].length == 1) {
          newAssignedTemp[key]= newUnassigned[key];
          delete newUnassignedTemp[key];
          var consistent = enforceConsistency(newAssignedTemp, newUnassignedTemp, csp);
          for (var keys in consistent) {
            if (assigned[keys]) { newAssigned[keys] = newAssigned[keys].slice(); }
            else { newUnassigned[keys] = consistent[keys].slice(); }
          }
        }
      }
      //Code for propagation through singleton ends here

      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () { csp.cb(newAssigned, newUnassigned, csp); };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      if (anyEmpty(consistent)) { continue; } // Empty domains means failure.
      var result = backtrack_forward_checking_with_singleton_heuristic(newAssigned, newUnassigned, csp);
      if (result != FAILURE) { return result; }
    }
    return FAILURE;
  }

//Function for forward checking with Heuristic for Australia
  function forwardCheckingWithoutHeuristicAus(_assigned, unassigned, csp) {
    // Backtracking search.

    // Copying assigned in necessary because we modify it. Without copying
    // the object over, modifying assigned would also change values for old
    // assigned objects (which are used in callbacks).
    var assigned = {};
    for (var key in _assigned) {
      assigned[key] = _assigned[key];
    }

    if (finished(unassigned)) {
      return assigned;
    } // Base case.

    var nextKey = selectVariableWithoutHeuristicAus(unassigned,assigned, previousKey);
    previousKey = nextKey;
    var values = getValuesOfKey(nextKey, unassigned);
    delete unassigned[nextKey];

    for (var i = 0; i < values.length; i++) {
      stepCounter++;
      assigned[nextKey] = [values[i]]; // Assign a value to a variable.
	  assigmentCount++;
      var consistent = enforceConsistency(assigned, unassigned, csp);
      var newUnassigned = {}, newAssigned = {};
      for (var key in consistent) {
        if (assigned[key]) { newAssigned[key] = assigned[key].slice(); }
        else { newUnassigned[key] = consistent[key].slice(); }
      }
      if (csp.cb) {
        setTimeout(
            // Need a closure to fix values of newAssigned and newUnassigned.
            // Otherwise, _every_ call of the callback takes the on values of the last iteration.
            (function (newAssigned, newUnassigned) {
              return function () {
                csp.cb(newAssigned, newUnassigned, csp);
              };
            })(newAssigned, newUnassigned),
            stepCounter * csp.timeStep
        );
      }
      if (anyEmpty(consistent)) {
        continue;
      } // Empty domains means failure.

      var result = forwardCheckingWithoutHeuristicAus(newAssigned, newUnassigned, csp);
      if (result !== FAILURE) { return result; }
    }

    return FAILURE;
  }
  // Checks if there are no more variables to assign.
function finished(unassigned) {
  return Object.keys(unassigned).length === 0;
}

  // Checks if any variable's domain is empty.
function anyEmpty(consistent) {
  for (var key in consistent) {
    if (consistent[key].length === 0) { return true; }
  }
  return false;
}

function partialAssignment(assigned, unassigned) {
  // Combine unassigned and assigned for use in enforceConsistency.
  var partial = {};
  for (var key in unassigned) { partial[key] = unassigned[key].slice(); }
  for (var key in assigned) { partial[key] = assigned[key].slice(); }
  return partial;
}

// Enforces arc consistency by removing inconsistent values from
// every constraint's tail node.
function enforceConsistency(assigned, unassigned, csp) {

  function removeInconsistentValues(head, tail, constraint, variables) {
    // Removes inconsistent values from the tail node. A value is
    // inconsistent when if the `tail` is assigned that value, there are
    // no values in `head`'s domain that satisfies the constraint.
    var hv = variables[head], tv = variables[tail];
    var validTailValues = tv.filter(function (t) {
      return hv.some(function (h) {
        return constraint(h, t);
      });
    });
    var removed = tv.length !== validTailValues.length;
    variables[tail] = validTailValues;
    return removed;
  }

  function incomingConstraints(node) {
    // Returns all the constraints where `node` is the head node.
    return csp.constraints.filter(function (c) {
      return c[0] === node;
    });
  }
  
  var queue = csp.constraints.slice(), 
      variables = partialAssignment(assigned, unassigned);
  while (queue.length) { // While there are more constraints to test.
    var c = queue.shift(), head = c[0], tail = c[1], constraint = c[2];
    if (removeInconsistentValues(head, tail, constraint, variables)) {
      // If values from the tail have been removed, incoming constraints
      // to the tail must be rechecked.
      queue = queue.concat(incomingConstraints(tail));
    }
  }
  return variables;
}

//Function returns state to be coloured based on MRV
function selectUnassignedVariable(unassigned) {
  // Picks the next variable to assign according to the Minimum
  // Remaining Values heuristic. Pick the variable with the fewest
  // values remaining in its domain. This helps identify domain
  // failures earlier.
  var minKey = null, minLen = Number.POSITIVE_INFINITY;
  for (var key in unassigned) {
    var len = unassigned[key].length;
    if (len < minLen) {
      minKey = key; minLen = len;
    }
  }
  return minKey;
}

//Function
function selectVariableWithoutHeuristicUS(unassigned){

  let data = {
    "WA": ["ID", "OR"],
    "ID": ["MT", "NV", "OR", "UT", "WA", "WY"],
    "OR": ["CA", "ID", "NV", "WA"],
    "MT": ["ID", "ND", "SD", "WY"],
    "NV": ["AZ", "CA", "ID", "OR", "UT"],
    "UT": ["AZ", "CO", "ID", "NM", "NV", "WY"],
    "WY": ["CO", "ID", "MT", "NE", "SD", "UT"],
    "CA": ["AZ", "NV", "OR"],
    "ND": ["MN", "MT", "SD"],
    "SD": ["IA", "MN", "MT", "ND", "NE", "WY"],
    "AZ": ["CA", "CO", "NM", "NV", "UT"],
    "CO": ["AZ", "KS", "NE", "NM", "OK", "UT", "WY"],
    "NM": ["AZ", "CO", "OK", "TX", "UT"],
    "NE": ["CO", "IA", "KS", "MO", "SD", "WY"],
    "MN": ["IA", "ND", "SD", "WI"],
    "IA": ["MN", "MO", "NE", "SD", "WI", "IL"],
    "KS": ["CO", "MO", "NE", "OK"],
    "OK": ["AR", "CO", "KS", "MO", "NM", "TX"],
    "TX": ["AR", "LA", "NM", "OK"],
    "MO": ["AR", "IA", "IL", "KS", "KY", "NE", "OK", "TN"],
    "WI": ["IA", "IL", "MI", "MN"],
    "IL": ["IA", "IN", "KY", "MO", "WI"],
    "AR": ["LA", "MO", "MS", "OK", "TN", "TX"],
    "LA": ["AR", "MS", "TX"],
    "KY": ["IL", "IN", "MO", "OH", "TN", "VA", "WV"],
    "TN": ["AL", "AR", "GA", "KY", "MO", "MS", "NC", "VA"],
    "MI": ["IN", "OH", "WI"],
    "IN": ["IL", "KY", "MI", "OH"],
    "MS": ["AL", "AR", "LA", "TN"],
    "OH": ["IN", "KY", "MI", "PA", "WV"],
    "VA": ["DC", "KY", "MD", "NC", "TN", "WV"],
    "WV": ["KY", "MD", "OH", "PA", "VA"],
    "AL": ["FL", "GA", "MS", "TN"],
    "GA": ["AL", "FL", "NC", "SC", "TN"],
    "NC": ["GA", "SC", "TN", "VA"],
    "PA": ["DE", "MD", "NJ", "NY", "OH", "WV"],
    "DC": ["MD", "VA"],
    "MD": ["DC", "DE", "PA", "VA", "WV"],
    "FL": ["AL", "GA"],
    "SC": ["GA", "NC"],
    "DE": ["MD", "NJ", "PA"],
    "NJ": ["DE", "NY", "PA"],
    "NY": ["CT", "MA", "NJ", "PA", "VT"],
    "CT": ["MA", "NY", "RI"],
    "MA": ["CT", "NH", "NY", "RI", "VT"],
    "VT": ["MA", "NH", "NY"],
    "RI": ["CT", "MA"],
    "NH": ["MA", "ME", "VT"],
    "ME": ["NH"],
    "HI": [],
    "AK": []
  };

    return Object.keys(unassigned)[0];
}

  function selectVariableWithoutHeuristicAus(unassigned, assigned, previousKey){

    let data = {
      "WA": ["NT", "SA"],
      "NT": ["WA", "SA", "QL"],
      "QL": ["NT", "SA", "NSW"],
      "SA": ["WA", "NT", "QL", "NSW", "VT"],
      "NSW": ["VT", "SA", "QL"],
      "VT": ["SA", "NSW"],
      "TN": []
    };

    if(Object.keys(assigned).length === 0){
      return Object.keys(unassigned)[0];
    }else{

      var neighbors = data[previousKey];

      for(let x=0;x<neighbors.length;x++){

        if(Object.keys(unassigned).includes(neighbors[x])){
          return neighbors[x];
        }
      }
      if((Object.keys(unassigned).length !== 0)){
        curr = Object.keys(unassigned)[0];
        return curr;
      }


    }

  }

function orderValues(nextKey, assigned, unassigned, csp) {
  // Orders the values of an unassigned variable according to the
  // Least Constraining Values heuristic. Perform arc consistency
  // on each possible value, and order variables according to the
  // how many values were eliminated from all the domains (fewest
  // eliminated in the front). This helps makes success more likely
  // by keeping future options open.
  
  function countValues(vars) {
    var sum = 0;
    for (var key in vars) { sum += vars[key].length; }
    return sum;
  }

  function valuesEliminated(val) {
    assigned[nextKey] = [val];
    var newLength = countValues(enforceConsistency(assigned, unassigned, csp));
    delete assigned[nextKey];
    return newLength;
  }

  // Cache valuesEliminated to be used in sort.
  var cache = {}, values = unassigned[nextKey];
  values.forEach(function(val) {
    cache[val] = valuesEliminated(val);
  });

  // Descending order based on the number of domain values remaining.
  values.sort(function (a, b) { return cache[b] - cache[a]; });
  return values;
}


  function getValuesOfKey(nextKey,unassigned){
  return unassigned[nextKey];

  }

// Taken from d3 source. Makes `csp` usable in other scripts.
if (typeof define === 'function' && define.amd) {
  define(CSP);
} else if (typeof module === 'object' && module.exports) {
  module.exports = CSP;
} else {
  this.csp = CSP;
}

}();
