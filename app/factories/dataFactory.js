	"use strict";

app.factory("DataFactory", function($q, $http, FBcreds, authFactory) {
	//FB interaction - editBoard addBoard addPin editPin getPin removePin removeBoard getBoard getAllPins

const editBoard = (newBoardName, boardId) => {
    return $q((resolve, reject) => {
      let newName = JSON.stringify(newBoardName);
      $http.patch(`${FBcreds.databaseURL}/boards/${boardId}.json`, newName)
      .then((itemObject) => {
        resolve(itemObject);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


const addBoard = (newBoardName) => {
      return $q((resolve, reject) => {
      let newObject = {
        uid: authFactory.getUser(),
        title: newBoardName
      };
      console.log("newBoardObject");
      JSON.stringify(newObject);
      $http.post(`${FBcreds.databaseURL}/boards/.json`, newObject)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};




const addPin = (newPin) => {
    return $q((resolve, reject) => {
      let newobject = JSON.stringify(newPin);
      $http.post(`${FBcreds.databaseURL}/pins.json`, newobject)
      /// item ID?
      .then ((itemID) => {
        resolve(itemID);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

const addUser = (uid, newUser) => {
    return $q((resolve, reject) => {
      let newObject = JSON.stringify(newUser);
      $http.put(`${FBcreds.databaseURL}/users/${uid}.json`, newObject)
      .then ((itemID) => {
        resolve(itemID);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

const editPin = (pinId, editedPin) => {
    return $q((resolve, reject) => {
      let newObj = JSON.stringify(editedPin);
      $http.patch(`${FBcreds.databaseURL}/pins/${pinId}.json`, newObj)
      .then((itemObject) => {
        resolve(itemObject);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


const getPin = (pinId) => {
    return $q(function(resolve, reject){
      $http.get(`${FBcreds.databaseURL}/pins/${pinId}.json`)
      .then(function(itemObject){
        resolve(itemObject.data);
      })
      .catch(function(error){
        reject(error);
      });
    });
  };


const removePin = (pinID) => {
    return $q((resolve, reject) => {
      $http.delete(`${FBcreds.databaseURL}/pins/${pinID}.json`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


const removeBoard = (boardID) => {
    return $q((resolve, reject) => {
      console.log("made it to data factory");
      $http.delete(`${FBcreds.databaseURL}/boards/${boardID}.json`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


const getBoard = (boardId) => {
    return $q(function(resolve, reject){
      $http.get(`${FBcreds.databaseURL}/boards/${boardId}.json`)
      .then(function(itemObject){
        resolve(itemObject.data);
      })
      .catch(function(error){
        reject(error);
      });
    });
  };


const getAllPins = () => {
    let pins = [];
    return $q((resolve, reject) => {
      $http.get(`${FBcreds.databaseURL}/pins.json`)
    .then((itemObject) => {
      let itemCollection = itemObject.data;
      console.log("itemCollection", itemCollection);
      Object.keys(itemCollection).forEach((key) => {
      	/////  ????
        itemCollection[key].pinId = key;
        pins.push(itemCollection[key]);
     });
     resolve(pins);
    }).catch((error) => {
      reject(error);
    });
  });
};

const getAllBoards = () => {
    let boards = [];
    return $q((resolve, reject) => {
      $http.get(`${FBcreds.databaseURL}/boards.json`)
    .then((itemObject) => {
      let itemCollection = itemObject.data;
      console.log("itemCollection", itemCollection);
      Object.keys(itemCollection).forEach((key) => {
      	/////?????
        itemCollection[key].boardId = key;

        boards.push(itemCollection[key]);

     });
     resolve(boards);
    }).catch((error) => {
      reject(error);
    });
  });
};

const getUserBoards = (userId) => {
    let userBoards = [];
    return $q((resolve, reject) => {
    $http.get(`${FBcreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
    .then((itemObject) => {
    let itemCollection = itemObject.data;
    Object.keys(itemCollection).forEach((key) => {
    itemCollection[key].boardId = key;
    userBoards.push(itemCollection[key]);
    });
    resolve(userBoards);
    });
  });
};

const getUserPins = (userId) => {
	let userPins = [];
    return $q((resolve, reject) => {
    $http.get(`${FBcreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${userId}"`)
    .then((itemObject) => {
    let itemCollection = itemObject.data;
    Object.keys(itemCollection).forEach((key) => {
    itemCollection[key].pinId = key;
    userPins.push(itemCollection[key]);
    });
    resolve(userPins);
    });
  });
};

const getBoardPins = (boardId) => {
    let boardPins = [];
    return $q((resolve, reject) => {
    $http.get(`${FBcreds.databaseURL}/pins.json?orderBy="boardid"&equalTo="${boardId}"`)
    .then((itemObject) => {
    let itemCollection = itemObject.data;
    Object.keys(itemCollection).forEach((key) => {
    itemCollection[key].pinId = key;
    boardPins.push(itemCollection[key]);
    });
    resolve(itemCollection);
    });
  });
};

//Get username for profile partial
const getUserName = (userId) => {
    let userName = "";
    return $q((resolve, reject) => {
    $http.get(`${FBcreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
    .then((itemObject) => {
    let itemCollection = itemObject.data;
    userName = itemCollection.name;
    });
    resolve(userName);
    });
  };


 return {
    addPin,
    addUser,
    getPin,
    getUserPins,
    getAllPins,
    getBoardPins,
    editPin,
    removePin,
    addBoard,
    getBoard,
    editBoard,
    getUserBoards,
    getAllBoards,
    removeBoard,
    getUserName
  };

});
