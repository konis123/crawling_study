/*
for(let i=0;i<10;i++){
    let myFirstPromise = new Promise((resolve, reject) => {  
        setTimeout(function(){
            resolve("Success!"+i); // Yay! Everything went well!
        }, 250-i);
    });

    myFirstPromise.then((successMessage) => {
        console.log("Yay! " + successMessage);
    });
}
  
//----------------------------------------------------------------

const myFirstPromiseList = [];
for (let i = 0; i < 10; i++) {
  myFirstPromiseList.push(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Success! ${i}`); // Yay! Everything went well!
    }, 250 - i);
  }));
}

myFirstPromiseList.reduce((lastPromise, myFirstPromise) => {
  return lastPromise.then(() => {
    myFirstPromise.then((successMessage) => {
      console.log(`Yay! ${successMessage}`);
    });
  });
});
*/
//-----------------------------------------------------------------
(async () => {
    for (let i = 0; i < 10; i++) {
      const myFirstPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(`Success! ${i}`); // Yay! Everything went well!
        }, 250-i);
      });
  
      const successMessage = await myFirstPromise;
      console.log(`Yay! ${successMessage}`);
    }
  })();